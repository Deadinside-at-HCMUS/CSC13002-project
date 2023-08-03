import React from 'react';

interface ReceiveButtonProps {
    onClick: () => void;
}

const ReceiveButton: React.FC<ReceiveButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="receive-button">
            Receive
        </button>
    );
};

export default ReceiveButton;
