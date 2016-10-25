import axios from 'axios';

const server = {
  fetchAllContacts() {
    return axios.get('/api/contacts');
  },
  updateContact(contactId, values) {
    return axios.post(`/api/contact/${contactId}`, values);
  },
  deleteContact(contactId) {
    return axios.delete(`/api/contact/${contactId}`);
  },
  addContact(newContactValues) {
    return axios.post('/api/contact', newContactValues);
  },
};

const APIs = {
  server,
};

export default APIs;
