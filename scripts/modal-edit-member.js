// Script for Edit Member modal

// Import da goods
import { trapFocus, closeModal, getMemberData, setMemberData, hasNameCaseInsensitive } from "./reusable-functions.js";
import { openDoYouWantToCancelModal } from "./modal-confirm-cancel.js";
import { modalManager } from "./classes/ModalManager.js";
import { itemManager } from "./classes/ItemManager.js";
import { displayMembers, displayExpenses, displayMemberContribInfo } from "./main.js";

// =================================
/**
 * DOM Queries 
*/
// =================================
var editMemberModalTextField = document.getElementById("edit-member-modal-text-field");
var editMemberModalWrapper = document.getElementById("edit-member-modal-wrapper");
var editMemberErrorMsg = document.getElementById("edit-member-modal-error-message");

// =================================
/**
 * Function to display EDIT MEMBER modal
*/
// =================================
export function openEditMemberModal(memberName = []) {
    console.log("opening Edit Member Modal...");
    editMemberModalWrapper.style.display = "block";

    // Set focus on the text field and ensure that the selected name is displayed
    if (memberName.length > 0) {
        editMemberModalTextField.value = memberName[0];
    }
    else {
        editMemberModalTextField.value = "";
    }
    editMemberModalTextField.focus();

    // Clear the error message placeholder and adjust buttons
    editMemberErrorMsg.classList.remove("error-visible");

    // Start listening for tab key presses and trap focus
    document.addEventListener("keydown", initEditMemberModalTrapFocus);
}

// =================================
/**
 * Button to close EDIT MEMBER modal
*/
// =================================
var editMemberModalCloseButton = document.getElementById("edit-member-modal-close-button");
editMemberModalCloseButton.addEventListener("click", () => {
    const name = String(editMemberModalTextField.value); 

    // Close this modal
    closeModal(editMemberModalWrapper);
    document.removeEventListener("keydown", initEditMemberModalTrapFocus);

    // Confirm Cancel if there is a change with the name
    if (name !== itemManager.getItemName()) {
        // Set this as the current active modal
        console.log("Setting modal...")
        modalManager.setActiveModalInfo(openEditMemberModal, [name]);

        // Open confirm cancel modal
        openDoYouWantToCancelModal();
    }
    else {
        // Clear data on current item selected
        itemManager.clearItemInfo();
    }
})

// =================================
/**
 * Submit EDIT MEMBER modal
*/
// =================================
var editMemberModalForm = document.getElementById("edit-member-modal-form");
editMemberModalForm.addEventListener("submit", (event) => {
    // Prevent refresh
    event.preventDefault();

    // Get the existing data of member list
    const memberData = getMemberData();

    // Update the member name with validity checks
    const name = String(editMemberModalTextField.value).trim();

    // Check if input is valid
    if (/\S/.test(name)) {
        // Check if name is unchanged
        let originalName = itemManager.getItemName();

        if (name === originalName){
            // No warning needed, close this modal right away
            closeModal(editMemberModalWrapper);
            document.removeEventListener("keydown", initEditMemberModalTrapFocus);
        }
        else {
            // Check if the updated name already exists, case insensitive
            if (hasNameCaseInsensitive(memberData.members, name)) {
                console.log(`Member name already exists: ${name}`)
                editMemberErrorMsg.textContent = "Member name already exists.";
                editMemberErrorMsg.classList.add("error-visible");

                // Set focus back again to the text field 
                editMemberModalTextField.focus();
            }
            else {
                console.log(`Updating ${originalName} to ${name}...`);

                // Update the name
                let nameIndex = memberData.members.indexOf(originalName);
                console.log(`${originalName} found at ${nameIndex}`);
                memberData.members[nameIndex] = name;
                console.log(memberData.members);
                setMemberData(memberData);

                // Clear original member data
                itemManager.clearItemInfo();
                
                // Redisplay everything
                displayMembers();
                displayExpenses();
                displayMemberContribInfo();

                // Close this modal
                closeModal(editMemberModalWrapper);
                document.removeEventListener("keydown", initEditMemberModalTrapFocus);

                // Open the modal for confirming member edited
                openConfirmEditedMemberModal(name);
            }
        }
    }
    else {
        // Raise error
        editMemberErrorMsg.textContent = "Member name must be at least 1 character.";
        editMemberErrorMsg.classList.add("error-visible");

        // Set focus back again to the text field 
        editMemberModalTextField.focus();
    }    
});

// =================================
/**
 * Function to display EDITED MEMBER modal
*/
// =================================
var editedMemberModalWrapper = document.getElementById("edited-member-modal-wrapper");
var editedMemberModalOKButton = document.getElementById("edited-member-modal-ok-button");
function openConfirmEditedMemberModal(name) {
    // Set the name to be displayed
    var editedMemberAddedString = document.getElementById("edited-member-name");
    editedMemberAddedString.textContent = name;

    // Display the modal
    editedMemberModalWrapper.style.display = "block";

    // Set focus on OK button
    editedMemberModalOKButton.focus();

    // Start listening for tab key presses and trap focus
    document.addEventListener("keydown", initEditedMemberModalTrapFocus); 
}

// =================================
/**
 * Button to close EDITED MEMBER modal
*/
// =================================
editedMemberModalOKButton.addEventListener("click", () => {
    // Display members
    displayMembers();

    // Close the modal
    closeModal(editedMemberModalWrapper);

    // Stop listening for tab key presses
    document.removeEventListener("keydown", initEditedMemberModalTrapFocus);
});

// =================================
/**
 * Function to wrap trapFocus for EDIT MEMBER modal
*/
// =================================
function initEditMemberModalTrapFocus(event) {
    trapFocus(event, editMemberModalWrapper);
}

// =================================
/**
 * Function to wrap trapFocus for EDITED MEMBER modal
*/
// =================================
function initEditedMemberModalTrapFocus(event) {
    trapFocus(event, editedMemberModalWrapper);
}