import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { PostContext } from "../../contexts/postContext";

// const PostData = [
//     {
//         id: 1,
//         title: "Vuon Lai Retreat",
//         time: "Now",
//         location: "Ho Chi Minh",
//         description:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         imgUrl: "https://duonglaovuonlai.vn/upload/photo/logo_15254024042019.png",
//     },
//     {
//         id: 2,
//         title: "Vuon Lai Retreat",
//         time: "Now",
//         location: "Ho Chi Minh",
//         description:
//             "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
//         imgUrl: "https://duonglaovuonlai.vn/upload/photo/logo_15254024042019.png",
//     },
// ];

const PostList: React.FC = () => {
    const navigate = useNavigate();

    const handleDonateClick = () => {
        navigate("/donate");
    };

    const { postState } = useContext(PostContext);

    const postData = postState.posts;

    return (
        <div className="flex gap-10 justify-center flex-wrap items-center py-10">
            {postData.map(
                ({
                    id,
                    type,
                    title,
                    body,
                    author,
                    items,
                    status,
                    location,
                    match,
                    isArchived,
                    photoLink,
                    createAt,
                }) => {
                    return (
                        <Post
                            key={id}
                            id={id}
                            title={title}
                            type={type}
                            createAt={createAt}
                            location={location}
                            body={body}
                            photoLink={photoLink}
                            author={author}
                            items={items}
                            status={status}
                            match={match}
                            isArchived={isArchived}
                            onDonateClick={handleDonateClick}
                        />
                    );
                }
            )}
        </div>
    );
};

export default PostList;
