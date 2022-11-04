import styles from "@styles/Admin/AdminMenu.module.scss";
import Modal from "@components/Ui/Modal";
import CreateType from "./CreateType";
import TypeDisplay from "../AdminComponents/TypeDisplay";
import LocalProductsDisplay from "./LocalProductsDisplay";
import { ButtonFill } from "@components/Ui/Button";
import { useState } from "react";
import { RootState } from "@rootDir/types";
import { useSelector } from "react-redux";

interface Props {
  setActivePageIdx: Function;
}
const HomeDash = ({ setActivePageIdx }: Props) => {
  const localState = useSelector((root: RootState) => root.localValues.value);
  const [typeModalOpen, setTypeModalOpen] = useState(false);

  return (
    <div className={styles.options}>
      <div>
        <Modal
          isShowing={typeModalOpen}
          isShowingHandler={setTypeModalOpen}
          title={"Add a type!"}
        >
          <CreateType showHandler={setTypeModalOpen} />
        </Modal>
        <h3>Types</h3>
        <TypeDisplay localState={localState} styles={styles} />
        <ButtonFill
          style={{ marginTop: "15px" }}
          onClick={() => setTypeModalOpen(true)}
        >
          Add Type
        </ButtonFill>
      </div>
      <div>
        <h3>Products (hover or tap for options)</h3>
        <LocalProductsDisplay localState={localState} styles={styles} />
        <ButtonFill
          style={{ marginTop: "10px" }}
          onClick={() => setActivePageIdx(1)}
        >
          Add Product
        </ButtonFill>
      </div>
    </div>
  );
};

export default HomeDash;
