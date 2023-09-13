import React from "react";
import { Puff } from "react-loader-spinner";

const LoadingSpinner = ({
  type = "Puff",
  color = "#00BFFF",
  height = 100,
  width = 100,
}) => {
  return (
    <div className="loading-spinner">
      <Puff color={color} height={height} width={width} />
    </div>
  );
};

export default LoadingSpinner;
