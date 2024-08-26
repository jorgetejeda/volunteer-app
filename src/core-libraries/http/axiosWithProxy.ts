import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Create a proxy agent using the HTTP_PROXY environment variable or your proxy configuration
const proxy = process.env.HTTP_PROXY || ''; // Adjust this if you have a different variable or default
const agent = proxy ? new HttpsProxyAgent(proxy) : undefined;

// Create an Axios instance with the proxy agent
const axiosInstance = axios.create({
  timeout: 10000,
  httpAgent: agent,
  httpsAgent: agent,
});

export default axiosInstance;
