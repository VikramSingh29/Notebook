import { useState } from "react";

function useAlert() {
  const [alert, setAlert] = useState({ type: "", message: "", show: false });

  const showAlert = (type, message, duration = 0) => {
    setAlert({ type, message, show: true });
    if (duration > 0) {
      setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), duration);
    }
  };

  const clearAlert = () => setAlert({ type: "", message: "", show: false });

  return { alert, showAlert, clearAlert };
}

export default useAlert;
