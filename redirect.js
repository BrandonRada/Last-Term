// Get the URL path
const urlParams = window.location.pathname.split("/");

// Extract the last segment of the path (e.g., the lab number)
// Default to 0 if no specific number is provided
const labNumber = urlParams[urlParams.length - 1] || "0";

// Redirect to the appropriate lab directory
const targetUrl = `COMP4537/labs/${labNumber}/index.html`;
window.location.href = targetUrl;