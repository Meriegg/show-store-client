import styles from "@styles/Components/Ui/ProductTypes.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setTypes } from "@rootDir/redux/storeTypes/storeTypesSlice";
import { RootState } from "@rootDir/types";
import { useLazyQuery } from "@apollo/client";
import { GET_TYPES } from "@rootDir/gql/query/products";
import { useEffect } from "react";

interface Props {
  typesId: string[];
}

const ProductTypes = ({ typesId }: Props) => {
  const [getTypes] = useLazyQuery(GET_TYPES);
  const dispatch = useDispatch();
  const types = useSelector((state: RootState) =>
    state.localValues.value.localTypes.length
      ? state.localValues.value.localTypes
      : state.storeTypes.value.types
  );

  useEffect(() => {
    (async () => {
      if (types.length) return;

      const { data } = await getTypes();

      dispatch(setTypes({ types: data?.getAllTypes }));
    })();
  }, []);

  if (!types.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.typesContainer}>
      <p>types: </p>
      {typesId.map((typeId, typeIdx) => {
        const currentTypeIdx = types.findIndex(
          (productType) => productType._id === typeId
        );

        return (
          <p className={styles.typesContainer_type} key={typeIdx}>
            @{types[currentTypeIdx]?.typeName || "ERROR"}
          </p>
        );
      })}
    </div>
  );
};

export default ProductTypes;
