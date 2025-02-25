import Row from "react-bootstrap/esm/Row"
import ContactList from "../ContactList/ContactList"
import Col from "react-bootstrap/esm/Col"
import Container from "react-bootstrap/esm/Container"

function App() {
	return (
		<Container fluid>
			<Row>
				<Col sm={4} className="border-end vh-100">
					<h1>Phonebook</h1>
					<ContactList/>
				</Col>	
			</Row>
		</Container>

	)
}

export default App
