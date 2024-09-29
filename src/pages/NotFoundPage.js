import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    display: inline-block;
    width: 150px;
    margin-bottom: 40px;
  }
  .heading {
    font-size: 60px;
    margin-bottom: 20px;
  }
  .back {
    display: block;
    color: white;
    background-color: ${(props) => props.theme.primary};
    padding: 15px 35px;
    border-radius: 8px;
    font-weight: 500;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to={"/"}>
        <img srcSet="/logo.png 2x" alt="monkey-blogging" className="logo" />
      </NavLink>
      <h1 className="heading">Oops! Not Found Page</h1>
      <NavLink to={"/"} className={"back"}>
        Back to home
      </NavLink>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
