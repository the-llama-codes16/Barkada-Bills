// Script for Confirm Cancel modal

var doYouWantToCancelModalWrapper = document.getElementById("do-you-want-to-cancel-modal-wrapper");
var doYouWantToCancelModalCancelButton = document.getElementById("do-you-want-to-cancel-modal-cancel-button");

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
doYouWantToCancelModalCancelButton.addEventListener("submit", () => {
    // Close this modal
    closeModal(doYouWantToCancelModalWrapper);
    
    // Stop listening for tab key presses
    document.removeEventListener("keydown", initDoYouWantToCancelModalTrapFocus);

    // Whoever is using this modal, return an answe
});

// =================================
// 
// Function to wrap trapFocus for DO YOU WANT TO CANCEL modal
//
// =================================
function initDoYouWantToCancelModalTrapFocus(event) {
    trapFocus(event, doYouWantToCancelModalWrapper);
}