import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid border-opacity-75"></div>
    </div>
  );
};

export default Spinner;