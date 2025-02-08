// Script for Confirm Cancel modal

var doYouWantToCancelModalWrapper = document.getElementById("do-you-want-to-cancel-modal-wrapper");
var doYouWantToCancelModalCancelButton = document.getElementById("do-you-want-to-cancel-modal-cancel-button");

// Import da goods
import { modalManager } from "./classes/ModalManager.js";
import { trapFocus, closeModal } from "./reusable-functions.js";


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
doYouWantToCancelModalCancelButton.addEventListener("click", () => {
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
// Button to confirm DO YOU WANT TO CANCEL modal
//
// =================================
var doYouWantToCancelModalYesButton = document.getElementById("do-you-want-to-cancel-modal-yes-button");
doYouWantToCancelModalYesButton.addEventListener("click", () => {
    // Close this modal
    closeModal(doYouWantToCancelModalWrapper);
    document.removeEventListener("keydown", initDoYouWantToCancelModalTrapFocus);

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