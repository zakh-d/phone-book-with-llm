import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Badge from "react-bootstrap/esm/Badge";
import { useProcessUserPromptMutation } from "../../api/contacts-api";
import Spinner from "react-bootstrap/esm/Spinner";
import { useEffect, useRef } from "react";

const Messages = () => {
    const messages = useSelector((state: RootState) => state.chat.messages);
    const [_, { isLoading }] = useProcessUserPromptMutation({
        fixedCacheKey: "processUserPrompt"
    });

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const messageElements = messages.map((message, index) => (
        <div key={index} className={message.isUser ? "text-end me-2 " : ""}>
            <Badge
                style={{
                    whiteSpace: "pre-line",
                    textAlign: "start",
                    fontSize: "1rem",
                    maxWidth: "50%",
                    display: "inline-block",
                }}
                className="mb-1"
                bg={message.isUser ? "primary" : "secondary"}
            >
                {message.message}
            </Badge>
        </div>
    ));
    return (
        <div>
            <h1>Chat with AI Assistant</h1>
            <hr />
            {messageElements}
            {isLoading &&
            <Spinner animation="grow"/>}
            <div style={{float: "left", clear: "both"}} ref={messagesEndRef}></div>
        </div>
    );
}

export default Messages;