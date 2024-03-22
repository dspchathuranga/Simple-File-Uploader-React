import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../../contexts/auth/authSlice";
import { useSelector } from "react-redux";

const CustomNavBar = () => {
  const user = useSelector(selectCurrentUser);
  const isAdmin = user && user.groups.includes(`${process.env.REACT_APP_AUTHORIZE_GROUP}`);
  // console.log(userGroup, isAdmin);

  return (
    <Navbar bg="primary" expand="sm">
      <Nav>
        {/* <NavItem>
          <NavLink><Link className='text-decoration-none' to="/">Home</Link></NavLink>
        </NavItem> */}
        <NavItem>
          <NavLink>
            <Link className="text-decoration-none" to="/file-upload">
              File Upload
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link className="text-decoration-none" to="/upload-status">
              Upload Status
            </Link>
          </NavLink>
        </NavItem>
        {isAdmin && (
          <NavItem>
            <NavLink>
              <Link className="text-decoration-none" to="/request-approval">
                Request Approval
              </Link>
            </NavLink>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};

export default CustomNavBar;
