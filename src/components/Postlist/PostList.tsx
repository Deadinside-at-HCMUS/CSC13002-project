import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Post from "./Post";
import { PostContext } from "../../contexts/postContext";

interface PostListProps {
    selectedType: string;
    selectedSortBy: string;
}

const PostList: React.FC<PostListProps> = ({
    selectedType,
    selectedSortBy,
}) => {
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

    console.log(selectedType);

    const postData = postState.posts;

    let filteredPosts = selectedType
        ? postData.filter((postDatum) => postDatum.type === selectedType)
        : postData;

    if (selectedSortBy === "time") {
        filteredPosts.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );
    } else if (selectedSortBy === "verified") {
        filteredPosts = filteredPosts.filter(
            (postDatum) => postDatum.status === "Verified"
        );
    } else {
        filteredPosts = filteredPosts;
    }

    console.log(filteredPosts);

    return (
        <div className="flex gap-10 justify-center flex-wrap items-center py-10">
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
