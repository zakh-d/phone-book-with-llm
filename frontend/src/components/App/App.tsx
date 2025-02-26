import Row from "react-bootstrap/esm/Row"
import ContactList from "../ContactList/ContactList"
import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"
import CreateContactModal from "../ContactModal/CreateContactModal";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import './app.css'

function App() {
	const [createContactModalShow, setCreateContactModalShow] = useState(false);
	return (
		<Container fluid>
			<Row>
				<Col sm={4} className="border-end vh-100 d-flex flex-column justify-content-between">
					<div style={{
						height: "90vh",
						overflowY: "scroll",
					}} className="no-scrollbar">
						<h1>Phonebook</h1>
						<ContactList />
					</div>
					<Button className="w-100 mb-2" onClick={() => setCreateContactModalShow(true)}>Add contact</Button>
				</Col>
			</Row>
			<CreateContactModal show={createContactModalShow} handleClose={() => setCreateContactModalShow(false)} />
		</Container>

	)
}

export default App
