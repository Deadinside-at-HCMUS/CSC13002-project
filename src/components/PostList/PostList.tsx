import React from 'react'
import { useNavigate } from 'react-router-dom'
import Post from './Post'

const PostData = [
    {
        id: 1,
        title: "Vuon Lai Retreat",
        time: "Now",
        location: "Ho Chi Minh",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imgUrl: "https://duonglaovuonlai.vn/upload/photo/logo_15254024042019.png"
    },
    {
        id: 2,
        title: "Vuon Lai Retreat",
        time: "Now",
        location: "Ho Chi Minh",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        imgUrl: "https://duonglaovuonlai.vn/upload/photo/logo_15254024042019.png"
    }
]

const PostList: React.FC = () => {
    let navigate = useNavigate();

    const handleDonateClick = () => {
        navigate('/donate')
    };

    return (
        <div className="flex gap-10 justify-center flex-wrap items-center py-10">
            {
                PostData.map(({ id, title, time, location, description, imgUrl }) => {
                    return (
                        <Post
                            id={id}
                            title={title}
                            time={time}
                            location={location}
                            description={description}
                            imgUrl={imgUrl}
                            onDonateClick={handleDonateClick}
                        />
                    )
                }
                )}

        </div >
    )
}

export default PostList
