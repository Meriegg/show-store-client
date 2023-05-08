"use client";

import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Alert from "@/components/Alert";
import Input from "@/components/Input";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { useState } from "react";
import { AdminAccountSchema } from "@/lib/zod/schemas";
import { api } from "@/utils/api";
import PasswordInput from "@/components/PasswordInput";
import Radio from "@/components/Radio";

const AddAccountModal = () => {
  const [isOpen, setOpen] = useState(false);
  const [error, setError] = useState<string | null>();
  const ctx = api.useContext();
  const createAccount = api.admin.accounts.createAccount.useMutation({
    onSuccess: () => {
      ctx.admin.accounts.invalidate();
      ctx.admin.data.invalidate();
      ctx.admin.auth.invalidate();
      setOpen(false);
    },
    onError: (error) => {
      setError(error.message);
    },
  });
  const validationSchema = AdminAccountSchema;

  const { handleSubmit, handleChange, errors, values } = useFormik<
    z.infer<typeof validationSchema>
  >({
    validationSchema: toFormikValidationSchema(validationSchema),
    initialValues: {
      name: "",
      password: "",
      passwordType: "hashed",
      role: "owner",
    },
    onSubmit: (data) => {
      setError(null);
      createAccount.mutate({ ...data });
    },
  });

  return (
    <>
      <Button onClick={() => setOpen(!isOpen)} size="small">
        Add account
      </Button>
      <Modal label="Add a new account!" isOpen={isOpen} setOpen={setOpen}>
        {error && <Alert label={error} color="danger" />}
        <form onSubmit={handleSubmit} className="font-semibold flex flex-col gap-4">
          <Input
            label="Account name"
            placeholder="Admin 1"
            value={values.name}
            onChange={handleChange("name")}
            error={errors.name}
            withAsterisk
          />
          <PasswordInput
            label="Account password"
            placeholder="adminPass123"
            value={values.password}
            onChange={handleChange("password")}
            error={errors.password}
            withAsterisk
          />
          <p className="text-sm text-neutral-600 font-semibold">Choose a type of password</p>
          <div className="flex flex-col gap-1">
            <Radio
              onChange={handleChange("passwordType")}
              value={"public" as typeof values.passwordType}
              label="Public password"
              checked={values.passwordType === "public"}
              checkedMessage="Use this only for local accounts!"
              checkedMessageImportant
            />
            <Radio
              onChange={handleChange("passwordType")}
              value={"hashed" as typeof values.passwordType}
              label="Private (hashed) password"
              checked={values.passwordType === "hashed"}
            />
          </div>
          <p className="text-sm text-neutral-600 font-semibold">Choose a type of account</p>
          <div className="flex flex-col gap-1">
            <Radio
              onChange={handleChange("role")}
              value={"local_admin" as typeof values.role}
              label="Local admin"
              checkedMessage="Use this only for demo accounts!"
              checkedMessageImportant
              checked={values.role === "local_admin"}
            />
            <Radio
              onChange={handleChange("role")}
              value={"owner" as typeof values.role}
              label="Owner account"
              checkedMessage="Use this only for authorized individuals!"
              checkedMessageImportant
              checked={values.role === "owner"}
            />
          </div>
          <Button loading={createAccount.isLoading} className="w-full mt-2" type="submit">
            Add!
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default AddAccountModal;
