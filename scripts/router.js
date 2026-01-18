const home = document.getElementById("nav-home");
const tracker = document.getElementById("nav-tracker");
const chatBot = document.getElementById("nav-chatbot");
const profile = document.getElementById("nav-profile");
const chatProfileNav = document.getElementById("chat-profile-nav");


const homeSection = document.querySelector("#home");
const trackerSection = document.querySelector("#tracker");
const chatBotSection = document.querySelector("#chatbot");
const profileSection = document.querySelector("#profile");

home.addEventListener('click', () => {
    homeSection.style.display = "flex";
    trackerSection.style.display = "none";
    chatBotSection.style.display = "none";
    profileSection.style.display = "none";
});

tracker.addEventListener('click', () => {
    homeSection.style.display = "none";
    trackerSection.style.display = "flex";
    chatBotSection.style.display = "none";
    profileSection.style.display = "none";
});

chatBot.addEventListener('click', () => {
    homeSection.style.display = "none";
    trackerSection.style.display = "none";
    chatBotSection.style.display = "block";
     profileSection.style.display = "none";
});

profile.addEventListener('click', () => {
    homeSection.style.display = "none";
    trackerSection.style.display = "none";
    chatBotSection.style.display = "none";
    profileSection.style.display = "flex";
});

chatProfileNav.addEventListener('click', () => {
    homeSection.style.display = "none";
    trackerSection.style.display = "none";
    chatBotSection.style.display = "none";
    profileSection.style.display = "flex";
});