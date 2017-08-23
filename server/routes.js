const express = require('express');
const contacts = require('./controllers/contacts');
const google = require('./integrations/google');

const router = express.Router(); // eslint-disable-line new-cap

// App contacts
router.get('/api/contacts', contacts.fetch);
router.post('/api/contact/:contactId', contacts.update);
router.post('/api/contact', contacts.add);
router.delete('/api/contact/:contactId', contacts.delete);

// External APIs
// TODO: I could do something like '/apis/:service/:resource', but maybe that's too cutesy by trying to generalize
// across all services. Maybe create individual routes here; I can always consolidate later once I notice patterns
// TODO: Right now this endpoint does double duty - hit it when you haven't yet authorized; hit it again once you have
// to get contacts. Is that good design? The alternative is to pass information to the client about which services are
// already authorized, which is probably better anyway because we should change the UI. E.g., don't show the sync button
// for services you've already synced.
router.get('/apis/google/contacts', google.getContacts);

module.exports = router;
