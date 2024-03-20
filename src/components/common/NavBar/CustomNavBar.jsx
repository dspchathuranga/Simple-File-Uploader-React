import React from "react";
import { Navbar, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";

const CustomNavBar = () => {
  return (
    <Navbar bg="primary" expand="sm">
      <Nav>
        <NavItem>
          <NavLink><Link className='text-decoration-none' to="/">Home</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link className='text-decoration-none' to="/file-upload">File Upload</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link className='text-decoration-none' to="/upload-status">Upload Status</Link></NavLink>
        </NavItem>
        <NavItem>
          <NavLink><Link className='text-decoration-none' to="/request-approval">Request Approval</Link></NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default CustomNavBar;
