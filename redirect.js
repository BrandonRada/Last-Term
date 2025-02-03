//ChatGPT helped me with this, now both all paths should work.

// Get the URL path
const urlParams = window.location.pathname.split("/");

// Extract the last segment of the path (e.g., the lab number)
// Default to 0 if no specific number is provided
const labNumber = urlParams[urlParams.length - 1] || "0";

// Redirect to the appropriate lab directory
const targetUrl = `COMP4537/labs/${labNumber}/index.html`;

// if ((targetUrl === `COMP4537/labs/${0}/writer.html`) || (targetUrl === `COMP4537/labs/${0}/reader.html`)){
//     targetUrl = ``;
// }

window.location.href = targetUrl;