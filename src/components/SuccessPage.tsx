import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const SuccessPage = () => {
  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <BsFillCheckCircleFill color="green" size={80} />
        <h4 className="text-2xl font-semibold text-green-500 mb-4">
          Successfull
        </h4>
        <p className="font-normal text-base">
          Thank you for registering into{" "}
          <span className="font-medium italic">UHRSF</span>
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
