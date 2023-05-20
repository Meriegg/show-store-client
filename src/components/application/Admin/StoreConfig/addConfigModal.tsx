"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import Alert from "@/components/Alert";
import { StoreConfigSchema } from "@/lib/zod/schemas";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { useState } from "react";
import { api } from "@/utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/components/use-toast";

const AddConfigModal = () => {
  const [isOpen, setOpen] = useState(false);
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [listItemVal, setListItemVal] = useState("");
  const [createError, setCreateError] = useState<string | null>(null);
  const { toast } = useToast();
  const ctx = api.useContext();
  const createConfig = api.admin.storeConfig.createStoreConfig.useMutation({
    onSuccess: () => {
      ctx.storeConfig.invalidate();
      ctx.admin.storeConfig.invalidate();
      setOpen(false);
    },
    onError: (error) => {
      setCreateError(error.message);
      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  const { handleSubmit, values, errors, handleChange, setFieldValue, setFieldError } = useFormik<
    z.infer<typeof StoreConfigSchema>
  >({
    validationSchema: toFormikValidationSchema(StoreConfigSchema),
    validateOnChange,
    initialValues: {
      shippingPrice: 0,
      homeHorizontalListItems: [],
      isActive: false,
      name: "",
    },
    onSubmit: (data) => {
      createConfig.mutate({ ...data });
    },
  });

  const addHomeLinkItem = (item: string) => {
    const { success } = z.string().min(1).safeParse(item);
    if (!success) {
      setFieldError("homeHorizontalListItems", "This is required!");
      return;
    }

    values.homeHorizontalListItems ||= [];

    setFieldValue("homeHorizontalListItems", [...values.homeHorizontalListItems, item]);
    setListItemVal("");
  };

  const removeHomeLinkItem = (idx: number) => {
    values.homeHorizontalListItems?.splice(idx, 1);

    setFieldValue("homeHorizontalListItems", values.homeHorizontalListItems);
  };

  return (
    <>
      <Modal isOpen={isOpen} setOpen={setOpen} label="Add a configuration!">
        {createError && (
          <Alert
            label={`Error: ${createError}`}
            color="danger"
            right={
              <button className="text-red-900" onClick={() => setCreateError(null)}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            }
          />
        )}
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setValidateOnChange(true);
            handleSubmit(e);
          }}
        >
          <Input
            label="Configuration Name"
            withAsterisk={false}
            placeholder="eg. holiday sale"
            value={values.name}
            onChange={handleChange("name")}
            error={errors.name}
          />
          <Input
            label="Shipping Price"
            placeholder="15.99"
            type="number"
            pattern="[0-9]"
            value={values.shippingPrice}
            onChange={handleChange("shippingPrice")}
            error={errors.shippingPrice}
            innerRight={<p className="font-semibold text-neutral-600 text-sm">$</p>}
            withAsterisk
          />
          <div className="flex flex-col gap-1 w-full">
            <p className="font-semibold text-neutral-600 text-sm">
              Home page explore section items
            </p>

            <div className="flex items-center gap-2 w-full mt-1">
              <Input
                placeholder="eg. Sneakers"
                onChange={(e) => {
                  setFieldError("homeHorizontalListItems", undefined);
                  setListItemVal(e.target.value);
                }}
                error={errors.homeHorizontalListItems}
                value={listItemVal}
                mainContainerClassName="w-full"
              />
              <Button type="button" onClick={() => addHomeLinkItem(listItemVal)} rounded="full">
                Add!
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {values.homeHorizontalListItems?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 justify-between px-2">
                <p className="font-semibold text-neutral-800 text-lg">{item}</p>
                <Button
                  onClick={() => removeHomeLinkItem(idx)}
                  type="button"
                  variant="danger"
                  size="small"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            ))}
          </div>
          <Checkbox
            checked={values.isActive || false}
            setChecked={(val) => setFieldValue("isActive", val)}
            label="Set as active"
          />
          <Button loading={createConfig.isLoading} className="w-full" type="submit">
            Add!
          </Button>
          {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}
        </form>
      </Modal>
      <Button onClick={() => setOpen(!isOpen)} right={<FontAwesomeIcon icon={faPlus} />}>
        Add a configuration!
      </Button>
    </>
  );
};
export default AddConfigModal;
