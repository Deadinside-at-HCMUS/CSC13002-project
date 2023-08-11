import React from 'react';

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
    return (
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
