import Accordion from "react-bootstrap/esm/Accordion";
import { ContactWithId } from "../../types/contact";
import Button from "react-bootstrap/esm/Button";
import { useDeleteContactMutation } from "../../api/contacts-api";
import { useState } from "react";
import { BsPatchCheck, BsPen, BsTrash, BsXOctagon } from "react-icons/bs";

const ContactListItem = ({ contact }: { contact: ContactWithId }) => {
    const [deleteContact, { }] = useDeleteContactMutation();
    const [deleteMode, setDeleteMode] = useState(false);
    return (
        <>
            <Accordion.Item eventKey={contact.id}>
                <Accordion.Header>{contact.name}</Accordion.Header>
                <Accordion.Body>
                    {deleteMode && <b className="text-danger">Confirm contact deletion</b>}
                    <div className="d-flex justify-content-between align-items-center">
                        <span className={deleteMode ? "text-danger" : ""}>{contact.phone_number}</span>
                        <div>
                            {

                                deleteMode ?
                                    (<>
                                        <Button variant="danger" className="me-1" onClick={() => {
                                            deleteContact(contact.id);
                                            setDeleteMode(false);
                                        }}>
                                            <BsPatchCheck />
                                        </Button>
                                        <Button variant="secondary" onClick={() => setDeleteMode(false)}>
                                            <BsXOctagon />
                                        </Button>
                                    </>) :
                                    (<>
                                        <Button className="me-1">
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
        </>
    )
};

export default ContactListItem;