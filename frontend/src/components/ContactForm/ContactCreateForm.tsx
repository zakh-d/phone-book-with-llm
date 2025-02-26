import { useAddContactMutation } from "../../api/contacts-api"
import ContactForm from "./ContactForm";


type ContactCreateFormProps = {
    afterSubmit?: () => void
}

const ContactCreateForm = ({afterSubmit}: ContactCreateFormProps) => {
    const [createForm, {}] = useAddContactMutation();
    return <ContactForm onSubmit={createForm} afterSubmit={afterSubmit}/>
}

export default ContactCreateForm;