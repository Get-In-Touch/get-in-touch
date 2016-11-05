import axios from 'axios';

const server = {
  fetchAllContacts(userId) {
    return axios.get(`/api/contacts?userId=${userId}`);
  },
  updateContact(contactId, userId, values) {
    return axios.post(`/api/contact/${contactId}`, { userId, values });
  },
  deleteContact(contactId, userId) {
    return axios.delete(`/api/contact/${contactId}?userId=${userId}`);
  },
  addContact(userId, values) {
    return axios.post('/api/contact', { userId, values });
  },
};

const APIs = {
  server,
};

export default APIs;
