import { useNavigate } from "react-router-dom";
import { HiChatAlt2 } from "react-icons/hi";

const ChatBot = () => {
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/profile/message");
    };

    return (
        <div
            className="fixed right-4 bottom-4"
            style={{ zIndex: "1000" }}
            onClick={handleOnClick}
        >
            <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
                <HiChatAlt2 size="50" className="text-[#60A5FA]" />
            </button>
        </div>
    );
};

export default ChatBot;
