import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import List from "./components/ufvalue/list";
import Form from "./components/ufvalue/form";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="uf">
          <Route path="historial" element={<List />}></Route>
          <Route path="conversion" element={<Form />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
