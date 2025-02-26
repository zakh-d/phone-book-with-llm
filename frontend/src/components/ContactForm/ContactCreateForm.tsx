import { useAddContactMutation } from "../../api/contacts-api"
import ContactForm from "./ContactForm";

const ContactCreateForm = () => {
    const [createForm, {}] = useAddContactMutation();
    return <ContactForm onSubmit={createForm} />
}

export default ContactCreateForm;