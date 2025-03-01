import { Formik } from "formik"
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";

const PromptInput = () => {
    return (
        <Formik
            initialValues={{ user_prompt: "" }}
            onSubmit={(values) => {
                console.log(values.user_prompt);
            }}>
            {({ values, handleChange, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <InputGroup className="mb-2">
                        <Form.Control
                            type="text"
                            name="user_prompt"
                            placeholder="Type a message..."
                            value={values.user_prompt}
                            onChange={handleChange}
                        />
                        {values.user_prompt.length > 0 &&
                            <Button type="submit">Send</Button>
                        }
                    </InputGroup>

                </Form>
            )}
        </Formik>
    );
}

export default PromptInput;