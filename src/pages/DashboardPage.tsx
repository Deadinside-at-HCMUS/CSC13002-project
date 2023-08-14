import React, { useContext, useEffect } from "react";
import StatsGrid from "../components/Chart/StatsGrid";
import TransactionChart from "../components/Chart/TransactionChart";
import UserPieChart from "../components/Chart/UserPieChart";
import PostTable from "../components/Chart/PostTable";
import { AuthContext } from "../contexts/authContext";
import { PostContext } from "../contexts/postContext";

const DashboardPage: React.FC = () => {
    const { authState } = useContext(AuthContext);

    const { postState, getAllPosts, getUserPosts } = useContext(PostContext);

    const postData = postState.posts;
    const authUser = authState.user;
    const authUsers = authState.users;

    useEffect(() => {
        const fetchData = async () => {
            if (authUser?.role === "collaborator") {
                await getAllPosts();
            } else {
                await getUserPosts();
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <StatsGrid
                totalDonations={21}
                totalReceives={23}
                totalUsers={72}
                totalConnections={50}
            />
            <div className="flex flex-row gap-4 w-full">
                <TransactionChart />
                <UserPieChart />
            </div>
            <PostTable
                authUser={authUser}
                authUsers={authUsers}
                postData={postData}
            />
        </div>
    );
};

export default DashboardPage;
