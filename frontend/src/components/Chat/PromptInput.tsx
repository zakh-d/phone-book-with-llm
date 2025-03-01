import { Formik } from "formik"
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import { addMessage } from "../../redux/chatSlice";
import { useDispatch } from "react-redux";
import { useProcessUserPromptMutation } from "../../api/contacts-api";

const PromptInput = () => {

    const dispatch = useDispatch();
    const [processUserPrompt, {isLoading}] = useProcessUserPromptMutation({
        fixedCacheKey: "processUserPrompt"
    });

    return (
        <Formik
            initialValues={{ user_prompt: "" }}
            onSubmit={(values, {resetForm}) => {
                resetForm();
                dispatch(addMessage({ isUser: true, message: values.user_prompt }));

                processUserPrompt(values.user_prompt).unwrap().then((response) => {
                    dispatch(addMessage({ isUser: false, message: response.message }));
                });
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
                            disabled={isLoading}
                        />
                        {values.user_prompt.length > 0 && !isLoading &&
                            <Button type="submit">Send</Button>
                        }
                    </InputGroup>

                </Form>
            )}
        </Formik>
    );
}

export default PromptInput;