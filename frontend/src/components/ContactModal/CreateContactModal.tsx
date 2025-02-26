import Modal from "react-bootstrap/esm/Modal";
import ContactCreateForm from "../ContactForm/ContactCreateForm";

type ContactModalProps = {
    show: boolean,
    handleClose: () => void
}

const CreateContactModal = ({show, handleClose}: ContactModalProps) => {
    return (
        <>
            <Modal onHide={handleClose} show={show}>
                <Modal.Title className="text-center">Create new contact</Modal.Title>
                <Modal.Body>
                    <ContactCreateForm afterSubmit={handleClose}/>
                </Modal.Body>
            </Modal>
        </>
    )
}


export default CreateContactModal;