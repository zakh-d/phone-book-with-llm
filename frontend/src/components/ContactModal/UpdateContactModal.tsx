import Modal from "react-bootstrap/esm/Modal";
import { ContactWithId } from "../../types/contact";
import ContactUpdateForm from "../ContactForm/ContactUpdateForm";

type ContactModalProps = {
    contact: ContactWithId
    show: boolean,
    handleClose: () => void
}

const UpdateContactModal = ({contact, show, handleClose}: ContactModalProps) => {
    return (
        <>
            <Modal onHide={handleClose} show={show}>
                <Modal.Title className="text-center">Update {contact.name} contact</Modal.Title>
                <Modal.Body>
                    <ContactUpdateForm initialContact={contact} />
                </Modal.Body>
            </Modal>
        </>
    )
}


export default UpdateContactModal;