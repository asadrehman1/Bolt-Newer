import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin shadow-lg"></div>
    </div>
  );
};

export default LoadingSpinner;
