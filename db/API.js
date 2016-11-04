const { bookshelf, contactsColumns } = require('./init');
const validation = require('../server/utils/validation');

function findImproperKeys(columns, keyValues, noId) {
  const keys = Object.keys(keyValues);
  const improperKeys = [];
  for (let i = 0; i < keys.length; i += 1) {
    const keyNotFoundInColumns = columns[keys[i]] === undefined;
    const useOfId = keys[i] === 'id';
    if (keyNotFoundInColumns || (noId && useOfId)) {
      improperKeys.push(keys[i]);
    }
  }
  return improperKeys;
}

const validateContactUpdateInputs = (values, validationFunctions) => (
  [
    validationFunctions.contactName(values.name),
    validationFunctions.contactEmail(values.email),
    validationFunctions.contactPhone(values.phone),
    validationFunctions.contactLastContacted(values.lastContacted),
    validationFunctions.contactContactFrequency(values.contactFrequency),
  ].filter((el) => el).join('. ') || null
);

// Users model
const UserModel = bookshelf.Model.extend({
  tableName: 'users',
  hasTimeStamps: true,
  contacts() {
    // ContactsModel isn't yet defined, but it will be by the time this function is called
    return this.hasMany(ContactsModel, 'userId'); // eslint-disable-line no-undef
  },
});

// Users API
const UsersAPI = {};

// Contacts model
const ContactModel = bookshelf.Model.extend({
  tableName: 'contacts',
  hasTimestamps: true,
  user() {
    return this.belongsTo(UserModel, 'userId');
  },
});

// Contacts API
const ContactsAPI = {
  fetch() {
    // todo: Ultimately we'll need to request just the appropriate contacts based on
    // which user is signed in. But right now, since we're faking a log-in system,
    // we'll just request all of them, and let the frontend decide which to display.
    return new ContactModel({}).fetchAll()
      .then((contacts) => contacts.toJSON());
  },
  update(contactId, userId, values) {
    const improperKeys = findImproperKeys(contactsColumns, values, true);
    if (improperKeys.length) {
      return {
        getInTouchError: `Error: Keys do not match column names. Improper key(s): ${improperKeys.join(', ')}`,
      };
    }

    const validationErrors = validateContactUpdateInputs(values, validation);
    if (validationErrors) {
      return {
        getInTouchError: `Error: Validation errors. ${validationErrors}`,
      };
    }

    return ContactModel.forge({ id: contactId })
      .save(values, {
        method: 'update',
        patch: true,
        require: true,
      });
  },
  delete(userId) {
    return (new ContactModel({ id: userId })).destroy();
  },
  add(newContact) {
    return (new ContactModel(newContact)).save();
  },
};

module.exports = {
  ContactsAPI,
  UsersAPI,
};
