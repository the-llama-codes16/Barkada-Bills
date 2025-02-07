// Reusable Functions

// =================================
// 
// Function to close modal
//
// =================================
export function closeModal(targetModal) {
  console.log("closing...")
  targetModal.style.display = "none";
}

// =================================
// 
// Function to check if a member name already exists, case insensitive
//
// =================================
export function hasMemberNameCaseInsensitive(memberList, nameToCheck) {
  console.log(`Checking if ${nameToCheck} already exists...`);
  const nameToCheckLower = nameToCheck.toLowerCase();
  for (let name in memberList) {
    if (name.toLowerCase() === nameToCheckLower) {
      return true;
    }
  }
  return false;
}

// =================================
// 
// Function to get member data from sessionStorage or create it if inexistent
//
// =================================
export function getMemberData() {
  return JSON.parse(sessionStorage.getItem("memberData")) || { "members": [] };
}

// =================================
// 
// Function to store member data to sessionStorage
//
// =================================
export function setMemberData(memberData) {
  sessionStorage.setItem("memberData", JSON.stringify(memberData));
}

// =================================
// 
// Function to trap focus in a given modal
//
// =================================
export function trapFocus(event, modal) {
  console.log("trapfocus called!")

  // Don't bother if no key is detected
  if (event.key == null) {
    return;
  }

  // Check if the key pressed is the Tab key
  const isTabPressed = event.key === `Tab` || event.keyCode === 9;
  if (!isTabPressed) {
    return;
  }

  // Get the modal and its focusable elements
  const focusableElements = `button, input, [tabindex]:not([tabindex="-1"])`;
  const focusableContent = modal.querySelectorAll(focusableElements);
  const firstFocusableElement = focusableContent[0];
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      event.preventDefault();
    }
  } 
  else if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      event.preventDefault();
  }
}