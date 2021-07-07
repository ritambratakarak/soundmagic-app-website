import React from "react";
import { ToastContainer } from "react-toastify";

export const ToastBox = () => {
  return (
    <ToastContainer
      position={"top-right"}
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
    />
  );
};
