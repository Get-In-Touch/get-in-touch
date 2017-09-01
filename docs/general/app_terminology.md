# App Terminology

In order to avoid overloading terms in our code,
we lay out guidelines for how to refer to various app concepts.
(Otherwise, imagine using using a **`lastContacted`** property
to determine when you should next **contact** one of your **contacts**.)

## "Person" (user)
Our users are called "persons" rather than "users"
because "user" is a reserved word in Postgres.
We use the plural "persons" rather than "people".

## "Contact" (member of a user's contact book)
A contact is always a noun,
referring to someone in a user's contact list.

## "Message" (noun, a message sent to/from a contact, and verb, to send a message)
To avoid overloading the term "contact",
we use "message" rather than "contact"
to describe the high-level act of communicating with a contact.
For example, we might calculate how often you message a particular contact,
_not_ how often you "contact" a particular contact.

Messaging a contact includes composing and sending a message - so we
may use other terms like "compose" or "send" when referring to
specific aspects of the act of "messaging".

"Message" is also a noun referring to the text/media sent to a contact.

### Inbound, outbound messages
A message may be **inbound** (from one of your contacts),
or **outbound** (to one of your contacts).

The latest message you sent to a particular contact might be referred to
as the "latest outbound" to that contact
(**not** that contact's "latest contact").
