import axios from "axios";

export const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const apiInstance = axios.create({
  baseURL: `${BASE_URL}/${process.env.NEXT_PUBLIC_API_URL}`,
  headers: defaultHeaders,
});

export const apiAuthInstance = axios.create({
  baseURL: `${BASE_URL}/${process.env.NEXT_PUBLIC_AUTH_API}`,
  headers: defaultHeaders,
});

