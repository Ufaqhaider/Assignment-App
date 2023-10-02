import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastManager = {
  success: (message) => {
    toast.success(message, {
      hideProgressBar: true,
      position: "bottom-left",
      theme: "colored",
    });
  },
  error: (message) => {
    toast.error(message, {
      hideProgressBar: true,
      position: "top-right",
      theme: "colored",
    });
  },
  info: (message) => {
    toast.info(message);
  },
  warning: (message) => {
    toast.warning(message);
  },
};
export { ToastManager, ToastContainer };
