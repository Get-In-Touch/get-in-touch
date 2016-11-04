// const moment = require('moment');

// <editor-fold desc="Add dummy data to db">
// const dummyContactData = [
//   {
//     name: 'Elyse Greenarry',
//     userId: 1,
//     lastContacted: new moment('2016-07-01').hours(0).minutes(0).seconds(0).milliseconds(0), // eslint-disable-line new-cap
//     contactFrequency: 1,
//     contactNext: new moment('2016-07-02'), // eslint-disable-line new-cap
//     notes: 'Talk to her about my cool MVP.\n\nMarried on 5/14/16.\nBirthday 6/14/88',
//   },
//   {
//     name: 'Chris Brenton',
//     userId: 1,
//     lastContacted: new moment('2016-06-30'), // eslint-disable-line new-cap
//     contactFrequency: 14,
//     contactNext: new moment('2016-07-13'), // eslint-disable-line new-cap
//     notes: 'Python coder. Started the High Impact dodgeball league. Works a lot on improving/automating people\'s ' +
//     'workflows, e.g. deployment workflows.',
//   },
//   {
//     name: 'Catrina Fuentes',
//     userId: 1,
//     lastContacted: new moment('2015-02-20'), // eslint-disable-line new-cap
//     contactFrequency: 180,
//     contactNext: new moment('2016-10-20'), // eslint-disable-line new-cap
//     notes: 'Recently (1/2015) started working at a cool company doing social media work for nonprofits.' +
//     '\n\nInterned for me at Davis Dollars',
//   },
//   {
//     name: 'Nick Winter',
//     userId: 1,
//     lastContacted: new moment('2015-01-30'), // eslint-disable-line new-cap
//     contactFrequency: 365,
//     contactNext: new moment('2016-01-30'), // eslint-disable-line new-cap
//     notes: 'Met through Cassie Winter, Nick\'s cousin. Nick started Code Combat, and now it mostly runs itself.',
//   },
//   {
//     name: 'Reed Cureton',
//     userId: 1,
//     lastContacted: new moment('2016-10-10').hours(0).minutes(0).seconds(0).milliseconds(0), // eslint-disable-line new-cap
//     contactFrequency: 3,
//     contactNext: (new moment('2016-10-10')).add(3, 'days'), // eslint-disable-line new-cap
//     notes: 'Get him to tell more funny jokes. Thank him for being a kick-ass fellow.',
//   },
// ];

// dummyContactData.forEach(c => {
//   const contact = new ContactModel();
//   contact.set('name', c.name);
//   contact.set('contactFrequency', c.contactFrequency);
//   contact.set('contactNext', c.contactNext.format());
//   contact.set('lastContacted', c.lastContacted.format());
//   contact.set('notes', c.notes);
//
//   contact.save()
//     .then(u => console.log('User saved: ', `${u.get('id')} ${u.get('name')}`))
//     .catch(e => console.log(e));
// });
// </editor-fold>

// Inserting with SQL:
/*
 INSERT INTO [table]
 ([column1], [column2], ... )
 VALUES
 ([expression1], [expression2], ... );

 INSERT INTO users
 (fullName, email, password)
 VALUES
 ("Nico Greenarry", "notmyrealemail@gmail.com", "notmyrealpassword"),
 ("Elyse Greenarry", "notmyrealemail@gmail.com", "notmyrealpassword");
 */
