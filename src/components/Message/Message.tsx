import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

export interface MessageData {
    id: number;
    sender: string;
    message: string;
    timestamp: string;
}

interface MessageProps {
    data: MessageData;
}

const Message: React.FC<MessageProps> = ({ data }) => {
    const {
        authState: { user },
    } = useContext(AuthContext);

    const username = user ? user.username : "";

    return data.sender === "self" ? (
        <div className="flex p-2 justify-end rounded text-right">
            <div className="max-w-md ml-3">
                <p className="text-gray-600">{data.message}</p>
                <p className="text-gray-400 text-xs mt-1">{data.timestamp}</p>
            </div>
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold ml-2.5">
                {username.charAt(0)}
            </div>
        </div>
    ) : (
        <div className="flex p-2">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {data.sender.charAt(0)}
            </div>
            <div className="ml-3">
                <p className="text-gray-800 font-semibold">{data.sender}</p>
                <p className="text-gray-600">{data.message}</p>
                <p className="text-gray-400 text-xs mt-1">{data.timestamp}</p>
            </div>
        </div>
    );
};

export default Message;
