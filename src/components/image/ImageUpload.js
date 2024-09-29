import React, { Fragment } from "react";
import { PropTypes } from "prop-types";

const ImageUpload = (props) => {
  const {
    name,
    className = "",
    progress = 0,
    image,
    handleDeleteImage = () => {},
    ...rest
  } = props;
  return (
    <label
      className={`cursor-pointer flex items-center justify-center border border-dashed w-full min-h-[200px] rounded-lg ${className} relative overflow-hidden group`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        {...rest}
      />
      {!image && progress !== 0 && (
        <div className="loading w-10 h-10 rounded-full border-[5px] border-green-500 border-t-transparent border-b-transparent absolute z-10 animate-spin"></div>
      )}
      {!image && progress === 0 && (
        <div className="flex flex-col text-center items-center font-bold">
          <img
            src="/img-upload.png"
            alt="upload-img"
            className="max-w-[100px] mb-3"
          />
          <span>Choose photo</span>
        </div>
      )}
      {image && (
        <Fragment>
          <img
            src={image}
            alt="uploaded-img"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer absolute z-10 text-red-500 opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible"
            onClick={handleDeleteImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </Fragment>
      )}
      {!image && (
        <div
          className={`absolute h-1 bg-green-500 bottom-0 left-0 transition-all`}
          style={{ width: `${Math.ceil(progress)}%` }}
        ></div>
      )}
    </label>
  );
};

ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  image: PropTypes.string,
};

export default ImageUpload;
