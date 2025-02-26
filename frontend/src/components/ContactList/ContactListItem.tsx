import Accordion from "react-bootstrap/esm/Accordion";
import { ContactWithId } from "../../types/contact";
import Button from "react-bootstrap/esm/Button";
import { useDeleteContactMutation } from "../../api/contacts-api";
import { useState } from "react";
import { BsPatchCheck, BsPen, BsTrash, BsXOctagon } from "react-icons/bs";
import UpdateContactModal from "../ContactModal/UpdateContactModal";

const ContactListItem = ({ contact }: { contact: ContactWithId }) => {
    const [deleteContact, { }] = useDeleteContactMutation();
    const [deleteMode, setDeleteMode] = useState(false);
    const [updateModalShow, setUpdateModalShow] = useState(false);
    return (
        <>
            <Accordion.Item eventKey={contact.id}>
                <Accordion.Header>{contact.name}</Accordion.Header>
                <Accordion.Body>
                    {deleteMode && <b className="text-danger">Delete contact {contact.name}?</b>}
                    <div className="d-flex justify-content-between align-items-center">
                        <span className={deleteMode ? "text-danger" : ""}>{contact.phone_number}</span>
                        <div>
                            {

                                deleteMode ?
                                    (<>
                                        <Button variant="secondary" className="me-1" onClick={() => setDeleteMode(false)}>
                                            <BsXOctagon />
                                        </Button>

                                        <Button variant="danger" onClick={() => {
                                            deleteContact(contact.id);
                                            setDeleteMode(false);
                                        }}>
                                            <BsPatchCheck />
                                        </Button>
                                    </>) :
                                    (<>
                                        <Button className="me-1" onClick={() => setUpdateModalShow(true)}>
                                            <BsPen />
                                        </Button>
                                        <Button variant="danger" onClick={() => setDeleteMode(true)}>
                                            <BsTrash />
                                        </Button>
                                    </>)
                            }

                        </div>
                    </div>
                </Accordion.Body>
            </Accordion.Item>
            <UpdateContactModal contact={contact} show={updateModalShow} handleClose={() => setUpdateModalShow(false)} />
        </>
    )
};

export default ContactListItem;