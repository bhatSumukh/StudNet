// event selector
const profileEditBtn = document.getElementById("profile-edit-btn");
const profileViewBtn = document.getElementById("profile-back-btn");
const profileSaveBtn = document.getElementById("profile-save-btn");
const avatarImage = document.getElementById("input-avatar");
const fileInput = document.getElementById("user-avatar");
const currentViewAvatar = document.getElementById("default-avatar");

// view mode selector
const profileViewMode = document.querySelector(".profile-view");
const profileEditMode = document.querySelector(".profile-edit");

// User Detail Variables
const profileName = document.getElementById("user-name");
const profileBio = document.getElementById("user-bio");
const profileDegree = document.getElementById("user-degree");
const profileCollege = document.getElementById("user-college");

const profileInputName = document.getElementById("user-input-name");
const profileInputBio = document.getElementById("user-input-bio");
const profileInputDegree = document.getElementById("user-input-degree");
const profileInputCollege = document.getElementById("user-input-college");

let currentAvatar = null;
const savedAvatar = localStorage.getItem("profileAvatar");

profileName.innerText = localStorage.getItem("profileName") || "User";
profileBio.innerText = localStorage.getItem("profileBio") || "User Bio";
profileDegree.innerText = localStorage.getItem("profileDegree") || "Degree";
profileCollege.innerText =
  localStorage.getItem("profileCollege") || "College Name";

// logic codes

// view mode function
profileEditBtn.addEventListener("click", () => {
  profileViewMode.style.display = "none";
  profileEditMode.style.display = "flex";
});

profileViewBtn.addEventListener("click", () => {
  profileViewMode.style.display = "flex";
  profileEditMode.style.display = "none";
});

// Open file picker when image is clicked
avatarImage.addEventListener("click", () => {
  fileInput.click();
});

// Show preview after selecting image
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    alert("Please select an image file");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    avatarImage.src = reader.result;
    currentAvatar = reader.result;
  };

  reader.readAsDataURL(file);
});

profileSaveBtn.addEventListener("click", () => {
  profileViewMode.style.display = "flex";
  profileEditMode.style.display = "none";

  if (
    !profileInputName ||
    !profileInputBio ||
    !profileInputDegree ||
    !profileInputCollege
  ) {
    console.error("One or more input elements not found");
    return;
  }

  if (currentAvatar) {
    currentViewAvatar.src = currentAvatar;
    localStorage.setItem("profileAvatar", currentAvatar);
  }

  // Getting User Details
  profileName.innerText = profileInputName.value;
  profileBio.innerText = profileInputBio.value;
  profileDegree.innerText = profileInputDegree.value;
  profileCollege.innerText = profileInputCollege.value;

  localStorage.setItem("profileName", profileInputName.value);
  localStorage.setItem("profileBio", profileInputBio.value);
  localStorage.setItem("profileDegree", profileInputDegree.value);
  localStorage.setItem("profileCollege", profileInputCollege.value);
});

if (savedAvatar) {
  avatarImage.src = savedAvatar;
  currentAvatar = savedAvatar;
  avatarImage.src = savedAvatar;
  currentViewAvatar.src = savedAvatar;
}
