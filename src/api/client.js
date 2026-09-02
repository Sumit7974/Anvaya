const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const ROLE_KEY = "anvaya_active_role";
const ROLES = ["customer", "worker", "contractor", "admin"];
const key = role => `anvaya_auth_${role}`;
const activeRole = () => {
  const role = localStorage.getItem(ROLE_KEY);
  return ROLES.includes(role) ? role : null;
};

async function request(path, options = {}) {
  const { method = "GET", body, token, headers = {} } = options;
  const requestHeaders = { Accept: "application/json", ...headers };
  if (token) requestHeaders.Authorization = `Bearer ${token}`;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  if (body !== undefined && !isFormData) requestHeaders["Content-Type"] = "application/json";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const config = { method, headers: requestHeaders };
  if (body !== undefined) config.body = isFormData ? body : JSON.stringify(body);
  const response = await fetch(`${API_BASE_URL}${cleanPath}`, config);
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await response.json() : await response.text();
  if (!response.ok) {
    const error = new Error(typeof data === "object" && data?.message ? data.message : "Request failed. Please try again.");
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export function apiRequest(path, options = {}) { return request(path, options); }
export function setActiveRole(role) {
  if (ROLES.includes(role)) localStorage.setItem(ROLE_KEY, role);
  else localStorage.removeItem(ROLE_KEY);
}
export function getStoredToken(role = activeRole()) {
  if (!role || !ROLES.includes(role)) return null;
  try { return JSON.parse(localStorage.getItem(key(role)) || "null")?.token || null; } catch { return null; }
}
export function getStoredUser(role = activeRole()) {
  if (!role || !ROLES.includes(role)) return null;
  try { return JSON.parse(localStorage.getItem(key(role)) || "null")?.user || null; } catch { localStorage.removeItem(key(role)); return null; }
}
export function saveAuth(data) {
  if (!data?.token || !ROLES.includes(data?.role)) throw new Error("Authentication response is invalid.");
  const user = { _id: data._id, name: data.name, email: data.email, role: data.role };
  localStorage.setItem(key(data.role), JSON.stringify({ token: data.token, user }));
  setActiveRole(data.role);
  return user;
}
export function clearAuth(role = activeRole()) {
  if (role && ROLES.includes(role)) localStorage.removeItem(key(role));
  else ROLES.forEach(item => localStorage.removeItem(key(item)));
  if (!role || activeRole() === role) localStorage.removeItem(ROLE_KEY);
}
export { API_BASE_URL };
