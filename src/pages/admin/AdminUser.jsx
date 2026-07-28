
import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api/Axios";

import AdminLayout from "../../components/adminReuseUI/AdminLayout";

import "./AdminUsers.css";

const AdminUsers = () => {

  const [users, setUsers] = useState([]);

  //search bar
  const [search, setSearch] = useState("");


  // FETCH USERS
  useEffect(() => {

    const fetchUsers = async () => {

      try {

        const { data } = await api.get("/api/admin/users");

        setUsers(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();

  }, []);

  // ✅ DELETE USER FUNCTION (PUT HERE)
  const deleteUser = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/api/admin/users/${id}`);

      setUsers(users.filter((u) => u._id !== id));

    } catch (error) {
      console.log(error);
    }
  };


  const toggleRole = async (id) => {

    try {

      const { data } = await api.put(
        `/api/admin/users/${id}/role`,
        {}
      );

      setUsers(
        users.map((user) =>
          user._id === id
            ? {
              ...user,
              isAdmin: data.isAdmin,
            }
            : user
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  //search bar
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <AdminLayout>

      <div className="users-page">

        <h1>Admin Users</h1>

        {/** Search bar */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="user-search"
        />

        <table className="users-table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user._id}>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  {user.isAdmin ? "Admin" : "User"}
                </td>


                <td>

                  <button
                    className="role-btn"
                    onClick={() => toggleRole(user._id)}
                  >
                    {user.isAdmin
                      ? "Remove Admin"
                      : "Make Admin"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>
  );
};

export default AdminUsers;