import Link from "./Link";
import styles from "@styles/Components/Ui/BreadCrumbs.module.scss";

interface Props {
  elements: {
    text: string;
    link: string;
  }[];
}

const BreadCrumbs = ({ elements }: Props) => {
  return (
    <div className={styles.mainContainer}>
      {elements.map(({ link, text }, elementIdx) => (
        <div key={elementIdx} className={styles.item}>
          <Link href={link} className={styles.item_link}>
            {text}
          </Link>
          {elementIdx !== elements.length - 1 ? (
            <p className={styles.item_separator}>/</p>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
