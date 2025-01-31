// Script for Add Member modal, New Member Added modal

// Import da goods
import { 
    addMemberModalTextField, addMemberModalWrapper, addMemberErrorMsg, 
    newMemberModalWrapper } from "./main.js";
import { trapFocus, hasKeyCaseInsensitive, closeModal } from "./reusableFunctions.js";
import { openDoYouWantToCancelModal } from "./modalConfirmCancel.js";

// =================================
// 
// Button to close ADD MEMBER modal
//
// =================================
var addMemberModalCloseButton = document.getElementById("add-member-modal-close-button");
addMemberModalCloseButton.addEventListener("click", () => {
    // Confirm cancel if there is an entry. Otherwise, close right away
    const name = String(addMemberModalTextField.value);
    if (name === "") {
        // Close the modal
        closeModal(addMemberModalWrapper);

        // Stop listening for tab key presses
        document.removeEventListener("keydown", initAddMemberModalTrapFocus);
    }
    else {
        // Open confirm cancel modal
        openDoYouWantToCancelModal();
        // TODO
    }

    // Close the modal
    // closeModal(addMemberModalWrapper);

    // // Stop listening for tab key presses
    // document.removeEventListener("keydown", initAddMemberModalTrapFocus);
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
    const name = String(addMemberModalTextField.value);
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
var newMemberModalOKButton = document.getElementById("new-member-modal-ok-button");
newMemberModalOKButton.addEventListener("submit", (event) => {
    // Prevent refresh
    event.preventDefault();

    // Close the modal
    closeModal(newMemberModalWrapper);

    // Stop listening for tab key presses
    document.removeEventListener("keydown", initNewMemberAddedModalTrapFocus);
})

// =================================
// 
// Function to wrap trapFocus for ADD NEW MEMBER modal
//
// =================================
export function initAddMemberModalTrapFocus(event) {
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

