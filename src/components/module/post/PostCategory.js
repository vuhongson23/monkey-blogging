import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100px;
  text-overflow: ellipsis;
  padding: 8px 12px;
  border-radius: 10px;
  color: #6b6b6b;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  color: ${(props) => props.theme.gray6B};
  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: ${(props) => props.theme.grayF3};
    `};
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
      color: ${(props) => props.theme.gray6B};
    `};
`;

const PostCategory = ({
  children,
  type = "primary",
  className = "",
  to = "",
}) => {
  return (
    <PostCategoryStyles type={type} className={`post-category ${className}`}>
      <Link to={`/category/${to}`}>{children}</Link>
    </PostCategoryStyles>
  );
};

export default PostCategory;
