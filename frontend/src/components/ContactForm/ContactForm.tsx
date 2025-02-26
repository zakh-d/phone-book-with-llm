import Form from "react-bootstrap/esm/Form"
import { Contact } from "../../types/contact"
import Button from "react-bootstrap/esm/Button"
import { Formik } from "formik"

type ContactFormProps = {
    contact?: Contact,
    onSubmit: (contact: Contact) => void,
    afterSubmit?: () => void
}

const ContactForm = ({ contact, onSubmit, afterSubmit}: ContactFormProps) => {
    return (
        <Formik
            initialValues={{
                name: contact?.name || '',
                phone_number: contact?.phone_number || ''
            }}
            validate={(values) => {
                const errors: any = {};
                if (!values.name) {
                    errors.name = 'Name is required';
                }

                if (
                    !(/^\+?[0-9 ()-]+$/.test(values.phone_number))
                ) {
                    errors.phone_number = 'Phone number can consist only of numbers, spaces, brackets and dashes';
                }

                if (!values.phone_number) {
                    errors.phone_number = 'Phone number is required';
                }
                return errors;
            }}
            onSubmit={(values) => {
                onSubmit(values);
                afterSubmit && afterSubmit();
             }}
        >
            {({ values, handleChange, handleSubmit, handleBlur, isValid, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur}/>
                        {errors.name && touched.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Phone number</Form.Label>
                        <Form.Control type="text" placeholder="Enter phone number" name="phone_number" value={values.phone_number} onChange={handleChange} onBlur={handleBlur}/>
                        {errors.phone_number && touched.phone_number && <Form.Text className="text-danger">{errors.phone_number}</Form.Text>}
                    </Form.Group>

                    {/* !! means converting to boolean */}
                    <Button type="submit" className="mt-2 w-100" disabled={!(values.name !== "" && values.phone_number !== "" && isValid)}>
                        Submit
                    </Button>
                </Form>
            )}

        </Formik>
    )
}

export default ContactForm;