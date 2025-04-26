export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}

// export function createProduct(productFormData) {
//   const token = localStorage.getItem("token");

//   return fetch("/products/", {
//     method: "POST",
//     body: productFormData, // already FormData
//     headers: {
//       ...(token && { Authorization: `Bearer ${token}` }),
//       // ⚠️ DO NOT manually set 'Content-Type' when sending FormData!
//     },
//   }).then(async (response) => {
//     const responseText = await response.text();

//     try {
//       const data = responseText ? JSON.parse(responseText) : {};

//       if (!response.ok) {
//         throw new Error(
//           data.message || `Request failed with status ${response.status}`
//         );
//       }

//       return data;
//     } catch (err) {
//       throw new Error(responseText || "Server error");
//     }
//   });
// }

// For updateProduct (improved version)
export function updateProduct(update) {
  // Remove the ID from the update body to avoid duplicates
  const { id, ...updateData } = update;

  return fetch(`/products/${id}`, {
    method: "PATCH", // or 'PUT' if your API prefers that
    body: JSON.stringify(updateData),
    headers: { "content-type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      return response.json();
    })
    .then((data) => ({ data }))
    .catch((error) => {
      console.error("Update product error:", error);
      throw error;
    });
}

export function fetchProductsByFilters(filter, sort, pagination, admin) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch("/products?" + queryString);
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}
