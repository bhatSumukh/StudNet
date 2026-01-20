
function updateChatbotProfile() {
  const chatUserName = document.getElementById("chat-user-name");
  const chatUserNameHero = document.getElementById("chat-user-name-hero");
  const chatUserAvatar = document.getElementById("chat-user-avatar");

  if (!chatUserName || !chatUserAvatar) return;

  const savedName = localStorage.getItem("profileName");
  const savedAvatar = localStorage.getItem("profileAvatar");

  chatUserName.innerText =
    savedName && savedName.trim() !== "" ? savedName : "User";

  chatUserAvatar.src =
    savedAvatar && savedAvatar.trim() !== ""
      ? savedAvatar
      : "assets/images/profile-pic.png";

  if (chatUserNameHero) {
    chatUserNameHero.innerText =
      savedName && savedName.trim() !== "" ? savedName : "";
  }
}

document.addEventListener("DOMContentLoaded", updateChatbotProfile);


const chatInput = document.querySelector("#chat-input");
const chatContainer = document.querySelector(".chat-container");

const API_URL = "/.netlify/functions/chat";

let user = {
  data: null,
};

function getUserAvatar() {
  return (
    localStorage.getItem("profileAvatar") || "assets/images/profile-pic.png"
  );
}


function createChatBox(html, className) {
  const div = document.createElement("div");
  div.classList.add(className);
  div.innerHTML = html;
  return div;
}

async function generateResponse(aiChatBox) {
  const aiChatArea = aiChatBox.querySelector(".ai-chat-area");

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: user.data }),
    });

    const data = await response.json();
    

    aiChatArea.classList.remove("typing");
    aiChatArea.innerHTML = "";

    if (!response.ok) {
      aiChatArea.innerText = data.error || "AI is temporarily unavailable.";
      return;
    }

    aiChatArea.innerText = data.reply || "No response from AI";
    chatContainer.scrollTop = chatContainer.scrollHeight;
  } catch (error) {
    console.error("Network error:", error);
    aiChatArea.classList.remove("typing");
    aiChatArea.innerText = "Network error. Please try again.";
  }
}


function handleChatResponse(message) {
  if (!message.trim()) return;

  user.data = message;
  const userAvatar = getUserAvatar();

  const userHtml = `
    <div class="user-chat-area">${message}</div>
    <img src="${userAvatar}" class="user-chat-avatar" />
  `;

  const userChatBox = createChatBox(userHtml, "user-chat-box");
  chatContainer.appendChild(userChatBox);

  chatInput.value = "";
  chatContainer.scrollTop = chatContainer.scrollHeight;


  setTimeout(() => {
    const aiHtml = `
      <img src="assets/icons/chatbot-icon.webp" id="aiImage" />
      <div class="ai-chat-area typing">
        Typing<span>.</span><span>.</span><span>.</span>
      </div>
    `;

    const aiChatBox = createChatBox(aiHtml, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    generateResponse(aiChatBox);
  }, 500);
}


chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleChatResponse(chatInput.value);
  }
});
