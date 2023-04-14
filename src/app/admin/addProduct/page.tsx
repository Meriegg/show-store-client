"use client";

import Link from "next/link";
import Chip from "@/components/Chip";
import Button from "@/components/Button";
import Product from "@/components/application/Store/Product";
import { useFormik } from "formik";
import { faChevronLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useState } from "react";
import Input from "@/components/Input";
import { api } from "@/utils/api";
import LoadingText from "@/components/LoadingText";
import clsx from "clsx";

const AddProduct = () => {
  const router = useRouter();
  const {
    isLoading: typesLoading,
    error: typesError,
    data: typesData,
  } = api.types.getTypes.useQuery();
  const [didSubmit, setDidSubmit] = useState(false);

  const validationSchema = z.object({
    name: z.string(),
    price: z.number(),
    images: z.string().array().min(1),
    types: z.string().array(),
  });

  const { values, handleChange, handleSubmit, errors, setFieldValue } = useFormik<
    z.infer<typeof validationSchema>
  >({
    validateOnChange: didSubmit,
    validationSchema: toFormikValidationSchema(validationSchema),
    onSubmit: (data) => {
      console.log(data);
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

            <div className="w-full flex justify-end">
              <Button rounded="full" size="small">
                Add a photo
              </Button>
            </div>
          </div>

          <Button type="submit">Add Product!</Button>
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
