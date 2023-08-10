import React from "react";
import AppRouter from "./router/Router";
import AuthContextProvider from "./contexts/authContext";

const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <div>
        <AppRouter />
      </div>
    </AuthContextProvider >
  );
};

export default App;
