import styles from "@styles/Components/PrototypeAlert.module.scss";
import { useState, useEffect } from "react";
import { ButtonFill, ButtonOutline } from "./Ui/Button";

const PrototypeAlert = () => {
  const [isClosed, setIsClosed] = useState(false);

  const closeAlert = () => {
    localStorage.setItem("PROT_CLOSE", "closed");
    setIsClosed(true);
  };

  useEffect(() => {
    setIsClosed(localStorage.getItem("PROT_CLOSE") === "closed" ? true : false);
  }, []);

  if (isClosed) return null;

  return (
    <div className={styles.alert}>
      <div className={styles.alert_left}>
        <p>!</p>
      </div>
      <div className={styles.alert_right}>
        <p>
          {
            "Don't forget this site is a prototype, if you are interested in this you can contact me down below!"
          }
        </p>
        <div className={styles.alert_right_buttons}>
          <a
            href="https://mariodev.vercel.app/contact"
            referrerPolicy="no-referrer"
          >
            <ButtonFill>Contact Me</ButtonFill>
          </a>
          <ButtonOutline onClick={() => closeAlert()}>
            OK, close this
          </ButtonOutline>
        </div>
      </div>
    </div>
  );
};

export default PrototypeAlert;
