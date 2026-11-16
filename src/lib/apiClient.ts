import { ofetch } from "ofetch";

const rawBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1"
).trim();

// Ensure baseURL ends with /api/v1 if not already provided
const cleanBaseUrl = rawBaseUrl.replace(/\/+$/, "");
const BASE_URL = cleanBaseUrl.endsWith("/api/v1")
  ? cleanBaseUrl
  : `${cleanBaseUrl}/api/v1`;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
});

export default apiClient;
