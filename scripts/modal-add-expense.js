// Script for Add expense modal, New Expense Added modal

// Import da goods
import { getMemberData, trapFocus, closeModal } from "./reusable-functions.js";
import { addExpenseOpenButton } from "./main.js";
import { openDoYouWantToCancelModal } from "./modal-confirm-cancel.js";
import { modalManager } from "./classes/ModalManager.js";

// =================================
// 
// DOM Queries 
//
// ================================= 
let addExpenseModalTextField = document.getElementById("add-expense-modal-text-field");
let addExpenseModalWrapper = document.getElementById("add-expense-modal-wrapper");
let addExpenseModalErrorMsg = document.getElementById("add-expense-modal-error-message");
let addExpenseModalAmountNumField = document.getElementById("add-expense-modal-amount-num-field");
let addExpenseModalPayorsFilter = document.getElementById("add-expense-modal-payors-filter");

// =================================
// 
// Function to display ADD EXPENSE modal
//
// =================================
export function openAddExpenseModal(expenseInfo = []) {
    console.log("opening Add Expense Modal...");
    addExpenseModalWrapper.style.display = "block";

    // Set focus on the first text field and ensure that any existing entry is displayed
    if (expenseInfo.length > 0) {
        addExpenseModalTextField.value = expenseInfo[0];
        addExpenseModalAmountNumField.value = expenseInfo[1];
        addExpenseModalPayorsFilter.value = expenseInfo[2];
        // TODO: add modifier for payorList
    }
    else {
        // addExpenseModalTextField.value = "";
        // addExpenseModalAmountNumField.value = "";
        // addExpenseModalPayorsFilter.value = "selected-members"

        addExpenseModalTextField.value = "Bread";
        addExpenseModalAmountNumField.value = "25";
        addExpenseModalPayorsFilter.value = "selected-members"
        // TODO: add modifier for payorList
    }
    addExpenseModalTextField.focus();

    // Clear the error message placeholder and adjust buttons
    addExpenseModalErrorMsg.classList.remove("error-visible");

    // Start listening for tab key presses and trap focus
    document.addEventListener("keydown", initAddExpenseModalTrapFocus);
}

// =================================
// 
// Behavior of Amount number input field
//
// =================================

addExpenseModalAmountNumField.addEventListener("keydown", (event) => {
    restrictNumCharInput(event);
});

addExpenseModalAmountNumField.addEventListener("paste", (event) => {
    let newDataToPaste = restrictNumCharPaste(event);
    addExpenseModalAmountNumField.value += newDataToPaste;
});

// =================================
// 
// Function to restric input of Amount field
//
// =================================
function restrictNumCharInput(event) {
    console.log("Restricting input in Amount field!");

    // Don't bother if no key is detected
    if (event.key == null) {
        return;
    }

    // Do not allow if input is invalid
    if (!/^\d$/.test(event.key) && event.key !== "Backspace" && event.key !== ".") {
        event.preventDefault();
        console.log(`Skipped ${event.key}`);
    }

    // ISSUE: Tab presses to navigate through the modal does not move after Amount because of this
}

// =================================
// 
// Function to restrict character pasted in Amount field
//
// =================================
function restrictNumCharPaste(event) {
    console.log("Restricting paste in Amount field!");

    // Get the data user pasted
    let pastedData = event.clipboardData.getData("text");
    console.log(`You pasted: ${pastedData}`);

    // Only allow the valid characters
    let toPasteData = pastedData.replace(/[^0-9.]/g, "");
    console.log(`You'll paste: ${toPasteData}`);
    event.preventDefault();

    // Return the data to be pasted
    return toPasteData;
}

// =================================
// 
// Button to close ADD EXPENSE modal
//
// =================================
var addExpenseModalCloseButton = document.getElementById("add-expense-modal-close-button");
addExpenseModalCloseButton.addEventListener("click", () => {
    const name = String(addExpenseModalTextField.value); 
    const amount = String(addExpenseModalAmountNumField.value);
    const filter = String(addExpenseModalPayorsFilter.value);
    // TODO: add getting info of contributors

    // Close this modal
    closeModal(addExpenseModalWrapper);
    document.removeEventListener("keydown", initAddExpenseModalTrapFocus);

    // Confirm Cancel if there is an entry
    if (name !== "" || amount != "") {
        // TODO: add checking for filter and contributors
        // Set this as the current active modal
        console.log("Setting modal...")
        let currentExpenseInfo = [name, amount];
        // TODO: include filter and contributor info
        modalManager.setActiveModalInfo(openAddExpenseModal, currentExpenseInfo);

        // Open confirm cancel modal
        openDoYouWantToCancelModal();
    }
    else {
        // Return focus to Add Expense button
        addExpenseOpenButton.focus();
    }
});

