import React from 'react';
import { IoIosNotifications } from 'react-icons/io'

export interface NotificationData {
    id: number;
    message: string;
    timestamp: string;
}

interface NotificationProps {
    data: NotificationData;
}

const Notification: React.FC<NotificationProps> = ({ data }) => {
    return (
        <div className="bg-white p-4 shadow-md rounded-md flex flex-row mr-20 gap-5 items-center">
            <div className='flex flex-col text-blue-600'>
                <IoIosNotifications fontSize='25px' />

            </div>
            <div className='flex flex-col'>
                <p className="text-gray-600">{data.message}</p>
                <p className="text-gray-400 text-xs mt-1">{data.timestamp}</p>
            </div>
        </div>
    );
};

export default Notification;
