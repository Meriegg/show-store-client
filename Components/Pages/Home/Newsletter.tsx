import styles from "@styles/Pages/Home.module.scss";
import { ButtonFill } from "@components/Ui/Button";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

const Newsletter = () => {
  const [hasSubmitted, setSubmitted] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("You must provide a valid email!")
      .required("Your must provide an email!"),
  });

  const { handleChange, errors, values, handleSubmit, resetForm } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: hasSubmitted,
    onSubmit: () => {
      toast.success("Subscribed successfully!");
      resetForm();
    },
  });

  return (
    <div className={styles.newsLetter}>
      <div className={styles.newsLetter_content}>
        <h1>Subscribe to our newsletter</h1>
        <p>we will email you after every new product or every sale we have!</p>

        <form className={styles.newsLetter_form}>
          <div className={styles.newsLetter_form_inputContainer}>
            <input
              type="text"
              placeholder={"your email"}
              value={values.email}
              onChange={handleChange("email")}
            />
            {errors.email ? (
              <p className={styles.newsLetter_form_error}>{errors.email}</p>
            ) : null}
          </div>

          <ButtonFill
            type={"submit"}
            style={{ borderRadius: "999px", padding: "20px 35px" }}
            disabled={!!errors.email}
            onClick={(e) => {
              e.preventDefault();
              setSubmitted(true);

              // @ts-ignore
              handleSubmit(e);
            }}
          >
            subscribe
          </ButtonFill>
        </form>
      </div>

      <div className={styles.newsLetter_verticalLine}></div>
    </div>
  );
};

export default Newsletter;
