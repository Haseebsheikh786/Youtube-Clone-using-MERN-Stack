import { axiosInstance } from "../../Auth/authApi";

 

export const fetchAllPosts = async () => {
  const response = await axiosInstance.get("/post");
  return response.data;
};