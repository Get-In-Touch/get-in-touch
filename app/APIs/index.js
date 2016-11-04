import axios from 'axios';

const server = {
  fetchAllContacts(userId) { // todo: update backend to expect new userId data
    return axios.get(`/api/contacts?userId=${userId}`);
  },
  updateContact(contactId, userId, values) { // todo: update backend to expect new userId data
    return axios.post(`/api/contact/${contactId}`, { userId, values });
  },
  deleteContact(contactId, userId) { // todo: update backend to expect new userId data
    return axios.delete(`/api/contact/${contactId}?userId=${userId}`);
  },
  addContact(newContactValues) { // todo: update backend to expect new userId data
    return axios.post('/api/contact', newContactValues);
  },
};

const APIs = {
  server,
};

export default APIs;
