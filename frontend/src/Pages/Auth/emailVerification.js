import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailVerificationAsync, selectIsVerified } from "./authSlice";
import { useEffect } from "react";

export default function UserVerification() {
  const emailVerified = useSelector(selectIsVerified);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(emailVerificationAsync({ email, token }));
  }, [dispatch]);

  return (
    <>
      <div className=" mt-3">
        {emailVerified ? (
          <h5 className=" text-center">
            Email : {email} ----
            <span className="text-warning"> Verified</span>
          </h5>
        ) : (
          <div className="text-center my-1">
            <h4>kindly check your inbox for verification</h4>
          </div>
        )}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p className="mt-10 text-center text-sm text-gray-500">
          Send me back to{" "}
          <Link to="/login" className=" text-danger">
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
