import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const Login = async (data) => {
  const response = await axiosInstance.post("/login", data);
  return response.data;
};
export const GetLoginUser = async () => {
  const response = await axiosInstance.get("/own");
  return response.data;
};

export const getUserByID = async (id) => {
  const response = await axiosInstance.post(`/user/`, id);
  return response.data;
};
export const getUserSubscribers = async (id) => {
  const response = await axiosInstance.post(`/getUserSubscibers/`, id);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.get("/logout");
  return response.data;
};

axiosInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;

    if (
      (error.response.status === 401 || error.response.status === 500) &&
      originalReq &&
      !originalReq._isRetry
    ) {
      originalReq.isRetry = true;

      try {
        await axiosInstance.get(`/refresh`, {
          withCredentials: true,
        });

        return axiosInstance.request(originalReq);
      } catch (error) {
        return error;
      }
    }
  }
);
export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8000/reset-password-request",
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function emailVerification(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/email-verification", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        console.log(error);
        reject(error);
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
export function resetPassword(data) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
