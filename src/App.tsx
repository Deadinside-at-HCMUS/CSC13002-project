import React from "react";
import AppRouter from "./router/Router";
import AuthContextProvider from "./contexts/authContext";
import PostContextProvider from "./contexts/postContext";

const App: React.FC = () => {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <div>
                    <AppRouter />
                </div>
            </PostContextProvider>
        </AuthContextProvider>
    );
};

export default App;
