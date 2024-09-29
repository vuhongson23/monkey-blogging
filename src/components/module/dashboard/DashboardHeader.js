import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;

const DashboardHeader = () => {
  const { userInfo } = useAuth();
  return (
    <DashboardHeaderStyles>
      <Button to="/manage/add-post" className="header-button" height="52px">
        Write new post
      </Button>
      <Link className="header-avatar" to={`/profile/${userInfo.uid}`}>
        <img src={userInfo.avatar} alt="" />
      </Link>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
