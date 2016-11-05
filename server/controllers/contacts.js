const { ContactsAPI } = require('../../db/API');

const contacts = {
  fetch(req, res) {
    ContactsAPI.fetch(+req.query.userId)
      .then((fetchedContacts) => res.send(fetchedContacts));
  },
  update(req, res) {
    const response = ContactsAPI.update(req.params.contactId, req.body.userId, req.body.values);
    if (response.getInTouchError) {
      res.status(400).send(response.getInTouchError);
    } else {
      response.then(() => res.status(204).send())
        .catch((error) => res.status(500).send({ error }));
    }
  },
  delete(req, res) {
    ContactsAPI.delete(req.params.contactId)
      .then(() => res.status(204).send())
      .catch((err) => res.status(400).send(err));
  },
  add(req, res) {
    ContactsAPI.add(req.body.userId, req.body.values)
      .then((insertedContact) => res.send(insertedContact));
  },
};

module.exports = contacts;
