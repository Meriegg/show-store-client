"use client";

import PasswordInput from "@/components/PasswordInput";
import Input from "@/components/Input";
import Link from "next/link";
import Button from "@/components/Button";
import { api } from "@/utils/api";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const AdminLogin = () => {
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ctx = api.useContext();
  const login = api.admin.auth.login.useMutation({
    onSuccess: () => {
      ctx.admin.data.me.invalidate();
    },
    onError: (error) => {
      setError(error?.message);
    },
  });

  const previewData = {
    name: "Admin Preview",
    password: "adminPreviewPass123",
  };

  const validationSchema = z.object({
    name: z.string(),
    password: z.string(),
  });

  const { handleSubmit, handleChange, errors, values, setFieldValue } = useFormik<
    z.infer<typeof validationSchema>
  >({
    onSubmit: (data) => {
      login.mutate({ ...data });
    },
    validationSchema: toFormikValidationSchema(validationSchema),
    validateOnChange: didSubmit,
    initialValues: {
      name: "",
      password: "",
    },
  });

  const usePreviewAccount = () => {
    setFieldValue("name", previewData.name);
    setFieldValue("password", previewData.password);
  };

  return (
    <div
      style={{
        width: "min(450px, 100%)",
      }}
      className="m-auto mt-12 text-center"
    >
      {error && (
        <div className="bg-red-100 text-red-900 font-semibold text-base px-4 py-3 rounded-md flex items-center justify-between my-3">
          <p>{error}</p>
          <button onClick={() => setError(null)} className="px-2 py-1 rounded-md hover:bg-red-200">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      )}

      <h1 className="text-3xl font-semibold">Admin authentication</h1>
      <p className="mt-2 font-semibold text-neutral-600">
        Not an admin?{" "}
        <Link href="/" className="text-red-600 text-sm underline">
          Click here!
        </Link>
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDidSubmit(true);
          handleSubmit(e);
        }}
        className="mt-6 flex flex-col gap-3"
      >
        <Input
          placeholder="John Doe"
          value={values.name}
          onChange={handleChange("name")}
          error={errors.name}
          label="Admin User"
          withAsterisk={true}
        />
        <PasswordInput
          placeholder="johndoeadmin123"
          value={values.password}
          onChange={handleChange("password")}
          error={errors.password}
          label="Admin password"
          withAsterisk={true}
        />
        <Button loading={login.isLoading} type="submit">
          Continue!
        </Button>
        <Button type="button" onClick={() => usePreviewAccount()} variant="ghost">
          Use Preview Account!
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
