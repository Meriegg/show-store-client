import Input from "@components/Ui/Input";
import { useFormik } from "formik";
import { useState } from "react";
import { ButtonFill } from "@components/Ui/Button";
import type { NextPage } from "next";
import * as yup from "yup";

const Admin: NextPage = () => {
  const [didSubmit, setDidSubmit] = useState(false);

  const initialValues = {
    adminName: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    adminName: yup.string().required(),
    password: yup.string().required(),
  });

  const { handleChange, handleSubmit, errors, values } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: didSubmit,
    onSubmit: (submitValues) => {
      console.log(submitValues);
    },
  });

  return (
    <div>
      <h1>Admin Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setDidSubmit(true);
          handleSubmit(e);
        }}
      >
        <Input
          value={values.adminName}
          placeholder={"Admin Name"}
          onChange={handleChange("adminName")}
          error={errors.adminName}
        />
        <Input
          value={values.password}
          placeholder={"Password"}
          onChange={handleChange("password")}
          error={errors.password}
        />
        <ButtonFill>Login</ButtonFill>
      </form>
    </div>
  );
};

export default Admin;
