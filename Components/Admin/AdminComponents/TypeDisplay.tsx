import {
  LocalStateType,
  ProductType,
  LocalStorageChangesTypes,
} from "@rootDir/types";
import { refetch } from "@rootDir/redux/localChanges/localValues";
import { useDispatch } from "react-redux";

interface Styles {
  readonly [key: string]: string;
}

interface Props {
  localState: LocalStateType;
  styles: Styles;
}

const TypeDisplay = ({ localState, styles }: Props) => {
  const dispatch = useDispatch();

  const deleteType = (delType: ProductType) => {
    if (!localState.localTypes) return;
    if (
      !confirm(
        "Are you sure you want do delete this type? All products which have this type will be deleted!"
      )
    )
      return;

    const newTypes = localState.localTypes.filter(
      (type) => type._id !== delType._id
    );

    const newProducts = localState.localProducts.filter(
      (product) =>
        product.typesID.findIndex(
          (existingType: string) => existingType === delType._id
        ) === -1
    );

    localStorage.setItem(
      LocalStorageChangesTypes.localTypes,
      JSON.stringify(newTypes)
    );

    localStorage.setItem(
      LocalStorageChangesTypes.localProducts,
      JSON.stringify(newProducts)
    );

    dispatch(refetch());
  };

  return (
    <div>
      {!localState.localTypes.length ? (
        <p>You have no local types added yet!</p>
      ) : (
        <div className={styles.typesContainer}>
          {localState.localTypes.map((type) => (
            <div className={styles.type} key={type._id}>
              <p>{type.typeName}</p>
              <button onClick={() => deleteType(type)}>delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeDisplay;
