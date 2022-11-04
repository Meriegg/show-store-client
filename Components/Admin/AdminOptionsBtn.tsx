import styles from "@styles/Admin/AdminOptionsBtn.module.scss";
import { CogOutline } from "react-ionicons";
import { ButtonFill } from "@components/Ui/Button";
import { useDispatch } from "react-redux";
import { setAdminMenuState } from "@rootDir/redux/admin/adminSlice";

const AdminOptionsBtn = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.main}>
      <ButtonFill
        onClick={() => dispatch(setAdminMenuState({ val: true }))}
        data-admin-options
      >
        <CogOutline
          color={"#fff"}
          height="25px"
          width="25px"
          style={{ display: "flex", alignItems: "center" }}
        />
        Admin Options
      </ButtonFill>
    </div>
  );
};

export default AdminOptionsBtn;
