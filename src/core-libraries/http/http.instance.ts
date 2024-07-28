import axios from "axios";

export const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: defaultHeaders,
});

export const apiS3Instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FILES_API,
  headers: defaultHeaders,
});

export const apiAuthInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API,
  headers: defaultHeaders,
});

export const apiRegisterInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REGISTER_API,
  headers: defaultHeaders,
});
