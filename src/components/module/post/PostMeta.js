import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  .post {
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;

const PostMeta = ({
  date = "Mar 23",
  author = "Andiez Le",
  className = "",
  to = "",
}) => {
  return (
    <PostMetaStyles className={className}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <Link to={`/author/${to}`}>
        <span className="post-author" title={author}>
          {author.slice(0, 10) + "..."}
        </span>
      </Link>
    </PostMetaStyles>
  );
};

export default PostMeta;
