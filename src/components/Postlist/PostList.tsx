import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { PostContext } from "../../contexts/postContext";

const PostList: React.FC = () => {
    const navigate = useNavigate();

    const handleDonateClick = () => {
        navigate("/donate");
    };

    const { postState, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        const fetchData = async () => {
            await getAllPosts();
        };

        fetchData();
    }, []);

    const postData = postState.posts;

    return (
        <div className="flex gap-10 justify-center flex-wrap items-center py-10">
            {postData &&
                postData.map(
                    ({
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
                    }) => {
                        return (
                            <Post
                                key={_id}
                                _id={_id}
                                title={title}
                                type={type}
                                createAt={createAt}
                                location={location}
                                body={body}
                                photoUrl={photoUrl}
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
