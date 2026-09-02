const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const {
    method = "GET",
    body,
    token,
    headers = {},
  } = options;

  const requestHeaders = {
    Accept: "application/json",
    ...headers,
  };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  const isFormData =
    typeof FormData !== "undefined" && body instanceof FormData;

  if (body !== undefined && !isFormData) {
    requestHeaders["Content-Type"] = "application/json";
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const config = {
    method,
    headers: requestHeaders,
  };

  if (body !== undefined) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${cleanPath}`, config);
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data?.message
        ? data.message
        : "Request failed. Please try again.";
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function apiRequest(path, options = {}) {
  return request(path, options);
}

export function getStoredToken() {
  return localStorage.getItem("anvaya_token");
}

export function getStoredUser() {
  const raw = localStorage.getItem("anvaya_user");

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem("anvaya_user");
    return null;
  }
}

export function saveAuth(data) {
  if (!data?.token) {
    throw new Error("Authentication response did not include a token.");
  }

  const user = {
    _id: data._id,
    name: data.name,
    email: data.email,
    role: data.role,
  };

  localStorage.setItem("anvaya_token", data.token);
  localStorage.setItem("anvaya_user", JSON.stringify(user));

  return user;
}

export function clearAuth() {
  localStorage.removeItem("anvaya_token");
  localStorage.removeItem("anvaya_user");
}

export { API_BASE_URL };