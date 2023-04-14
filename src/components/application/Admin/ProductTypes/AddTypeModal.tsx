"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import { api } from "@/utils/api";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const AddTypeModal = () => {
  const [isOpen, setOpen] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = api.useContext();
  const addType = api.types.createType.useMutation({
    onSuccess: () => {
      ctx.types.getTypes.invalidate();
      setOpen(false);
    },
  });

  const { handleChange, errors, handleSubmit, values } = useFormik({
    validationSchema: toFormikValidationSchema(
      z.object({
        name: z.string(),
      })
    ),
    validateOnChange: didSubmit,
    onSubmit: (data, { resetForm }) => {
      addType.mutate(
        { ...data },
        {
          onSuccess: () => {
            resetForm();
          },
        }
      );
    },
    initialValues: {
      name: "",
    },
  });

  return (
    <>
      <Button onClick={() => setOpen(!isOpen)} right={<FontAwesomeIcon icon={faPlus} />}>
        Add type
      </Button>
      <Modal label="Add a type!" isOpen={isOpen} setOpen={setOpen}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDidSubmit(true);
            handleSubmit();
          }}
        >
          <Input
            value={values.name}
            onChange={handleChange("name")}
            error={errors.name}
            placeholder="Eg. Sneakers"
            label="Type Name"
            withAsterisk
          />
          <Button type="submit" className="mt-2 w-full">
            Add!
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddTypeModal;
