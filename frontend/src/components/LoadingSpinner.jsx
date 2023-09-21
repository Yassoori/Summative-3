import React from "react";
import { Puff } from "react-loader-spinner";

const LoadingSpinner = ({
  type = "Puff",
  color = "#686868",
  height = 100,
  width = 100,
}) => {
  return (
    <div className="loading-spinner">
      {/* <Puff className="puff" /> */}
      <Puff className="puff" color={color} height={height} width={width} />
    </div>
  );
};

export default LoadingSpinner;
