import React from "react";

const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="mb-10 flex items-start justify-between">
      <div>
        <h1 className="dashboard-heading font-bold text-3xl text-[#20B7B5] mb-2">
          {title}
        </h1>
        <p className="dashboard-short-desc">{desc}</p>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeading;
