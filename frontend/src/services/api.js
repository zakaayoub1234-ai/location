const API_URL = "/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();
  if (!res.ok && !data.status) throw new Error(data.message || "Request failed");
  return data;
}

async function uploadRequest(endpoint, formData) {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`${API_URL}${endpoint}`, { method: "POST", headers, body: formData });
  const data = await res.json();
  if (!res.ok && !data.status) throw new Error(data.message || "Request failed");
  return data;
}

export const api = {
  login: (email, password) =>
    request("/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (name, email, password) =>
    request("/register", { method: "POST", body: JSON.stringify({ name, email, password }) }),
  getUser: () => request("/user"),

  submitBooking: (data) =>
    request("/booking-requests", { method: "POST", body: JSON.stringify(data) }),
  getBookings: () => request("/booking-requests"),
  updateBooking: (id, status) =>
    request(`/booking-requests/${id}`, { method: "PUT", body: JSON.stringify({ status }) }),

  getCars: () => request("/cars"),
  getCar: (id) => request(`/cars/${id}`),
  createCar: (formData) => uploadRequest("/cars", formData),
  updateCar: (id, formData) => {
    formData.append("_method", "PUT");
    return uploadRequest(`/cars/${id}`, formData);
  },
  deleteCar: (id) => request(`/cars/${id}`, { method: "DELETE" }),
};
