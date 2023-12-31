import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PostContainer from "./Post";
import { Post } from "../../reducers/postReducer";
import { AuthContext } from "../../contexts/authContext";

interface PostListProps {
    filteredPosts: Post[] | null;
}

const PostList: React.FC<PostListProps> = ({ filteredPosts }) => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleDonateClick = () => {
        isAuthenticated ? navigate("/donate") : navigate("/login");
    };

    return (
        <div className="flex gap-10 justify-center flex-wrap items-start py-10">
            {filteredPosts &&
                filteredPosts.map(
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
                            <PostContainer
                                key={_id}
                                _id={_id}
                                title={title}
                                type={type}
                                createdAt={createdAt}
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