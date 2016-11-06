// Server-side validation
const moment = require('moment');

exports.contactName = function contactName(name) {
  if (name && typeof name !== 'string') {
    return 'Name must be a string';
  }
  if (!name) {
    return 'Don\'t forget your contact\'s name!';
  }
  if (name && name.length > 1000) {
    return 'Name must be fewer than 1000 characters';
  }
  return undefined;
};

exports.contactEmail = function contactEmail(email) {
  if (email && typeof email !== 'string') {
    return 'Email must be a string';
  }
  if (email && email.length > 200) {
    return 'Email must be fewer than 200 characters';
  }
  if (email && email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi) === null) {
    return 'Email must be in the format of an email address';
  }
  return undefined;
};

exports.contactPhone = function contactPhone(phone) {
  if (phone && typeof phone !== 'string') {
    return 'Phone must be a string';
  }
  if (phone && phone.match(/[^0-9]/)) {
    return 'Phone number must not contain any non-numeric digits';
  }
  return undefined;
};

exports.contactContactFrequency = function contactContactFrequency(contactFrequency) {
  if (contactFrequency && typeof contactFrequency !== 'string') {
    return 'Contact frequency must be a string';
  }
  if (contactFrequency && contactFrequency.match(/[^0-9]/)) {
    return 'Contact frequency must only contain numeric characters';
  }
  return undefined;
};

exports.contactLastContacted = function contactLastContacted(lastContacted) {
  if (lastContacted && typeof lastContacted !== 'string') {
    return 'Last Contacted must be a string';
  }
  if (lastContacted && !moment(lastContacted).isValid()) {
    return 'You must enter a date.';
  }
  return undefined;
};
