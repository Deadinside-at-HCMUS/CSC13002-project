import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <h1>Register site</h1>
      <form action="/register" method="post">
        <input type="text" name="username" placeholder="Username" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
