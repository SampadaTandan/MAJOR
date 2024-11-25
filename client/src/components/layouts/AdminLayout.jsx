import { NavLink, Outlet } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { IoAnalytics } from "react-icons/io5";
// import { FaHome } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { MdOutlineInventory } from "react-icons/md";
import { SiStatuspal } from "react-icons/si";

// import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  // const { user, isLoading } = useAuth();

  // if (isLoading) {
  //   return <h1>Loading...</h1>;
  // }
  // if (!user.isAdmin) {
  //   return <Navigate to="/" />;
  // }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUserLarge />
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <IoMdContact />
                  Contacts
                </NavLink>
              </li>
              <li>
                <MdOutlineInventory />
                Inventory
              </li>
              <li>
                <NavLink to="/admin/analytics">
                  <IoAnalytics />
                Analytics
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/status">
                  <SiStatuspal />
                  Status
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};
