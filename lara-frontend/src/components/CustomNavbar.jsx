import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Navbar, Nav, Toast } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import defaultProfileImage from "../components/default-profile.png";
import imgSrc from "../resources/images/laralogo.webp";
import LogoutModal from "./LogoutModal";
import { baseURL } from './config';

function CustomNavbar() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // state to control dropdown visibility
  const isLoggedIn = localStorage.getItem("token"); // Check if token exists
  const userRole = localStorage.getItem("role"); // Get user role from localStorage
  const dropdownRef = useRef(null);
  const [imagePath, setImagePath] = useState("");
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setShowModal(false);
    setShowToast(true); // Show the toast
    setTimeout(() => {
      setShowToast(false); // Hide the toast after 2 seconds
      navigate("/");
    }, 2000);
  }

  function login() {
    navigate("/login");
  }

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = (e) => {
    if (
      dropdownRef.current &&
      e.relatedTarget &&
      e.relatedTarget instanceof Node &&
      !dropdownRef.current.contains(e.relatedTarget)
    ) {
      setIsOpen(false);
    } else if (!e.relatedTarget) {
      // If relatedTarget is not defined, close the dropdown
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${baseURL}/api/student/profile/image`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "arraybuffer", // Receive the image as a buffer
          }
        );

        // Convert the received image data to Base64
        const base64Image = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );

        // Set the image data to state
        setImage(`data:${response.headers["content-type"]};base64,${base64Image}`);
      } catch (error) {
        // console.error('Error fetching profile image:', error);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <>
      <Navbar bg="light" variant="" expand="lg">
        <Navbar.Brand as={Link} to="/" className="ms-1">
          <img
            src={imgSrc}
            alt="Lara Technologies"
            className="img-fluid"
            style={{ width: "80px", height: "40px" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Conditionally render the logout button */}
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="about">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="course">
                  Course
                </Nav.Link>
                <Nav.Link as={Link} to="external-test-results">
                  Results
                </Nav.Link>
                <div
                  className="dropdown me-3 p-2"
                  style={{ position: "relative" }}
                  onMouseLeave={handleMouseLeave}
                  ref={dropdownRef}
                >
                  {image ? (
                    <img
                      src={image}
                      alt="Profile"
                      className="profile-image img-fluid rounded-circle mt-1"
                      onMouseEnter={handleMouseEnter}
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  ) : (
                    <img
                      src={defaultProfileImage}
                      alt="Default Profile"
                      className="profile-image img-fluid rounded-circle mt-1"
                      onMouseEnter={handleMouseEnter}
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                    />
                  )}

                  {isOpen && (
                    <div
                      className="dropdown-menu show"
                      style={{
                        width: "100%",
                        top: "100%",
                        right: 0,
                        minWidth: "150px",
                        textAlign: "left",
                      }}
                    >
                      <Nav.Link
                        as={Link}
                        to="/studentHome"
                        className="dropdown-item text-dark ms-1"
                      >
                        Profile
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/updateProfile"
                        className="dropdown-item text-dark ms-1"
                      >
                        Update Profile
                      </Nav.Link>
                      <Nav.Link
                        as={Link}
                        to="/changePassword"
                        className="dropdown-item text-dark ms-1"
                      >
                        Change Password
                      </Nav.Link>
                      {/* Conditionally display options based on user role */}
                      {userRole === "ADMIN" && (
                        <Nav.Link
                          as={Link}
                          to="/adminDashboard"
                          className="dropdown-item text-dark ms-1"
                        >
                          Admin Dashboard
                        </Nav.Link>
                      )}
                      {userRole === "SUPER ADMIN" && (
                        <Nav.Link
                          as={Link}
                          to="/superAdminDashboard"
                          className="dropdown-item text-dark ms-1"
                        >
                          Dashboard
                        </Nav.Link>
                      )}
                      {userRole === "TRAINER" && (
                        <Nav.Link
                          as={Link}
                          to="/trainerDashboard"
                          className="dropdown-item text-dark ms-1"
                        >
                          Dashboard
                        </Nav.Link>
                      )}
                      {userRole === "RECRUITER" && (
                        <Nav.Link
                          as={Link}
                          to="/recruiterDashboard"
                          className="dropdown-item text-dark ms-1"
                        >
                          Dashboard
                        </Nav.Link>
                      )}
                      <button
                        type="button"
                        className="btn btn-danger ms-1"
                        onClick={() => setShowModal(true)}
                      >
                        Logout
                      </button>
                      <LogoutModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        onConfirm={handleLogout}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="about">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="course">
                  Course
                </Nav.Link>
                <button className="btn btn-primary m-1" onClick={login}>
                  Login
                </button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Toast
        style={{
          position: "fixed",
          top: 10,
          right: 10,
        }}
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={2000}
        autohide
      >
        <Toast.Body>Logout successful</Toast.Body>
      </Toast>
    </>
  );
}

export default CustomNavbar;
