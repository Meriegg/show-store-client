import styles from "@styles/Admin/AdminMenu.module.scss";
import HomeTabs from "./HomeTabs";
import { CloseOutline } from "react-ionicons";
import { useDispatch } from "react-redux";
import { setAdminMenuState } from "@rootDir/redux/admin/adminSlice";

interface Props {
  setActivePageIdx: Function;
}

const Home = ({ setActivePageIdx }: Props) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.header}>
        <h1>Admin Menu</h1>
        <button onClick={() => dispatch(setAdminMenuState({ val: false }))}>
          <CloseOutline color={"#00000"} height="30px" width="30px" />
        </button>
      </div>
      <p className={styles.warning}>
        all your changes will be saved locally and will override the store
        values!
      </p>
      <HomeTabs setActivePageIdx={setActivePageIdx} />
    </>
  );
};

export default Home;
