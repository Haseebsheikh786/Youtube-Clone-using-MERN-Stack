import { useState, useEffect } from "react";
import Styles from "./style.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { login } from "./authSlice";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const { user, isError } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user, isError, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <>
      <div className={Styles.wrapper}>
        <form onSubmit={onSubmit}>
          <h3 className="my-3 text-center">Login to your account</h3>
          <div class="input-group ">
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
              class="form-control mb-3 mx-2"
            />
          </div>
          <div class="input-group ">
            <input
              class="form-control mb-3 mx-2"
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="mb-2 mx-2">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
          <div className={Styles.btn}>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center my-2">
            Don't have an account
            <NavLink
              to="/signup"
              className="text-danger p-1 text-decoration-none"
            >
              signup
            </NavLink>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
