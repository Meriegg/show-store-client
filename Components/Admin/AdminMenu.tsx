import styles from "@styles/Admin/AdminMenu.module.scss";
import Home from "./AdminComponents/Home";
import CreateProduct from "./AdminComponents/CreateProducts";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@rootDir/types";

const AdminMenu = () => {
  const adminState = useSelector((root: RootState) => root.admin.value);
  const [activePageIdx, setActivePageIdx] = useState(0);

  const pages = [Home, CreateProduct];

  return (
    <div
      className={`${styles.main} ${
        adminState.isShowingAdminMenu && styles.main_open
      }`}
    >
      <div className={styles.mainContent}>
        {pages.map((Component, componentIdx) => (
          <>
            {componentIdx === activePageIdx ? (
              <Component setActivePageIdx={setActivePageIdx} />
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};

export default AdminMenu;
