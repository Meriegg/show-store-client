"use client";

import Link from "next/link";
import Modal from "@/components/Modal";
import Chip from "@/components/Chip";
import Button from "@/components/Button";
import Product from "@/components/application/Store/Product";
import Input from "@/components/Input";
import LoadingText from "@/components/LoadingText";
import clsx from "clsx";
import { useFormik } from "formik";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";
import { useToast } from "@/components/use-toast";
import { api } from "@/utils/api";

const AddProduct = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    isLoading: typesLoading,
    error: typesError,
    data: typesData,
  } = api.types.getTypes.useQuery();
  const ctx = api.useContext();
  const createProduct = api.products.createProduct.useMutation({
    onSuccess: () => {
      router.push("/admin/dashboard/products");
      ctx.products.getProducts.invalidate();
      ctx.types.getTypes.invalidate();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "An error happened!",
      });
    },
  });
  const [didSubmit, setDidSubmit] = useState(false);
  const [isAddImageModalOpen, setAddImageModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageError, setImageError] = useState<string | null>(null);
  const maxNumOfImages = 3;

  const validationSchema = z.object({
    name: z.string(),
    price: z.number(),
    images: z.string().array().min(1),
    types: z.string().array(),
  });

  const removeImage = (idx: number) => {
    values.images.splice(idx, 1);

    setFieldValue("images", values.images);
  };

  const { values, handleChange, handleSubmit, errors, setFieldValue } = useFormik<
    z.infer<typeof validationSchema>
  >({
    validateOnChange: didSubmit,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (data, { resetForm }) => {
      createProduct.mutate(
        { ...data },
        {
          onSuccess: () => {
            resetForm();
          },
        }
      );
    },
    initialValues: {
      images: [],
      name: "",
      price: 0,
      types: [],
    },
  });

  return (
    <div className="sectionPadding flex items-start justify-start gap-12 flex-wrap">
      <Modal isOpen={isAddImageModalOpen} setOpen={setAddImageModalOpen} label="Add an image!">
        <form
          className="flex flex-col w-full gap-3"
          onSubmit={(e) => {
            e.preventDefault();

            const { success } = z.string().url().safeParse(imageUrl);
            if (!success) {
              setImageError("Image must be a valid url!");
              return;
            }

            setFieldValue("images", [...values.images, imageUrl]);
            setImageUrl("");
            setImageError(null);
          }}
        >
          <Input
            value={imageUrl}
            onChange={(e) => {
              setImageError(null);
              setImageUrl(e.target.value);
            }}
            error={imageError || undefined}
            label="Image URL."
            placeholder="A link to your image cdn"
          />
          <Button type="submit">Add</Button>
        </form>
      </Modal>

      <div
        className="flex flex-col gap-4 items-start"
        style={{
          flexGrow: "2",
        }}
      >
        <Button
          left={<FontAwesomeIcon icon={faChevronLeft} />}
          size="small"
          variant="ghost"
          onClick={() => router.back()}
          className="w-fit"
        >
          Go back
        </Button>
        <p className="text-4xl font-semibold">Add a product</p>

        <form
          className="mt-6 flex flex-col gap-4"
          style={{
            width: "min(450px, 100%)",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            setDidSubmit(true);
            handleSubmit(e);
          }}
        >
          <Input
            label="Product Name"
            placeholder="Eg. Hike Oxygen Power 1"
            withAsterisk
            value={values.name}
            onChange={handleChange("name")}
            error={errors.name}
          />
          <Input
            label="Product Price"
            placeholder="42.000.000.000$"
            type="number"
            pattern="[0-9]"
            withAsterisk
            value={values.price}
            onChange={handleChange("price")}
            error={errors.price}
          />

          {typesLoading && <LoadingText customLabel="Loading types" />}
          {!typesLoading && !typesError && (
            <div className="flex flex-col gap-0">
              <p className="font-semibold text-sm">Select some types</p>
              <div className="w-full flex justify-start items-start gap-4 my-4 font-semibold">
                {typesData.map((type, idx) => {
                  const isSelected =
                    values.types.findIndex((prevType) => prevType === type.name) !== -1;

                  return (
                    <Chip
                      as="button"
                      // @ts-expect-error
                      type="button"
                      variant={isSelected ? "filled" : "outline"}
                      onClick={() => {
                        if (isSelected) {
                          setFieldValue(
                            "types",
                            values.types.filter((prevType) => prevType !== type.name)
                          );
                        } else {
                          setFieldValue("types", [...values.types, type.name]);
                        }
                      }}
                      containerStyles="text-xs"
                    >
                      <p>{type.name}</p>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className={clsx(
                          "transform transition-all duration-300",
                          isSelected ? "rotate-45" : "rotate-0"
                        )}
                      />
                    </Chip>
                  );
                })}
              </div>
            </div>
          )}

          <div className="w-full flex flex-col items-center">
            <p className="font-semibold text-sm w-full text-left">Product images</p>

            {!values.images.length && (
              <p className="font-semibold w-full text-center text-sm text-neutral-600">
                Please add at least 1 photo
              </p>
            )}

            <div className="w-full flex flex-col mt-4 gap-2">
              {!!values.images.length && (
                <>
                  {values.images.map((image, idx) => (
                    <div
                      className="w-full flex flex-col gap-2 overflow-hidden rounded-lg p-4 bg-neutral-100"
                      key={idx}
                    >
                      <img src={image} className="w-full h-full" />
                      <div>
                        {idx === 0 && (
                          <p className="font-semibold text-sm my-3 text-neutral-700">
                            This is the display image!
                          </p>
                        )}
                        <div className="w-full flex items-center gap-2 flex-wrap">
                          <Button
                            type="button"
                            onClick={() => removeImage(idx)}
                            variant="danger"
                            size="small"
                            rounded="full"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div className="w-full flex items-center justify-between mt-4">
              <p className="font-semibold italic text-neutral-600 text-sm">
                {maxNumOfImages - values.images.length} image(s) left
              </p>
              <Button
                type="button"
                onClick={() => setAddImageModalOpen(true)}
                rounded="full"
                size="small"
                disabled={values.images.length == maxNumOfImages}
              >
                Add a photo
              </Button>
            </div>
          </div>

          <Button type="submit" loading={createProduct.isLoading}>
            Add Product!
          </Button>
        </form>
      </div>
      <div
        style={{
          flexGrow: "1",
        }}
      >
        <Product adminProduct={{ ...values }} adminDisplay={true} />
      </div>
    </div>
  );
};

export default AddProduct;
