function updateChatbotProfile() {
  const chatUserName = document.getElementById("chat-user-name");
  const chatUserNameHero = document.getElementById("chat-user-name-hero");
  const chatUserAvatar = document.getElementById("chat-user-avatar");

  if (!chatUserName || !chatUserAvatar) return;

  const savedName = localStorage.getItem("profileName");
  const savedAvatar = localStorage.getItem("profileAvatar");

  chatUserName.innerText =
    savedName && savedName.trim() !== "" ? savedName : "User";

  chatUserAvatar.src = savedAvatar || "assets/images/profile-pic.png";

  if (!chatUserNameHero) return;

  const savedNameHero = localStorage.getItem("profileName");
  chatUserNameHero.innerText =
    savedNameHero && savedNameHero.trim() !== "" ? savedNameHero : "";
}

// Run once on load
document.addEventListener("DOMContentLoaded", updateChatbotProfile);

// -------------------------------------------------------------------

chatInput = document.querySelector("#chat-input");
chatContainer = document.querySelector(".chat-container");



const Api_Url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=AIzaSyCHAUDU5CbCwInIw8JwgohfCoukqyZVtpw";

let user = {
  data: null,
};
async function generateResponse(aiChatBox) {
  try {
    const response = await fetch(Api_Url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: user.data }]
          }
        ]
      })
    });

    const data = await response.json();
    console.log("Gemini response:", data);

    const aiChatArea = aiChatBox.querySelector(".ai-chat-area");
    aiChatArea.classList.remove("typing");
    aiChatArea.innerHTML = "";

    // ❗ IMPORTANT CHECK
    if (!response.ok || !data.candidates) {
      aiChatArea.innerText =
        data.error?.message || "AI is temporarily unavailable.";
      return;
    }

    // ✅ SAFE ACCESS
    const aiText = data.candidates[0].content.parts[0].text;
    aiChatArea.innerText = aiText;

    chatContainer.scrollTop = chatContainer.scrollHeight;

  } catch (error) {
    console.error("Fetch error:", error);
    const aiChatArea = aiChatBox.querySelector(".ai-chat-area");
    aiChatArea.classList.remove("typing");
    aiChatArea.innerText = "Network error. Please try again.";
  }
}


function getUserAvatar() {
  return (
    localStorage.getItem("profileAvatar") ||
    "assets/images/profile-pic.png"
  );
}


function createChatBox(html, classes) {
  let div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);
  return div;
}

function handleChatResponse(messeage) {
  user.data = messeage;
  let userAvatar = getUserAvatar();

let html = `
  <div class="user-chat-area">
    ${user.data}
  </div>
    <img src="${userAvatar}" alt="userImage" class="user-chat-avatar">
`;

  let userChatBox = createChatBox(html, "user-chat-box");

  chatContainer.appendChild(userChatBox);

  chatInput.value = "";

  setTimeout(() => {
    let html = `
  <img src="assets/icons/chatbot-icon.webp" alt="aiImage" id="aiImage">
  <div class="ai-chat-area typing">
    Typing<span>.</span><span>.</span><span>.</span>
  </div>
`;

    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    generateResponse(aiChatBox);
  }, 600);
}

chatInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    handleChatResponse(chatInput.value);
  }
});


