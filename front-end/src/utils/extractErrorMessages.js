
export function extractErrorMessages(error) {
  const messages = [];
  const visited = new Set();
  const stack = [];

  // 1. Direct check for common error structures
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  // 2. Fallback to generic axios message if no data exists
  if (error?.response?.data) {
    stack.push(error.response.data);
  } else if (error?.message) {
    // Check if it's a network error or 404
    if (error.message.includes("Network Error")) return "Network Error : Check your connection";
    return error.message;
  } else {
    return "An unknown error occurred";
  }

  // 3. Deep dive into the error object (useful for validation errors like {email: ["invalid"], name: ["required"]})
  while (stack.length > 0) {
    const current = stack.pop();

    if (!current || visited.has(current)) continue;
    visited.add(current);

    if (typeof current === "string") {
      // Avoid returning full HTML pages if the server crashes
      if (/<(html|head|body|!DOCTYPE)/i.test(current)) {
        return "Server error : Please try again later.";
      }
      messages.push(current);
    } else if (Array.isArray(current)) {
      stack.push(...current);
    } else if (typeof current === "object") {
      stack.push(...Object.values(current));
    }
  }

  return messages.length ? messages.join(", ") : "An unknown error occurred";
}