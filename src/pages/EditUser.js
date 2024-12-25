import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, TextField, Typography } from "@mui/material";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`https://reqres.in/api/users/${id}`);
      setUser(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${id}`, user);
      console.log("User updated:", response.data);
      // Pass the updated user to the users list page
      navigate("/users", { state: { updatedUser: response.data } });
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 8, textAlign: "center" }}>
      <Typography variant="h4">Edit User</Typography>
      <TextField
        fullWidth
        label="First Name"
        margin="normal"
        value={user.first_name}
        onChange={(e) => setUser({ ...user, first_name: e.target.value })}
      />
      <TextField
        fullWidth
        label="Last Name"
        margin="normal"
        value={user.last_name}
        onChange={(e) => setUser({ ...user, last_name: e.target.value })}
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpdate}
        sx={{ mt: 2 }}
      >
        Update
      </Button>
    </Box>
  );
};

export default EditUser;
