import React from 'react';

export function getPostStatus(status: string): React.ReactNode {
    const formattedStatus = status.replace(/_/g, ' ');

    switch (status) {
        case 'POSTED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-purple-600 bg-purple-100">
                    {formattedStatus.toLowerCase()}
                </span>
            );
        case 'VERIFIED':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
                    {formattedStatus.toLowerCase()}
                </span>
            );
        case 'WAITING':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-red-600 bg-red-100">
                    {formattedStatus.toLowerCase()}
                </span>
            );
        case 'DOING':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-yellow-600 bg-yellow-100">
                    {formattedStatus.toLowerCase()}
                </span>
            );
        case 'DONE':
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-green-600 bg-green-100">
                    {formattedStatus.toLowerCase()}
                </span>
            );
        default:
            return (
                <span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
                    {formattedStatus.toLowerCase()}
                </span>
            );
    }
}
