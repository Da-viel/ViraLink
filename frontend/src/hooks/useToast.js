import { useEffect } from "react";
import { useMessage } from "../context/MessageContext";
import toast from "react-hot-toast";

const useToast = () => {
  //Hooks personalizados
  const [message, setMessage] = useMessage;

  useEffect(() => {
    try {
      if (message) {
        if (message.status === "ok") {
          toast.success(message.text, { duration: 3000, id: 1 });
        } else {
          toast.error(message.text, { duration: 3000, id: 2 });
        }
      }
    } finally {
      setMessage(null);
    }
  }, [message, setMessage]);
};

export default useToast;
