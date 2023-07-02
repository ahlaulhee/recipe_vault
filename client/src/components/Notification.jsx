import React from "react";
import styles from "./notification.module.css";

function Notification({ show, message }) {
  if (!show) {
    return null;
  }

  return <div className={styles.notification}>{message}</div>;
}

export default Notification;
