import Product from "@components/Pages/Store/Product";
import Link from "next/link";
import { setAdminMenuState } from "@rootDir/redux/admin/adminSlice";
import { refetch } from "@rootDir/redux/localChanges/localValues";
import { useDispatch } from "react-redux";
import { ButtonFill } from "@components/Ui/Button";
import {
  LocalStateType,
  LocalStorageChangesTypes,
  StoreProduct,
} from "@rootDir/types";

interface Styles {
  readonly [key: string]: string;
}

interface Props {
  localState: LocalStateType;
  styles: Styles;
}

const LocalProductsDisplay = ({ localState, styles }: Props) => {
  const dispatch = useDispatch();
  const localProducts = localState.localProducts;

  const removeProduct = (product: StoreProduct) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const newProducts = localProducts.filter(
      (existingProduct) => existingProduct._id !== product._id
    );

    localStorage.setItem(
      LocalStorageChangesTypes.localProducts,
      JSON.stringify(newProducts)
    );

    dispatch(refetch());
  };

  return (
    <div>
      {!localProducts.length ? (
        <p>You have no local products!</p>
      ) : (
        <div className={styles.productsDisplay}>
          {localProducts.map((product, _idx) => (
            <div key={_idx} className={styles.product}>
              <div className={styles.product_options}>
                <ButtonFill
                  onClick={() => removeProduct(product)}
                  data-options-btn
                >
                  Remove Product
                </ButtonFill>
                <Link href={`/product/${product._id}`}>
                  <ButtonFill
                    onClick={() => dispatch(setAdminMenuState({ val: false }))}
                    data-options-btn
                  >
                    View Product Page
                  </ButtonFill>
                </Link>
              </div>
              <Product isCartBtnDisabled={true} product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocalProductsDisplay;
