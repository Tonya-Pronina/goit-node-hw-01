const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((c) => c.id === contactId);
    return contact || null;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index !== -1) {
      const [removedContact] = contacts.splice(index, 1);
      await fs.writeFile(
        contactsPath,
        JSON.stringify(contacts, null, 2),
        "utf-8"
      );
      return removedContact;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };

    contacts.push(newContact);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );

    return newContact;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
