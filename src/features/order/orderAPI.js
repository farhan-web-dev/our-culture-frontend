export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/orders`,
      {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function updateOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/orders/` + order.id,
      {
        method: "PATCH",
        body: JSON.stringify(order),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/orders?` + queryString
    );
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
