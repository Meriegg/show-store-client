import styles from "@styles/Admin/HomeTabs.module.scss";
import Orders from "./Orders";
import HomeDash from "./HomeDash";
import { useState } from "react";

interface Props {
  setActivePageIdx: Function;
}

const HomeTabs = ({ setActivePageIdx }: Props) => {
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const tabs = [
    { text: "Main Dashboard", component: HomeDash },
    { text: "Orders", component: Orders },
  ];

  return (
    <div>
      <div className={styles.tabBtns}>
        {tabs.map((tab, tabIdx) => {
          const isActive = tabIdx === activeTabIdx;

          return (
            <button
              key={tabIdx}
              data-is-active={isActive}
              onClick={() => setActiveTabIdx(tabIdx)}
            >
              {tab.text}
            </button>
          );
        })}
      </div>

      <div>
        {tabs.map((tab, tabIdx) => (
          <>
            {activeTabIdx === tabIdx ? (
              <tab.component setActivePageIdx={setActivePageIdx} />
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};

export default HomeTabs;
