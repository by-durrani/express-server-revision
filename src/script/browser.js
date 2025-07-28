import { userData } from "./server.js";

if (userData) {
  const headingTemplate = `Hello ${userData.username}`;
  document.getElementById("heading").innerHTML = headingTemplate;
}

function updateAuthButton() {
  const cookies = document.cookie.split("; ").find((element) => {
    return element.startsWith("token");
  });

  const authButton = document.getElementById("auth");

  if (!cookies) {
    authButton.innerHTML = "Login";
  } else {
    authButton.innerHTML = "Logout";
  }

  authButton.addEventListener("click", () => {
    document.cookie = "token=; Max-Age=0; path=/";
    window.location.href = "/auth";
  });
}

document.addEventListener("DOMContentLoaded", updateAuthButton);
window.addEventListener("focus", updateAuthButton);
