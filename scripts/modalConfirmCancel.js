// Script for Confirm Cancel modal

var doYouWantToCancelModalWrapper = document.getElementById("do-you-want-to-cancel-modal-wrapper");
var doYouWantToCancelModalCancelButton = document.getElementById("do-you-want-to-cancel-modal-cancel-button");

// Import da goods
import { modalManager } from "./modalManager.js";
import { trapFocus, closeModal } from "./reusableFunctions.js";
import { openAddMemberModal } from "./modalAddMember.js";


// =================================
//
// Function to display DO YOU WANT TO CANCEL modal
//
// =================================
export function openDoYouWantToCancelModal() {
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
doYouWantToCancelModalCancelButton.addEventListener("click", (event) => {
    // Prevent refresh
    event.preventDefault();

    // Close this modal
    closeModal(doYouWantToCancelModalWrapper);
    document.removeEventListener("keydown", initDoYouWantToCancelModalTrapFocus);

    // Open the previous modal that called this Confirm Cancel modal
    modalManager.displayActiveModal();

    // Clear!
    modalManager.clearActiveModalInfo();

});

// =================================
// 
// Function to wrap trapFocus for DO YOU WANT TO CANCEL modal
//
// =================================
function initDoYouWantToCancelModalTrapFocus(event) {
    trapFocus(event, doYouWantToCancelModalWrapper);
}