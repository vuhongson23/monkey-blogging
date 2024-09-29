import React from "react";
import PropTypes from "prop-types";

const Toggle = (props) => {
  const { on, onClick, ...rest } = props;

  return (
    <label>
      <input
        type="checkbox"
        onClick={onClick}
        className="hidden-input"
        onChange={() => {}}
        checked={on}
      />
      <div
        className={`inline-block w-[100px] h-[52px] relative cursor-pointer rounded-full p-1 transition-all ${
          on ? "bg-green-500" : "bg-gray-300"
        }`}
        {...rest}
      >
        <span
          className={`inline-block w-[44px] h-[44px] rounded-full bg-white absolute transition-all ${
            on ? "translate-x-[48px]" : ""
          } `}
        ></span>
      </div>
    </label>
  );
};

Toggle.propTypes = {
  on: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Toggle;
