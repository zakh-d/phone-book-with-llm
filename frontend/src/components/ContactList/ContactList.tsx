import Accordion from "react-bootstrap/esm/Accordion";
import { useGetContactsQuery } from "../../api/contacts-api"
import ContactListItem from "./ContactListItem";

const ContactList = () => {
    const {data, isFetching, isLoading} = useGetContactsQuery();

    if (isFetching || isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            <Accordion>
                {data && data.map(contact => (
                    <ContactListItem key={contact.id} contact={contact} />
                ))}
            </Accordion>
        </>
    )
}

export default ContactList;