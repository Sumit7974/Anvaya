const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const AUTH_PREFIX = "anvaya_auth_";
const ACTIVE_ROLE_KEY = "anvaya_active_role";

const VALID_ROLES = new Set(["customer", "worker", "contractor", "admin"]);

function storage() {
  return typeof window !== "undefined" ? window.localStorage : null;
}

function roleKey(role) {
  return `${AUTH_PREFIX}${role}`;
}

function readRoleSession(role) {
  if (!VALID_ROLES.has(role)) return null;
  const raw = storage()?.getItem(roleKey(role));
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    storage()?.removeItem(roleKey(role));
    return null;
  }
}

function getActiveRole() {
  const role = storage()?.getItem(ACTIVE_ROLE_KEY);
  return VALID_ROLES.has(role) ? role : null;
}

export function setActiveRole(role) {
  if (!VALID_ROLES.has(role)) {
    storage()?.removeItem(ACTIVE_ROLE_KEY);
    return;
  }
  storage()?.setItem(ACTIVE_ROLE_KEY, role);
}

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

  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

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
    const message = typeof data === "object" && data?.message
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

export function getStoredToken(role = getActiveRole()) {
  const session = readRoleSession(role);
  return session?.token || null;
}

export function getStoredUser(role = getActiveRole()) {
  const session = readRoleSession(role);
  return session?.user || null;
}

export function saveAuth(data) {
  if (!data?.token || !VALID_ROLES.has(data?.role)) {
    throw new Error("Authentication response is invalid.");
  }

  const user = {
    _id: data._id,
    name: data.name,
    email: data.email,
    role: data.role,
  };

  storage()?.setItem(roleKey(data.role), JSON.stringify({ token: data.token, user }));
  setActiveRole(data.role);
  return user;
}

export function clearAuth(role = getActiveRole()) {
  if (VALID_ROLES.has(role)) {
    storage()?.removeItem(roleKey(role));
    if (getActiveRole() === role) storage()?.removeItem(ACTIVE_ROLE_KEY);
    return;
  }

  for (const storedRole of VALID_ROLES) storage()?.removeItem(roleKey(storedRole));
  storage()?.removeItem(ACTIVE_ROLE_KEY);
}

export { API_BASE_URL };