import Accordion from "react-bootstrap/esm/Accordion";
import { ContactWithId } from "../../types/contact";

const ContactListItem = ({ contact }: { contact: ContactWithId }) => {
    return (
        <>
            <Accordion.Item eventKey={contact.id}>
                <Accordion.Header>{contact.name}</Accordion.Header>
                <Accordion.Body>
                    <p>{contact.phone_number}</p>
                </Accordion.Body>
            </Accordion.Item>
        </>
    )
};

export default ContactListItem;