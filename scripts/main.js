// ADD MEMBER modal
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
    // Confirm cancel if there is an entry. Otherwise, close right away
    const name = String(document.getElementById("add-member-modal-text-field").value);
    if (name === "") {
        // Close the modal
        closeModal(addMemberModalWrapper);

        // Stop listening for tab key presses
        document.removeEventListener("keydown", initAddMemberModalTrapFocus);
    }
    else {
        // Open confirm cancel modal
        openDoYouWantToCancelModal();

    }
    
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

            // Close this modal
            closeModal(addMemberModalWrapper);

            // Open the modal for confirming new member added
            openConfirmNewMemberModal(name);

            return;
        }
    }
    else {
        // Raise error
        addMemberErrorMsg.textContent = "Member name must be at least 1 character.";
        addMemberErrorMsg.classList.add("error-visible");
    }    
})


// NEW MEMBER ADDED modal
var newMemberModalWrapper = document.getElementById("new-member-modal-wrapper");
var newMemberModalOKButton = document.getElementById("new-member-modal-ok-button");

// =================================
//
// Function to display modal to confirm NEW MEMBER ADDED
//
// =================================
function openConfirmNewMemberModal(name) {
    // Set the name to be displayed
    var newMemberAddedString = document.getElementById("new-member-name");
    newMemberAddedString.textContent = name;

    // Display the modal
    newMemberModalWrapper.style.display = "block";

    // Set focus on OK button
    newMemberModalOKButton.focus();

    // Start listening for tab key presses and trap focus
    document.addEventListener("keydown", initNewMemberAddedModalTrapFocus);
}


// =================================
//
// Button to close NEW MEMBER ADDED modal
//
// =================================
newMemberModalOKButton.addEventListener("submit", (event) => {
    // Prevent refresh
    event.preventDefault();

    // Close the modal
    closeModal(newMemberModalWrapper);

    // Stop listening for tab key presses
    document.removeEventListener("keydown", initNewMemberAddedModalTrapFocus);
})


// DO YOU WANT TO CANCEL modal
var doYouWantToCancelModalWrapper = document.getElementById("do-you-want-to-cancel-modal-wrapper");
var doYouWantToCancelModalCancelButton = document.getElementById("do-you-want-to-cancel-modal-cancel-button");

// =================================
//
// Function to display DO YOU WANT TO CANCEL modal
//
// =================================
function openDoYouWantToCancelModal() {
    // Display the modal
    doYouWantToCancelModalWrapper.style.display = "block";

    // Set focus on Cancel button
    doYouWantToCancelModalCancelButton.focus();

    // Start listening for tab key presses and trap focus
    document.addEventListener("keydown", initDoYouWantToCancelModalTrapFocus);
}


// =================================
//
// Button to cancel DO YOU WANT TO CANCEL modal
//
// =================================
doYouWantToCancelModalCancelButton.addEventListener("submit", () => {
    // Return to Add Member Modal button
    closeModal(doYouWantToCancelModalWrapper);
    
    // Stop listening for tab key presses
    document.removeEventListener("keydown", initDoYouWantToCancelModalTrapFocus);
});

// TODO: Figure out cancel loop thang

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
// Function to wrap trapFocus for ADD NEW MEMBER modal
//
// =================================
function initAddMemberModalTrapFocus(event) {
    trapFocus(event, addMemberModalWrapper);
}

// =================================
// 
// Function to wrap trapFocus for NEW MEMBER ADDED modal
//
// =================================
function initNewMemberAddedModalTrapFocus(event) {
    trapFocus(event, newMemberModalWrapper);
}

// =================================
// 
// Function to wrap trapFocus for DO YOU WANT TO CANCEL modal
//
// =================================
function initDoYouWantToCancelModalTrapFocus(event) {
    trapFocus(event, doYouWantToCancelModalWrapper);
}