import Messages from "./Messages";
import PromptInput from "./PromptInput";

const Chat = () => {
    return (
        <div className="vh-100 d-flex flex-column justify-content-between">
            <div style={{
                height: "90vh",
                overflowY: "scroll",
            }}>
                <Messages />
            </div>
            <PromptInput />
        </div>
    );
}


export default Chat;