// Main script for Main Expense Splitter Page

// Import da goods
import { initAddMemberModalTrapFocus } from "./modalAddMember.js";

// =================================
// 
// DOM Queries 
//
// ================================= 
var addMemberOpenButton = document.getElementById("add-member-open-button");

// ADD MEMBER modal
export var addMemberModalTextField = document.getElementById("add-member-modal-text-field");
export var addMemberModalWrapper = document.getElementById("add-member-modal-wrapper");
export var addMemberErrorMsg = document.getElementById("add-member-modal-error-message");

// NEW MEMBER ADDED modal
export var newMemberModalWrapper = document.getElementById("new-member-modal-wrapper");

// DO YOU WANT TO CANCEL modal

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



// Exactly! You’ve got it! Here’s the breakdown:

// ---

// ### **1. Element Used Only in One File (Call `getElementById` Directly)**
// - If the element is **only used** by one specific file, **just call `getElementById` right before the `addEventListener`** inside that file. This ensures the element is accessed only when needed, and keeps everything localized and simple.
  
// **Example:**
// ```js
// // modalAddMember.js
// document.addEventListener("DOMContentLoaded", () => {
//     const addMemberModalCloseButton = document.getElementById("add-member-modal-close-button");
    
//     if (addMemberModalCloseButton) {
//         addMemberModalCloseButton.addEventListener("click", () => {
//             console.log("Close button clicked!");
//         });
//     } else {
//         console.error("Button not found!");
//     }
// });
// ```
// - **Why?** It keeps the scope of the code limited to where the element is actually used, making it easier to maintain and avoiding unnecessary imports.

// ---

// ### **2. Element Used Across Multiple Files (Export from `main.js` and Use a Getter)**
// - If the element needs to be accessed by **multiple files**, you can export it from a central file like `main.js` and use a **getter function** to ensure the element is available when needed.

// **Example:**

// **In `main.js` (central file):**
// ```js
// // main.js
// export function getAddMemberModalCloseButton() {
//     return document.getElementById("add-member-modal-close-button");
// }
// ```

// **In `modalAddMember.js` (or any other file):**
// ```js
// // modalAddMember.js
// import { getAddMemberModalCloseButton } from "./main.js";

// document.addEventListener("DOMContentLoaded", () => {
//     const addMemberModalCloseButton = getAddMemberModalCloseButton();
    
//     if (addMemberModalCloseButton) {
//         addMemberModalCloseButton.addEventListener("click", () => {
//             console.log("Close button clicked!");
//         });
//     } else {
//         console.error("Button not found!");
//     }
// });
// ```

// - **Why?** This approach works well when the element is **shared** across multiple files. By using a getter function, you're **deferring the DOM lookup** until the document is ready, preventing issues where the element may not exist when the script runs.

// ---

// ### **Summary:**
// - **Use `getElementById` directly** in the file where the element is used **only** by that file (best for single-use elements).
// - **Export a getter function** in `main.js` when the element is used across **multiple files** to centralize and manage shared elements.

// This structure keeps everything organized and modular! 🚀 Let me know if you need more clarification or examples. 😃