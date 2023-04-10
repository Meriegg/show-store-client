import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  isMenuOpen: boolean;
  setMenuOpen: (input: boolean) => void;
}

const OpenMenuBtn = ({ isMenuOpen, setMenuOpen }: Props) => {
  return (
    <button
      className="hidden w-[25px] h-[40px] md:flex md:flex-col justify-center items-center"
      onClick={() => setMenuOpen(!isMenuOpen)}
    >
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};

export default OpenMenuBtn;
