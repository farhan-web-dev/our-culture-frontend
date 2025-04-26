export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) => {
    const response = await fetch("/orders/own/");
    const data = await response.json();
    resolve({ data });
  });
}

export async function fetchLoggedInUser() {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/users/own`,
    {
      credentials: "include",
    }
  );

  if (!response.ok) {
    // Handle error better here
    throw new Error("Unauthorized. Please log in again.");
  }

  const data = await response.json();
  return { data };
}

export function updateUser(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users/` + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
