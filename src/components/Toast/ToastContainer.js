import styles from "./ToastContainer.module.css";

import { useToast } from "../../contexts";
import Toast from "./Toast";

export default function ToastContainer() {
  const { state } = useToast();

  return (
    <div className={styles["toast-container"]}>
      {state.map((toast) => {
        return <Toast key={toast.id} toast={toast} />;
      })}
    </div>
  );
}
