import React from "react"
import { useNavigate } from "react-router-dom"

const ProfilePage: React.FC = () => {
    let navigate = useNavigate()

    const handleLogOut = () => {
        navigate('/login')
    }

    return (
        <div>
            Profile Page: Team Leader
            <img
                width="100px"
                src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/325851569_561708135855653_5206424362817635465_n.jpg?_nc_cat=111&cb=99be929b-59f725be&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=FOuulZQJ-g8AX-PNqzT&_nc_ht=scontent.fsgn5-15.fna&oh=00_AfDmDyRLKoFpbGipZqQjvyoPcK7ZZVjNb_dYibZuiavShw&oe=64D2D740" />
            <button className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded" onClick={handleLogOut}>Log Out</button>
        </div>
    )
}

export default ProfilePage
