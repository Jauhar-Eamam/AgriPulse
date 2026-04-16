const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

async function sendAuthRequest(path, payload) {
  const response = await fetch(`${backendUrl}${path}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw { status: response.status, payload: data };
  }

  return data;
}

export const login = (payload) => sendAuthRequest("/api/login", payload);
export const signup = (payload) => sendAuthRequest("/api/signup", payload);
