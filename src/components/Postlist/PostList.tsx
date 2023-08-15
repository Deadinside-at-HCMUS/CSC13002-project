import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { PostContext } from "../../contexts/postContext";

const PostList: React.FC = () => {
    const navigate = useNavigate();

    const handleDonateClick = () => {
        navigate("/donate");
    };

    // loi cai nay wa homepage de xu ly, va phai truyen vao trong PostList nay cac Post data
    const { postState, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        const fetchData = async () => {
            await getAllPosts();
        };

        fetchData();
    }, []);

    const postData = postState.posts;

    // const sortedPostData =

    return (
        <div className="flex gap-10 justify-center flex-wrap items-start py-10">
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
                        createdAt,
                    }) => {
                        return (
                            <Post
                                key={_id}
                                _id={_id}
                                title={title}
                                type={type}
                                createAt={createdAt}
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
