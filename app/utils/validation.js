// Client-side validation

export function contactName(name) {
  if (!name) {
    return 'Don\'t forget your contact\'s name!';
  }
  if (name && name.length > 1000) {
    return 'Name must be fewer than 1000 characters';
  }
  return undefined;
}
export function contactNameWarning(name) {
  // Name isn't required
  if (name && name.length > 120) {
    return 'Just double checking...is their name really this long? :)';
  }
  return undefined;
}

export function contactEmail(email) {
  if (email && email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi) === null) {
    return 'Email must be in the format of an email address';
  }
  if (email && email.length > 200) {
    return 'Email must be fewer than 200 characters';
  }
  return undefined;
}

export function contactPhone(phone) {
  if (phone && phone.match(/[^0-9]/)) {
    return 'Only numbers are allowed';
  }
  return undefined;
}

export function contactLastContacted(lastContacted) {
  if (lastContacted && lastContacted.match(/^\d{4}-\d{2}-\d{2}$/) === null) {
    return 'You must enter a date.';
  }
  return undefined;
}

export function contactContactFrequency(contactFrequency) {
  if (contactFrequency && contactFrequency.match(/[^0-9]/)) {
    return 'Only numbers are allowed';
  }
  return undefined;
}

export function contactContactFrequencyWarning(contactFrequency) {
  if (contactFrequency && +contactFrequency > 730) {
    return 'Are you sure you want the contact frequency to be more than 2 years?';
  }
  return undefined;
}

export default {
  contactValidation: {
    contactName,
    contactNameWarning,
    contactEmail,
    contactPhone,
    contactLastContacted,
    contactContactFrequency,
    contactContactFrequencyWarning,
  },
};
