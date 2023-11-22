import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequestAsync, selectMailSent } from "./authSlice";
import Style from "./style.module.css";
import { useAlert } from "react-alert";
export default function ForgotPassword() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mailSent = useSelector(selectMailSent);
  return (
    <>
      <div className={Style.wrapper}>
        <form
          noValidate
          onSubmit={handleSubmit((data) => {
            dispatch(resetPasswordRequestAsync({ email: data.email, alert }));
            document.getElementById("email").value = "";
          })}
          className="space-y-6"
        >
          <div class="input-group">
            <input
              id="email"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "email not valid",
                },
              })}
              type="email"
              placeholder="Enter your email"
              class="form-control mb-3 mx-2"
            />
          </div>
          <div>
            {errors.email && (
              <p className="text-danger text-center">{errors.email.message}</p>
            )}
            {mailSent && <p className="text-warning text-center">Mail Sent</p>}
          </div>

          <div className={Style.btn}>
            <button type="submit" className="btn btn-primary">
              Send Email
            </button>
          </div>
        </form>

        <p className="my-2">
          Send me back to{" "}
          <Link to="/login" className="text-danger">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
