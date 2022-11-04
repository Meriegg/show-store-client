import Portal from "./Portal";
import styles from "@styles/Components/Ui/Modal.module.scss";
import { CloseOutline } from "react-ionicons";
import { ReactNode } from "react";
import {
  setBlocking,
  removeBlocking,
} from "@rootDir/redux/scrollBlock/scrollBlockSlice";
import { useDispatch } from "react-redux";

interface Props {
  children: ReactNode;
  title: string;
  isShowing: boolean;
  isShowingHandler: Function;
}

export const showModal = (showingHandler: Function, dispatch: Function) => {
  dispatch(setBlocking());
  showingHandler(true);
};

export const closeModal = (showingHandler: Function, dispatch: Function) => {
  dispatch(removeBlocking());
  showingHandler(false);
};

const Modal = ({ children, title, isShowing, isShowingHandler }: Props) => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(removeBlocking());
    isShowingHandler(false);
  };

  if (typeof document === undefined || !isShowing) return null;

  return (
    <Portal targetElement={document.getElementById("modal-root")}>
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <div className={styles.header}>
            <p>{title}</p>
            <button onClick={() => closeModal()}>
              <CloseOutline color={"#00000"} height="25px" width="25px" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
