import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

export const AdminContacts = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllContactsData = async () => {
    try {
      console.log("Authorization Token in AdminUsers:", authorizationToken); // Log token here
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data);
    } catch (error) {
      console.log("Error in fetching users:", error);
    }
  };

  //Delete the user on delete button
  const deleteContact = async (id) => {
    try {
      console.log("Authorization Token in AdminUsers:", authorizationToken);
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.ok) {
        console.log(`Contact with ID ${id} deleted successfully`);
        getAllContactsData();
      } else {
        console.log("Failed to delete user");
      }
    } catch (error) {
      console.log("Error in deleting user:", error);
    }
  };

  useEffect(() => {
    getAllContactsData();
  }, []);

  return (
    <section className="admin-users-section">
      <div className="container">
        <h1>Admin Contacts Data</h1>
      </div>
      <div className="container admin-users">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((curUser, index) => (
              <tr key={index}>
                <td>{curUser.username}</td>
                <td>{curUser.email}</td>
                <td>{curUser.message}</td>
                <td>
                  <button onClick={() => deleteContact(curUser._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
