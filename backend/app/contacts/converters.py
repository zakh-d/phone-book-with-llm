from app.contacts.model import Contact
from app.contacts.schemas import ContactIn, ContactOut


def contact_to_contact_out(contact: Contact) -> ContactOut:
    return ContactOut(
        id=contact.id,
        name=contact.name,
        phone_number=contact.phone_number,
    )

def contact_in_to_contact(contact_in: ContactIn ) -> Contact:
    return Contact(
        name=contact_in.name,
        phone_number=contact_in.phone_number,
    )
