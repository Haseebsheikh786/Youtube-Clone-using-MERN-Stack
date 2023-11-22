import axios from "axios";
import { axiosInstance } from "../../Auth/authApi";

export async function getVideoByID(id) {
  const response = await axiosInstance.get(`/video/${id}`);
  return response.data;
}
export async function getVideosByUserId(id) {
  const response = await axiosInstance.get(`/video/user/${id}`);
  return response.data;
}

export async function getAllVideos() {
  const response = await axiosInstance.get(`/video/`);
  return response.data;
}
export async function getUserLikeVideos(id) {
  const response = await axiosInstance.get(`/video/${id}/likes`);
  return response.data;
}
