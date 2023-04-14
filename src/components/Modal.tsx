import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createPortal } from "react-dom";

interface Props {
  children: React.ReactNode;
  label?: string;
  labelComponent?: React.ReactNode;
  isOpen: boolean;
  setOpen: (val: boolean) => void;
}

const Modal = ({ children, isOpen, label, labelComponent, setOpen }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {createPortal(
        <div className="fixed bg-modal-transparent-black z-30 top-0 left-0 h-full w-full flex items-center justify-center">
          <div
            className="px-3 py-1 pb-3 bg-white rounded-md flex flex-col gap-2"
            style={{
              width: "min(500px, 100%)",
            }}
          >
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center flex-wrap gap-2 font-semibold">
                {!label && !labelComponent && <p className="text-sm">Modal</p>}
                {label && <p className="text-sm">{label}</p>}
                {labelComponent}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="py-2 px-4 hover:bg-neutral-100 rounded-md"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            {children}
          </div>
        </div>,
        document.getElementById("MODAL_CONTAINER") as HTMLElement
      )}
    </>
  );
};

export default Modal;
