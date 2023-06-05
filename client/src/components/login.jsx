import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({});
  const [redirect, setRedirect] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "http://localhost:3001/api/v1/users/login";

    await axios.post(url, data).then((response) => {
      const user = response?.data?.user?.dataValues;
      sessionStorage.setItem("user", JSON.stringify(user));

      if (response.status === 200) setRedirect("/uf/conversion");
    });
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return redirect !== null ? (
    <Navigate path="login" to={redirect} />
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={handleInput}
          name="username"
          defaultValue={data?.username}
        />
        <input
          type="password"
          onChange={handleInput}
          name="password"
          defaultValue={data?.password}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;
