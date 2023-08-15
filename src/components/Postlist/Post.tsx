import React, { useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { Item } from "../../reducers/postReducer";

interface PostProps {
    _id: string;
    type: string;
    title: string;
    body: string;
    author: string;
    items: Item[];
    status: string;
    location: string;
    match: string[];
    isArchived: boolean;
    photoUrl: string;
    createAt: string;
    onDonateClick: () => void;
}


const Post: React.FC<PostProps> = ({
    _id,
    type,
    title,
    body,
    author,
    items,
    status,
    location,
    match,
    isArchived,
    photoUrl,
    createAt,
    onDonateClick,
}) => {
    const [showFullBody, setShowFullBody] = useState(false);

    const toggleShowFullBody = () => {
        setShowFullBody(!showFullBody);
    };

    return (
        <div key={_id}>
            <div className="group group/item w-[250px] p-[20px] bg-white rounded-[10px] hover:bg-[#2a68ff] shadow-lg shadow-[#f1f4f8]-700 hover:shadow-lg cursor-pointer">
                <span className="flex justify-between items-center gap-4">
                    <h1 className="text-[16px] font-semibold group-hover:text-white">
                        {title}
                    </h1>
                    <span className="flex items-center text-[#ccc] gap-1">
                        <BiTimeFive />
                        {createAt}
                    </span>
                </span>
                <h6 className="text-[#ccc]">{location}</h6>
                <p className="text-[13px] text-[#95959] pt-[20px] border-t-[2px] mt-[20px] group-hover:text-[#fff]">
                    {showFullBody ? body : `${body.slice(0, 300)}...`}
                    {!showFullBody && (
                        <span
                            className="text-[#2a68ff] cursor-pointer hover:text-white"
                            onClick={toggleShowFullBody}
                        >
                            Read More
                        </span>
                    )}
                </p>

                <div className="flex items-center gap-2 w-[250px] py-[10px]" >
                    <img src={photoUrl} className="w-[80%]" alt="Post Image" />
                </div>

                {type === "Receiving" && (
                    <button
                        className="bg-blue-500 text-white border-[2px] rounded-[10px] block p-[10px] w-full text-[14px] font-semibold group-hover:bg-white group-hover:text-[#2a68ff]"
                        onClick={onDonateClick}
                    >
                        Donate
                    </button>
                )}
            </div>
        </div >
    );
};

export default Post;
