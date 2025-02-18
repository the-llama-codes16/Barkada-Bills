// Script for Add Member modal, New Member Added modal

// Import da goods
import { trapFocus, closeModal, hasNameCaseInsensitive, getMemberData, setMemberData } from "./reusable-functions.js";
import { openDoYouWantToCancelModal } from "./modal-confirm-cancel.js";
import { modalManager } from "./classes/ModalManager.js";
import { displayMembers, addMemberOpenButton } from "./main.js";

// =================================
// 
// DOM Queries 
//
// ================================= 
var addMemberModalTextField = document.getElementById("add-member-modal-text-field");
var addMemberModalWrapper = document.getElementById("add-member-modal-wrapper");
var addMemberErrorMsg = document.getElementById("add-member-modal-error-message");

// =================================
// 
// Function to display ADD MEMBER modal
//
// =================================
export function openAddMemberModal(memberName = []) {
    console.log("opening Add Member Modal...");
    addMemberModalWrapper.style.display = "block";

    // Set focus on the text field and ensure that the entry, if there is any, is displayed
    if (memberName.length > 0) {
        addMemberModalTextField.value = memberName[0];
    }
    else {
        addMemberModalTextField.value = "";
    }
    addMemberModalTextField.focus();

    // Clear the error message placeholder and adjust buttons
    addMemberErrorMsg.classList.remove("error-visible");

    // Start listening for tab key presses and trap focus
    document.addEventListener("keydown", initAddMemberModalTrapFocus);
}

// =================================
// 
// Button to close ADD MEMBER modal
//
// =================================
var addMemberModalCloseButton = document.getElementById("add-member-modal-close-button");
addMemberModalCloseButton.addEventListener("click", () => {
    const name = String(addMemberModalTextField.value); 

    // Close this modal
    closeModal(addMemberModalWrapper);
    document.removeEventListener("keydown", initAddMemberModalTrapFocus);

    // Confirm Cancel if there is an entry
    if (name !== "") {
        // Set this as the current active modal
        console.log("Setting modal...")
        modalManager.setActiveModalInfo(openAddMemberModal, [name]);

        // Open confirm cancel modal
        openDoYouWantToCancelModal();
    }
    else {
        // Return focus to Add Member button
        addMemberOpenButton.focus();
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
    const name = String(addMemberModalTextField.value).trim();
    console.log(name);

    // Get the existing data of member list or create it if inexistent
    const memberData = getMemberData();

    // Check if input is not just whitespace
    if (/\S/.test(name)) {
        // Check if name already exists, case insensitive
        if (hasNameCaseInsensitive(memberData.members, name)) {
            console.log(`Member name already exists: ${name}`);
            addMemberErrorMsg.textContent = "Member name already exists.";
            addMemberErrorMsg.classList.add("error-visible");

            // Set focus back again to the text field 
            addMemberModalTextField.focus();
        }
        else {
            // Add the name and save
            memberData.members.push(name);
            setMemberData(memberData);
            console.log(memberData);

            // Close this modal
            closeModal(addMemberModalWrapper);
            document.removeEventListener("keydown", initAddMemberModalTrapFocus);

            // Open the modal for confirming new member added
            openConfirmNewMemberModal(name);
        }
    }
    else {
        // Raise error
        addMemberErrorMsg.textContent = "Member name must be at least 1 character.";
        addMemberErrorMsg.classList.add("error-visible");

        // Set focus back again to the text field 
        addMemberModalTextField.focus();
    }    
});


// =================================
//
// Function to display modal to confirm NEW MEMBER ADDED
//
// =================================
var newMemberModalWrapper = document.getElementById("new-member-modal-wrapper");
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
newMemberModalOKButton.addEventListener("click", () => {
    console.log("okbutton clicked!");

    // Display members
    displayMembers();

    // Close the modal
    closeModal(newMemberModalWrapper);

    // Stop listening for tab key presses
    document.removeEventListener("keydown", initNewMemberAddedModalTrapFocus);

    // Return focus to Add Member button
    addMemberOpenButton.focus();
})

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

