import React from 'react';

interface GiveButtonProps {
    onClick: () => void;
}

const GiveButton: React.FC<GiveButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} className="give-button">
            Give
        </button>
    );
};

export default GiveButton;