// =================================
// 
// Function to display MODIFY PAYORS modal
//
// =================================
let modifyPayorsModalWrapper = document.getElementById("modify-payors-modal-wrapper");
function openModifyPayorsModal(expenseInfo) {
    console.log("opening Modify Payors modal...");

    console.log("EXPENSE INFO");
    console.log(expenseInfo);
    modifyPayorsModalWrapper.style.display = "block";

    // Ensure that any existing entry is displayed
    // TODO: Check any previously selected entries

    // Update the missing entries
    document.getElementById("modify-payors-modal-expense-amount").textContent = expenseInfo[1];
    document.getElementById("modify-payors-modal-expense-name").textContent = expenseInfo[0];
    document.getElementById("modify-payors-modal-expense-filter").textContent = expenseInfo[2].replace("-", " ");

    // Populate the list
    populatePayorList();

    // Start listening for tab key presses and trap focus
    document.addEventListener("keydown", initModifyPayorsModalTrapFocus);
}

// =================================
// 
// Button to open MODIFY PAYORS modal
//
// =================================
let addExpenseModalMemberListButton = document.getElementById("add-expense-modal-member-list-button");
addExpenseModalMemberListButton.addEventListener("click", () => {
    // Save info on Add Expense modal
    let expenseInfo = [];
    expenseInfo[0] = addExpenseModalTextField.value;
    expenseInfo[1] = addExpenseModalAmountNumField.value;
    expenseInfo[2] = addExpenseModalPayorsFilter.value;

    // Close this button's modal
    closeModal(addExpenseModalWrapper);
    document.removeEventListener("keydown", initAddExpenseModalTrapFocus);

    // Open the Modify Payors modal
    openModifyPayorsModal(expenseInfo);
});

// =================================
// 
// Function to populate payors list in  modal
//
// =================================
function populatePayorList() {
    console.log("Populating payor list...");
    
    // Get the member data and its length
    let memberData = getMemberData();
    let memberCount = memberData.members.length;

    // Get the parent element and clean it
    let payorList = document.getElementById("payor-list");
    payorList.innerHTML = "";

    // Populate!
    if (memberCount > 0) {
        memberData.members.forEach(addPayorOption)

        function addPayorOption(payorName) {
            console.log(`Adding option: ${payorName}`);

            // Clone the template
            let payorItemTemplate = document.getElementById("payor-checkbox-template");
            let newPayorItem = payorItemTemplate.content.cloneNode(true);

            // Populate this new option with our current data
            newPayorItem.querySelector(".payor-checkbox").id = payorName;
            newPayorItem.querySelector(".payor-checkbox").value = payorName;
            newPayorItem.querySelector(".payor-label").htmlFor = payorName;
            newPayorItem.querySelector(".payor-label").textContent = payorName;

            // Add to the list!
            payorList.appendChild(newPayorItem);
        }
    }
}

// =================================
// 
// Button to close MODIFY PAYORS modal
//
// =================================
var modifyPayorsModalCloseButton = document.getElementById("modify-payors-modal-close-button");
modifyPayorsModalCloseButton.addEventListener("click", () => {
    // Close this modal
    closeModal(modifyPayorsModalWrapper);
    document.removeEventListener("keydown", initModifyPayorsModalTrapFocus);
});

// =================================
// 
// Function to wrap trapFocus for ADD EXPENSE modal
//
// =================================
function initAddExpenseModalTrapFocus(event) {
    trapFocus(event, addExpenseModalWrapper);
}

// =================================
// 
// Function to wrap trapFocus for MODIFY PAYORS modal
//
// =================================
function initModifyPayorsModalTrapFocus(event) {
    trapFocus(event, modifyPayorsModalWrapper);
}