import Input from "@components/Ui/Input";
import { useDispatch } from "react-redux";
import { closeModal } from "@components/Ui/Modal";
import { LocalStorageChangesTypes } from "@rootDir/types";
import { ButtonFill } from "@components/Ui/Button";
import { refetch } from "@rootDir/redux/localChanges/localValues";
import { useState } from "react";

interface Props {
  showHandler: Function;
}

const CreateType = ({ showHandler }: Props) => {
  const [inputVal, setInputVal] = useState("");
  const dispatch = useDispatch();

  const addType = () => {
    if (!inputVal) return;

    const currentTypes = localStorage.getItem(
      LocalStorageChangesTypes.localTypes
    );
    const parsedTypes = currentTypes ? JSON.parse(currentTypes) : null;
    const currentTypeID = parsedTypes ? parsedTypes.length + 1 : 0;

    if (parsedTypes) {
      parsedTypes.push({
        _id: currentTypeID,
        typeName: inputVal,
      });

      localStorage.setItem(
        LocalStorageChangesTypes.localTypes,
        JSON.stringify(parsedTypes)
      );
      return;
    }

    localStorage.setItem(
      LocalStorageChangesTypes.localTypes,
      JSON.stringify([
        {
          _id: currentTypeID,
          typeName: inputVal,
        },
      ])
    );
  };

  return (
    <div>
      <Input
        placeholder="Add a name"
        error={!inputVal ? "This must not be empty" : ""}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <ButtonFill
        style={{ marginTop: "10px" }}
        onClick={() => {
          addType();
          dispatch(refetch());
          closeModal(showHandler, dispatch);
        }}
      >
        Add Type
      </ButtonFill>
    </div>
  );
};

export default CreateType;
