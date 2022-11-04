import Input from "@components/Ui/Input";
import styles from "@styles/Admin/CreateProduct.module.scss";
import Modal, { closeModal } from "@components/Ui/Modal";
import Product from "@components/Pages/Store/Product";
import AlignBottom from "@rootDir/public/AlignBottom.svg";
import AlignTop from "@rootDir/public/AlignTop.svg";
import AlignCenter from "@rootDir/public/AlignCenter.svg";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { ButtonFill } from "@components/Ui/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  LocalStorageChangesTypes,
  ProductType,
  RootState,
  StoreProduct,
  StoreProductImageAlignment,
} from "@rootDir/types";
import { refetch } from "@rootDir/redux/localChanges/localValues";
import * as yup from "yup";

interface Props {
  setActivePageIdx: Function;
}

const CreateProduct = ({ setActivePageIdx }: Props) => {
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [displayState, setDisplayState] = useState<StoreProduct>({
    _id: "NULL",
    images: [""],
    price: 0,
    productName: "",
    typesID: [],
    imageAlignment: StoreProductImageAlignment.center,
  });
  const imageAlignments = [
    { text: "Top", val: StoreProductImageAlignment.top, icon: AlignTop },
    {
      text: "center",
      val: StoreProductImageAlignment.center,
      icon: AlignCenter,
    },
    {
      text: "bottom",
      val: StoreProductImageAlignment.bottom,
      icon: AlignBottom,
    },
  ];
  const localState = useSelector((root: RootState) => root.localValues.value);
  const dispatch = useDispatch();

  const initialValues = {
    productName: "",
    price: 0,
    types: [],
    imageLinks: [],
    displayImageAlignment: StoreProductImageAlignment.center,
  };

  const validationSchema = yup.object().shape({
    productName: yup.string().required(),
    price: yup.number().required().min(1),
    types: yup.array().required().min(1),
    imageLinks: yup.array().required().min(1).max(5),
    displayImageAlignment: yup.string().required(),
  });

  const {
    handleChange,
    handleSubmit,
    errors,
    values,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (submitValues) => {
      const localProductsLength = localState.localProducts.length;
      const productId = localProductsLength ? localProductsLength + 1 : 0;
      let finalTypesID = [];

      for (const type of values.types as ProductType[]) {
        finalTypesID.push(type._id);
      }

      const finalProduct: StoreProduct = {
        _id: productId.toString(),
        typesID: finalTypesID,
        imageAlignment: submitValues.displayImageAlignment,
        images: submitValues.imageLinks,
        price: submitValues.price,
        productName: submitValues.productName,
      };

      localStorage.setItem(
        LocalStorageChangesTypes.localProducts,
        JSON.stringify([...localState.localProducts, finalProduct])
      );

      dispatch(refetch());
      resetForm();
    },
  });

  const addTypeToForm = (type: ProductType) => {
    const doesTypeExist =
      values.types.findIndex(
        (existingType: ProductType) => existingType._id === type._id
      ) !== -1;
    if (doesTypeExist) return;

    setFieldValue("types", [...values.types, type]);
  };

  const removeTypeFromForm = (type: ProductType) => {
    setFieldValue(
      "types",
      values.types.filter(
        (existingType: ProductType) => existingType._id !== type._id
      )
    );
  };

  const addImageToForm = (imageLink: string) => {
    if (values.imageLinks.length + 1 > 5 || !imageLink) return;

    setFieldValue("imageLinks", [...values.imageLinks, imageLink]);
  };

  const removeImageFromForm = (imageIdx: number) => {
    setFieldValue(
      "imageLinks",
      values.imageLinks.filter((_, linkIdx) => linkIdx !== imageIdx)
    );
  };

  useEffect(() => {
    let finalTypesID = [];

    for (const type of values.types as ProductType[]) {
      finalTypesID.push(type._id);
    }

    setDisplayState({
      typesID: finalTypesID,
      images: values.imageLinks,
      _id: "NULL",
      price: values.price,
      productName: values.productName,
      imageAlignment: values.displayImageAlignment,
    });
  }, [values]);

  if (!localState.localTypes.length) {
    return (
      <div>
        <ButtonFill
          style={{ marginTop: "15px" }}
          onClick={() => setActivePageIdx(0)}
        >
          Go back
        </ButtonFill>
        <p>
          You have no local product types. Please add at least 1 product type in
          order to create a product.
        </p>
      </div>
    );
  }

  return (
    <div>
      <ButtonFill
        style={{ marginTop: "15px" }}
        onClick={() => setActivePageIdx(0)}
      >
        Go back
      </ButtonFill>
      <h1>Create Product</h1>

      <div className={styles.mainFormContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            placeholder="Product Name"
            onChange={handleChange("productName")}
            value={values.productName}
            error={errors.productName}
          />
          <Input
            placeholder="Price in $$"
            onChange={handleChange("price")}
            error={errors.price}
            value={values.price}
            type={"number"}
          />
          <div className={styles.typeSelector}>
            <p>Select some types (required at least 1)</p>

            <div className={styles.availableTypes}>
              {localState.localTypes.map((type) => {
                const doesTypeExist =
                  values.types.findIndex(
                    (existingType: ProductType) => existingType._id === type._id
                  ) !== -1;

                return (
                  <button
                    className={
                      doesTypeExist
                        ? styles.availableTypes_remove
                        : styles.availableTypes_add
                    }
                    key={type._id}
                    type="button"
                    onClick={() =>
                      doesTypeExist
                        ? removeTypeFromForm(type)
                        : addTypeToForm(type)
                    }
                  >
                    {type.typeName}
                  </button>
                );
              })}
            </div>
          </div>
          <div className={styles.imageSelector}>
            <Modal
              isShowing={isImageModalOpen}
              isShowingHandler={setImageModalOpen}
              title="Paste an image link"
            >
              <Input
                placeholder={"Paste your link here"}
                onChange={(e) => setImageLink(e.target.value)}
                value={imageLink}
                error={!imageLink ? "This is required" : ""}
              />
              <ButtonFill
                style={{ marginTop: "10px" }}
                type="button"
                onClick={() => {
                  addImageToForm(imageLink);
                  setImageLink("");
                  closeModal(setImageModalOpen, dispatch);
                }}
                disabled={!imageLink}
              >
                Add Image
              </ButtonFill>
            </Modal>
            <p>Add images (maximum 5 - minimum 1)</p>

            <div className={styles.imageSelector_images}>
              {values.imageLinks.map((imageLink, imgIdx) => (
                <div
                  key={imgIdx}
                  className={styles.imageSelector_imageContainer}
                >
                  <div className={styles.imageSelector_imageContainer_options}>
                    {imgIdx === 0 ? <p>(This is the display Image)</p> : null}
                    <ButtonFill onClick={() => removeImageFromForm(imgIdx)}>
                      Remove
                    </ButtonFill>
                  </div>
                  <img
                    className={styles.imageSelector_image}
                    src={imageLink}
                    alt="Image link not valid, hover or tap to remove"
                  />
                </div>
              ))}
            </div>
            <ButtonFill
              style={{ marginTop: "10px" }}
              type="button"
              onClick={() => setImageModalOpen(true)}
            >
              Add Image
            </ButtonFill>
          </div>
          <div>
            <p>Choose an alignment for the display image (center is default)</p>
            <div className={styles.imageAlignmentBtns}>
              {imageAlignments.map((alignment, alignmentIdx) => {
                const isSelected =
                  alignment.val === values.displayImageAlignment;

                return (
                  <button
                    key={alignmentIdx}
                    onClick={() =>
                      setFieldValue("displayImageAlignment", alignment.val)
                    }
                    type="button"
                    data-alignment-selected={isSelected}
                  >
                    <img
                      src={alignment.icon.src}
                      alt=""
                      style={{ width: "20px", height: "auto" }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <ButtonFill data-type-submit type="submit">
            Create!
          </ButtonFill>
        </form>
        <div>
          <Product isCartBtnDisabled={true} product={{ ...displayState }} />
        </div>
      </div>

      {/* {JSON.stringify(values, null, 2)}
      <br />
      {JSON.stringify(errors, null, 2)} */}
    </div>
  );
};

export default CreateProduct;
