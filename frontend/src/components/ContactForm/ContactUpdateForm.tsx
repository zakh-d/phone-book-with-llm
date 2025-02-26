import { useUpdateContactMutation } from "../../api/contacts-api"
import { ContactWithId } from "../../types/contact";
import ContactForm from "./ContactForm";

type ContactUpdateFormProps = {
    initialContact: ContactWithId,
    afterSubmit?: () => void
}

const ContactUpdateForm = ({initialContact, afterSubmit}: ContactUpdateFormProps) => {
    const [updateContact, {}] = useUpdateContactMutation();

    return <ContactForm contact={initialContact} onSubmit={(contact) => {
        updateContact({ ...contact, id: initialContact.id })
    }} afterSubmit={afterSubmit} />
}

export default ContactUpdateForm;