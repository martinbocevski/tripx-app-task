const AUTH_STORAGE_KEY = "tripx_is_authenticated";

export async function login(username: string, password: string) {
  try {
    const response = await fetch(
      "https://tripx-test-functions.azurewebsites.net/api/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      },
    );

    if (response.status === 200) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      return { success: true };
    } else if (response.status === 401 || response.status === 400) {
      return { success: false, error: "Wrong username or password" };
    } else if (response.status >= 500) {
      return { success: false, error: "Server error" };
    } else {
      return { success: false, error: "Something went wrong" };
    }
  } catch (err) {
    return { success: false, error: "Network error" };
  }
}

export function isUserAuthenticated() {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function clearAuthenticationSession() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}
