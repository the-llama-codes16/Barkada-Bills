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
})

// =================================
// 
// Button to close ADD MEMBER modal
//
// =================================
var addMemberModalCloseButton = document.getElementById("add-member-modal-close-button");
addMemberModalCloseButton.addEventListener("click", (event) => {
    closeModal(addMemberModalWrapper);
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
        // Check if the name already exists
        if (name in memberDict) {
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








// // ADD MEMBER modal script
// var openMemberModalButton = document.getElementById("open-add-member-button")
// var addMemberModal = document.getElementById("add-member-modal")
// var closeMemberModalButton = document.getElementById("close-add-member-modal-button")
// // var addMemberModalButton = document.getElementById("add-member-modal-button")
// var addMemberTextField = document.getElementById("member-name")
// var addMemberForm = document.getElementById("add-member-form")


// // TODO: FOCUS TRAPPING!
// // Focus trapping for the Add Member modal
// export function trapFocus(e, modalId) {
//     const isTabPressed = e.key === `Tab` || e.keyCode === 9;
  
//     if (!isTabPressed) {
//       return;
//     }
//     const focusableElements = `button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])`;
//     const modal = document.getElementById(modalId);
  
//     // get focusable elements in modal
//     const firstFocusableElement = modalId === 'mobile-nav-wrapper' ? document.querySelector(`.toggleMobileNav`) : modal.querySelectorAll(focusableElements)[0];
//     const focusableContent = modal.querySelectorAll(focusableElements);
//     const lastFocusableElement = focusableContent[focusableContent.length - 1];
  
//     if (e.shiftKey) {
//       if (document.activeElement === firstFocusableElement) {
//         lastFocusableElement.focus();
//         e.preventDefault();
//       }
//     } else if (document.activeElement === lastFocusableElement) {
//       firstFocusableElement.focus();
//       e.preventDefault();
//     }
// }


// openMemberModalButton.addEventListener("click", () => {
//     // Open the modal
//     console.log("opening")
//     addMemberModal.style.display = "block";

//     // Ensure that text field is empty and set focus on it
//     addMemberTextField.value = "";
//     addMemberTextField.focus();

//     // Listen for tab presses and trap focus to modal elements only
//     document.addEventListener("keydown", initTrapFocus);
// })
// closeMemberModalButton.addEventListener("click", (event) => {
//     closeModal(addMemberModal);
// })
// addMemberForm.addEventListener("submit", (event) => {
//     // Prevent refresh
//     event.preventDefault();

//     // Add the member
//     const name = String(document.getElementById("member-name").value);
//     console.log(name);

//     // Get the existing data of member list or create it if inexistent
//     const memberDict = JSON.parse(sessionStorage.getItem("members")) || {};

//     // Check if the name already exists
//     if (name in memberDict) {
//         console.log(`Member name already exists: ${name}`)

//         // TODO: Raise a message here that name already exists then return
//     }

//     // Validate and add the name
//     memberDict[name] = {};
//     sessionStorage.setItem("members", JSON.stringify(memberDict));
//     console.log(memberDict);
//     // sessionStorage.clear();

//     // Close
//     closeModal(addMemberModal);
// })


// function closeModal(targetModal) {
//     console.log("closing")
//     targetModal.style.display = "none";

//     // Stop listening for tabs when modal is closed
//     document.removeEventListener("keydown", initTrapFocus);
// }

// function initTrapFocus(e) {
//     return trapFocus(e, `modal-id`);
// }

// // Note: Check here for text limit as well even tho maxlength has been set on the text input


