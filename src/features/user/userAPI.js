export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/own/", {
      // credentials: "include", // Make sure cookies are included
    });
    const data = await response.json();
    resolve({ data });
  });
}

export async function fetchLoggedInUser() {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/users/own`,
    {
      // credentials: "include", // Make sure cookies are included
    }
  );

  // Check if the response is not okay (e.g. 401 Unauthorized)
  if (!response.ok) {
    const errorMessage = await response.text(); // Get plain text (error message)
    throw new Error(errorMessage || "Unauthorized. Please log in again.");
  }

  // Parse JSON only if the response is OK (200 status)
  const data = await response.json();
  return { data };
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/users/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
      // credentials: "include", // Include cookies for authentication
    });
    const data = await response.json();
    resolve({ data });
  });
}
