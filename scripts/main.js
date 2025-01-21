// ADD MEMBER modal script
var addMemberOpenButton = document.getElementById("add-member-open-button");
var addMemberModalTextField = document.getElementById("add-member-modal-text-field");
var addMemberModalWrapper = document.getElementById("add-member-modal-wrapper");
var addMemberErrorMsg = document.getElementById("add-member-modal-error-message");

// =================================
// 
// Button to open ADD MEMBER modal
//
// =================================
addMemberOpenButton.addEventListener("click", () => {
    // Open the modal
    console.log("opening...");
    addMemberModalWrapper.style.display = "block";

    // Ensure that text field is empty and set focus on it
    addMemberModalTextField.value = "";
    addMemberModalTextField.focus();

    // Clear the error message placeholder and adjust buttons
    addMemberErrorMsg.classList.remove("error-visible");

    // Start listening for tab key presses and trap focus
    document.addEventListener("keydown", initAddMemberModalTrapFocus);
})

// =================================
// 
// Button to close ADD MEMBER modal
//
// =================================
var addMemberModalCloseButton = document.getElementById("add-member-modal-close-button");
addMemberModalCloseButton.addEventListener("click", (event) => {
    // Close the modal
    closeModal(addMemberModalWrapper);

    // Stop listening for tab key presses
    document.removeEventListener("keydown", initAddMemberModalTrapFocus);
})

// =================================
// 
// Submit ADD MEMBER modal
//
// =================================
var addMemberModalForm = document.getElementById("add-member-modal-form");
addMemberModalForm.addEventListener("submit", (event) => {
    // Prevent refresh
    event.preventDefault();

    // Add the member
    const name = String(document.getElementById("add-member-modal-text-field").value);
    console.log(name);

    // Get the existing data of member list or create it if inexistent
    const memberDict = JSON.parse(sessionStorage.getItem("members")) || {};

    // Check if input is valid
    if (/\S/.test(name)) {
        // Check if the name already exists, case insensitive
        if (hasKeyCaseInsensitive(memberDict, name)) {
            console.log(`Member name already exists: ${name}`)
            addMemberErrorMsg.textContent = "Member name already exists.";
            addMemberErrorMsg.classList.add("error-visible");
        }
        else {
            // Add the name
            memberDict[name] = {};
            sessionStorage.setItem("members", JSON.stringify(memberDict));
            console.log(memberDict);
            // sessionStorage.clear();

            // Close
            closeModal(addMemberModalWrapper);
            return;
        }
    }
    else {
        // Raise error
        addMemberErrorMsg.textContent = "Member name must be at least 1 character.";
        addMemberErrorMsg.classList.add("error-visible");
    }
    
})

// =================================
// 
// Function to close modal
//
// =================================
function closeModal(targetModal) {
    console.log("closing...")
    targetModal.style.display = "none";
}

// =================================
// 
// Function to check if key exists in a dictionary, case insensitive
//
// =================================
function hasKeyCaseInsensitive(dictionary, targetKey) {
    console.log("checking if key exists, case insensitive...");
    const targetKeyLower = targetKey.toLowerCase();
    for (key in dictionary) {
        if (String(key).toLowerCase() === targetKeyLower) {
            return true;
        }
    }
    return false;
}

// =================================
// 
// Function to trap focus in a given modal
//
// =================================
function trapFocus(event, modal) {
    console.log("trapfocus called!")
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

// =================================
// 
// Function to wrap trapFocus for Add Member modal
//
// =================================
function initAddMemberModalTrapFocus(event) {
    trapFocus(event, addMemberModalWrapper);
}
