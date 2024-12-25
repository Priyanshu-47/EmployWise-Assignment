import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../src/pages/Login";
import UsersList from "../src/pages/UsersList";
import EditUser from "../src/pages/EditUser";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/users"
        element={isAuthenticated ? <UsersList /> : <Navigate to="/login" />}
      />
      <Route
        path="/users/:id/edit"
        element={isAuthenticated ? <EditUser /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;