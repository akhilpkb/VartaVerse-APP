//const BASE_URL = "http://localhost:5222/api";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5222/api";

// Fetch articles
export async function fetchArticles() {
  try {
    const response = await fetch(`${BASE_URL}/articles`);
    const data = await response.json();

    // Extract the articles from "$values" array
    return data.$values || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

// Fetch categories
export async function fetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    const data = await response.json();
    return data.$values || []; // Return categories from $values
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

// Add a category
export async function addCategory(category) {
  try {
    const response = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
}

// Add an article
// export async function addArticle(article) {
//   try {
//     const response = await fetch(`${BASE_URL}/articles`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(article),
//     });
//     return await response.json();
//   } catch (error) {
//     console.error("Error adding article:", error);
//     throw error;
//   }
// }

// Add an article with image support
export async function addArticle(formData) {
  try {
    const response = await fetch(`${BASE_URL}/articles`, {
      method: "POST",
      // Do NOT set Content-Type when using FormData
      body: formData,
    });

    // Check if response is not ok (e.g., status 400)
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to add article");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding article:", error);
    throw error;
  }
}

