import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Login site</h1>
      <form action="/login" method="post">
        <div>
          <input type="text" name="username" placeholder="Username" required />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
