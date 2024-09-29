import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

import "./UserPage.css";

const Userpage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getAll");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delete/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Filter users based on the search term
  const filteredUsers = users.filter(
    (user) =>
      `${user.fname} ${user.lname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <Container>
        <Typography variant="h4" gutterBottom>
          User Management
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="Search users..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Link to="/add">
            <Button className="add-user-btn">Add User</Button>
          </Link>
        </Box>
        <TableContainer className="table-container">
          <Table>
            <TableHead>
              <TableRow sx={{ width: "100%" }}>
                <TableCell className="table-header-cell">Sr. No</TableCell>
                <TableCell className="table-header-cell">Name</TableCell>
                <TableCell className="table-header-cell">Email</TableCell>
                <TableCell className="table-header-cell">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <TableRow
                    key={user._id}
                    className="table-row"
                    onClick={() => navigate("/shardul")}
                  >
                    <TableCell className="table-cell">{index + 1}</TableCell>
                    <TableCell className="table-cell">
                      {user.fname} {user.lname}
                    </TableCell>
                    <TableCell className="table-cell">{user.email}</TableCell>
                    <TableCell className="table-cell">
                      <Box className="action-buttons">
                        <Link to={`/update/${user._id}`}>
                          <Button className="edit-btn">Edit</Button>
                        </Link>
                        <Button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent row click event from firing
                            deleteUser(user._id);
                          }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default Userpage;
