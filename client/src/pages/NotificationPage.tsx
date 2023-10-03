import React from 'react';
import Notification from '../components/Notification/Notification'; // Import your Notification component

export interface NotificationData {
    id: number;
    message: string;
    timestamp: string;
}


const notifications: NotificationData[] = [
    { id: 1, message: 'New message received', timestamp: '2023-08-10 14:30' },
    { id: 2, message: 'You have a new friend request', timestamp: '2023-08-10 15:45' },
];

const NotificationPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="space-y-4">
                {notifications.map(notification => (
                    <Notification key={notification.id} data={notification} />
                ))}
            </div>
        </div>
    );
};

export default NotificationPage;
