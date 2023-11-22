import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAsync, selectPasswordReset } from "./authSlice";
import Style from "./style.module.css";
import { useAlert } from "react-alert";

export default function ResetPassword() {
  const passwordReset = useSelector(selectPasswordReset);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  const alert = useAlert();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {email && token ? (
        <div className={Style.wrapper}>
          <h2 className="my-2 text-center ">Enter New Password</h2>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noV
              alidate
              onSubmit={handleSubmit((data) => {
                dispatch(
                  resetPasswordAsync({
                    email,
                    token,
                    password: data.password,
                    alert,
                  })
                );
              })}
              className="space-y-6"
            >
              <div>
                <div class="input-group">
                  <input
                    placeholder="New Password"
                    id="password"
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                      },
                    })}
                    type="password"
                    class="form-control mb-2 mx-2"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div class="input-group">
                  <input
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    {...register("confirmPassword", {
                      required: "confirm password is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "password not matching",
                    })}
                    type="password"
                    class="form-control mb-3 mx-2"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  {passwordReset && (
                    <p className="text-warning text-center">Password Reset successfully</p>
                  )}
                </div>
              </div>
              <div className={Style.btn}>
                <button type="submit" className="btn btn-primary">
                  Reset Password
                </button>
              </div>
            </form>

            <p className="mt-2 text-center">
              Send me back to{" "}
              <Link to="/login" className="text-danger">
                Login
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <p>Incorrect Link</p>
      )}
    </>
  );
}
