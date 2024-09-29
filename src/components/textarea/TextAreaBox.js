import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";

const TextAreaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    padding: 20px;
    border: 1px solid ${(props) => props.theme.grayf1};
    border-radius: 8px;
    background-color: transparent;
    transition: all ease 0.2s;
    resize: none;
    height: 200px;
  }
  textarea:focus {
    background-color: white;
    border-color: ${(props) => props.theme.primary};
  }
  textarea::-webkit-input-placeholder {
    color: #c4c4c4;
    font-weight: 400;
    font-size: 20px;
  }
  textarea::-moz-input-placeholder {
    color: #c4c4c4;
    font-weight: 400;
    font-size: 20px;
  }
`;

const TextAreaBox = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextAreaStyles>
      <textarea id={name} type={type} {...field} {...props} />
    </TextAreaStyles>
  );
};

export default TextAreaBox;
