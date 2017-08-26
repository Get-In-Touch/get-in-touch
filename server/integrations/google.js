const bluebird = require('bluebird');
const config = require('../../configUntracked');
const google = require('googleapis');

const OAuth2 = google.auth.OAuth2;

// The client returned by this function is used to get an authorization code, which we can then use to retrieve
// access/refresh tokens
const getOAuthClient = (function () {
  let oAuth2Client = null;

  return function () {
    if (oAuth2Client) {
      return oAuth2Client;
    }
    // TODO: Can the same oAuth2Client only be used once by one user? If so, then even
    // during testing, I'll need to update this code soon, since if I use the code, then
    // I have to kill the server (or at least make a change to a file) to get a authorization attempt
    oAuth2Client = new OAuth2(
      config.googleOAuth2.web.client_id,
      config.googleOAuth2.web.client_secret,
      // TODO: This url should be set by the type of request I make, rather than hardcoded here. I should also probably
      // think more about the url; come up with consistent conventions for naming things
      'http://localhost:3000/apis/google/contacts' // NB: Must be listed in Google Dev Console
    );
    bluebird.promisifyAll(oAuth2Client);
    return oAuth2Client;
  };
}());

// TODO: create documentation
// Google APIs: Need to enable the API I want e.g. People API in dev console
// also need to list any redirect urls (can have multiple)

// TODO: This is obviously a hack that only works when I have only one user; persist the tokens once I've set up the API
let nicoTokens = null;
function getAccessRefreshTokens(authorizationCode) {
  const oAuth2Client = getOAuthClient();
  console.log('got auth client; about to try getting tokens:');
  return oAuth2Client.getTokenAsync(authorizationCode)
    .then((tokens) => {
      console.log('about to set credentials; tokens:', tokens);
      nicoTokens = tokens;
      // TODO: This code has way too many side effects; should be refactored. This function is doing too much right now.
      oAuth2Client.setCredentials(tokens);
      console.log('about to set auth options for google:');
      google.options({
        auth: oAuth2Client,
      });
      console.log('Set options; returning');
      return oAuth2Client;
    })
    .catch((err) => {
      console.error(err); // TODO handle this better - throw it or something
    });
}

// generate a url that asks permissions for Google+ and Google Calendar scopes
const scopes = [
  'profile', // for Google Sign-In - view user's basic profile info
  'email', // for Google Sign-In - view user's basic profile info
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.send',
  'https://www.googleapis.com/auth/contacts.readonly',
];

function getAuthUrl() {
  return getOAuthClient().generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
}

function getContacts(req, res) {
  if (!(nicoTokens || req.query.code)) {
    console.log('No tokens; will generate and send auth url');
    // No tokens or auth code; reply with auth url
    return res.redirect(getAuthUrl());
//    return res.json({
//      url: getAuthUrl(),
//    });
  }

  console.log('Have tokens or auth code:', nicoTokens, req.query.code);
  const authorizeClientPromise = nicoTokens
    ? bluebird.resolve()
    : getAccessRefreshTokens(req.query.code);
  console.log('nicoTokens: ', nicoTokens);

  return authorizeClientPromise
    .then(() => {
      console.log('Got tokens');
      const peopleAPI = google.people('v1'); // TODO-NOW: Or is it google.contacts?
      console.log('Got people API; about to try requesting people');
      // TODO: See for other parameters:
      // https://developers.google.com/apis-explorer/#search/contacts/people/v1/people.people.connections.list?resourceName=people%252Fme&_h=1&
      // For example `syncToken` and `requestSyncToken` might become important so we have the latest info on file
      const get = bluebird.promisify(peopleAPI.people.connections.list, { context: peopleAPI.people.connections });
      return get({
        resourceName: 'people/me',
        personFields: [
          'addresses',
          'birthdays',
          'coverPhotos',
          'emailAddresses',
          'imClients',
          'names',
          'nicknames',
          'occupations',
          'organizations',
          'phoneNumbers',
          'relations',
          'relationshipInterests',
          'relationshipStatuses',
          'residences',
        ],
      });
    })
    .then((people) => res.status(200).json(people))
    .catch((err) => console.log('Error getting tokens or people: ', err));
}

module.exports = {
  getContacts,
};
