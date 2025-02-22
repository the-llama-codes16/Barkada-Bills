// Script for Add expense modal, New Expense Added modal

// Import da goods
import { getMemberData, trapFocus, closeModal, getExpenseData, setExpenseData, hasNameCaseInsensitive } from "./reusable-functions.js";
import { originalExpenseInfo, currentExpenseInfo, temporaryExpenseInfo } from "./classes/ExpenseInfo.js";
import { openDoYouWantToCancelModal } from "./modal-confirm-cancel.js";
import { ModalManager, modalManager } from "./classes/ModalManager.js";
import { addExpenseOpenButton } from "./main.js";

// =================================
// 
// DOM Queries 
//
// =================================
let addExpenseModalWrapper = document.getElementById("add-expense-modal-wrapper");
let addExpenseModalTextField = document.getElementById("add-expense-modal-text-field");
let addExpenseModalAmountNumField = document.getElementById("add-expense-modal-amount-num-field");
let addExpenseModalPayorsFilter = document.getElementById("add-expense-modal-payors-filter");
let addExpenseModalMemberListButton = document.getElementById("add-expense-modal-member-list-button");
let addExpenseModalErrorMsg = document.getElementById("add-expense-modal-error-message");
let addExpenseModalCloseButton = document.getElementById("add-expense-modal-close-button");

// =================================
// 
// Function to display ADD EXPENSE modal
//
// =================================

export function openAddExpenseModal(expenseInfo) {
    console.log("Opening Add Expense modal...");

    addExpenseModalWrapper.style.display = "block";

    // Prepare the fields
    addExpenseModalTextField.value = expenseInfo.getExpenseName();
    addExpenseModalAmountNumField.value = expenseInfo.getExpenseAmount();
    addExpenseModalPayorsFilter.value = expenseInfo.getExpenseFilter();

    // Enable Member List button if there is at least one member
    enableDisableMemberListButton();

    // Set focus on Name field
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
// Function to restrict input of Amount field
//
// =================================
function restrictNumCharInput(event) {
    console.log("Restricting input in Amount field!");

    // Don't bother if no key is detected
    if (event.key == null) {
        return;
    }

    // Do not allow if input is invalid
    if (!/^\d$/.test(event.key) && event.key !== "Backspace" && event.key !== "." && event.key !== "Tab") {
        event.preventDefault();
        console.log(`Skipped ${event.key}`);
    }
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
// Behavior of Member List button according to Filter
//
// =================================
addExpenseModalPayorsFilter.addEventListener("change", () => {
    enableDisableMemberListButton();
});

// =================================
// 
// Function to enable/disable Member List button according to Filter
//
// =================================
function enableDisableMemberListButton() {
    // Hide this button if the selected filter is All
    if (addExpenseModalPayorsFilter.value === "all") {
        addExpenseModalMemberListButton.style.visibility = "hidden";
    }
    else {
        addExpenseModalMemberListButton.style.visibility = "visible";
    }

    // Disable this button if there are no available members
    let memberData = getMemberData();
    if (memberData.members.length > 0) {
        addExpenseModalMemberListButton.disabled = false;
        addExpenseModalMemberListButton.title = "";
    }
    else {
        addExpenseModalMemberListButton.disabled = true;
        addExpenseModalMemberListButton.title = "No members to display. Please add members in Step 1 first."
    }
}

// =================================
// 
// Button to close ADD EXPENSE modal
//
// =================================
addExpenseModalCloseButton.addEventListener("click", () => {
    closeAddExpenseModal();
});

// =================================
// 
// Function to close ADD EXPENSE modal
//
// =================================
function closeAddExpenseModal() {
    // Record current input
    recordInputAddExpenseModal();

    // Selected members must be set when closing MODIFY PAYORS modal

    // Check original info for changes
    let isEqual = originalExpenseInfo.isEqual(currentExpenseInfo);

    // Close this modal
    closeModal(addExpenseModalWrapper);
    document.removeEventListener("keydown", initAddExpenseModalTrapFocus);

    // Display Confirm Cancel dialog if necessary
    if (!isEqual) {
        // Save this as the current dialog
        modalManager.setActiveModalInfo(openAddExpenseModal, currentExpenseInfo);
        
        // Open the Cancel Confirmation modal
        openDoYouWantToCancelModal();
    }
    else {
        // Return focus to the Add Expense button
        addExpenseOpenButton.focus();
    }
}

// =================================
/**
 * Submit ADD EXPENSE modal
*/
// =================================
let addExpenseModalForm = document.getElementById("add-expense-modal-form");
addExpenseModalForm.addEventListener("submit", (event) => {
    submitAddExpenseModal(event);
});

// =================================
/**
 * Function to submit ADD EXPENSE modal
*/
// =================================
function submitAddExpenseModal(event) {
    // Prevent refresh
    event.preventDefault();

    // Record the current input
    recordInputAddExpenseModal();

    // Get the existing data of expenses or create if inexistent
    let expenseData = getExpenseData();
    let expenseNames = Object.keys(expenseData.expenses);

    // Check if expense name is not just whitespace
    let expenseName = currentExpenseInfo.getExpenseName();
    if (expenseName) {
        // Check if name already exists, case insensitive
        if (hasNameCaseInsensitive(expenseNames, expenseName)) {
            console.log(`Expense name already exists: ${expenseName}`);
            addExpenseModalErrorMsg.textContent = "Expense name already exists.";
            addExpenseModalErrorMsg.classList.add("error-visible");

            // Set focus back to name field
            addExpenseModalTextField.focus();
            return;
        }
    }
    else {
        // Raise error
        addExpenseModalErrorMsg.textContent = "Name must be at least 1 character.";
        addExpenseModalErrorMsg.classList.add("error-visible");

        // Set focus back again to the Name field 
        addExpenseModalTextField.focus();
        return;
    }

    // Check if expense amount is not just whitespace or zero
    let expenseAmount = currentExpenseInfo.getExpenseAmount();
    if ((expenseAmount && Number(expenseAmount) == 0) || !expenseAmount) {
        // Raise error
        console.log(`Amount: ${expenseAmount}`);
        addExpenseModalErrorMsg.textContent = "Amount must be greater than 0.";
        addExpenseModalErrorMsg.classList.add("error-visible");

        // Set focus back again to the Amount field 
        addExpenseModalAmountNumField.focus();
        return;
    }

    // Check for appropriate member count for the filter
    // NOTE: Removing this validation check since user can create an expense and delete all members from Step 1 anyway
    let expenseMembers = currentExpenseInfo.getExpenseMembers();
    // let expenseMemberCount = expenseMembers.length;
    let expenseFilter = currentExpenseInfo.getExpenseFilter();
    // if (expenseFilter != "all" && expenseMemberCount === 0) {
    //     // Raise error
    //     console.log(`${expenseFilter}: ${expenseMemberCount}`);
    //     addExpenseModalErrorMsg.textContent = "Select at least one member.";
    //     addExpenseModalErrorMsg.classList.add("error-visible");

    //     // Set focus back again to the Member list button
    //     addExpenseModalMemberListButton.focus();
    //     return;
    // }

    // If we made it here, add the expense
    expenseData.expenses[expenseName] = { "amount": Number(expenseAmount), "filter": expenseFilter, "members": expenseMembers};
    console.log("Updated expenseData variable:");
    console.log(expenseData);
    setExpenseData(expenseData);
    console.log(getExpenseData());

    // Close the modal
    closeModal(addExpenseModalWrapper);
    document.removeEventListener("keydown", initAddExpenseModalTrapFocus);
}

// =================================
/**
 * Function to record current input in ADD EXPENSE modal
*/
// =================================
function recordInputAddExpenseModal() {
    currentExpenseInfo.setExpenseName(addExpenseModalTextField.value.trim());
    currentExpenseInfo.setExpenseAmount(addExpenseModalAmountNumField.value.trim());
    currentExpenseInfo.setExpenseFilter(addExpenseModalPayorsFilter.value);
}

// =================================
// 
// Button to display MODIFY PAYORS modal
//
// =================================
addExpenseModalMemberListButton.addEventListener("click", () => {
    openModifyPayorsModal(currentExpenseInfo);
});

// =================================
// 
// Function to display MODIFY PAYORS modal
//
// =================================
let modifyPayorsModalWrapper = document.getElementById("modify-payors-modal-wrapper");
function openModifyPayorsModal(expenseInfo) {
    // Save the existing entries
    currentExpenseInfo.setExpenseName(document.getElementById("add-expense-modal-text-field").value);
    currentExpenseInfo.setExpenseAmount(document.getElementById("add-expense-modal-amount-num-field").value);
    currentExpenseInfo.setExpenseFilter(document.getElementById("add-expense-modal-payors-filter").value);

    // Close the ADD EXPENSE modal
    closeModal(addExpenseModalWrapper);
    document.removeEventListener("keydown", initAddExpenseModalTrapFocus);

    // Open the MODIFY PAYORS modal
    modifyPayorsModalWrapper.style.display = "block";
    document.addEventListener("keydown", initModifyPayorsModalTrapFocus);

    // Update the missing entries, use default placeholders for missing entries
    document.getElementById("modify-payors-modal-expense-amount").textContent = currentExpenseInfo.getExpenseAmount() || "0";
    document.getElementById("modify-payors-modal-expense-name").textContent = currentExpenseInfo.getExpenseName() || "unnamed item"
    document.getElementById("modify-payors-modal-expense-filter").textContent = currentExpenseInfo.getExpenseFilter().replace("-", " ");

    // Populate the payors list
    populatePayorList();

    // Update selected payors if applicable
    updateCheckedStatusPayors(expenseInfo.getExpenseMembers());
}

// =================================
// 
// Function to populate members list in MODIFY PAYORS modal
//
// =================================
let payorList = document.getElementById("payor-list");
function populatePayorList() {
    console.log("Populating payor list...");

    // Get the member data and its length
    let memberData = getMemberData();
    let memberCount = memberData.members.length;

    // Get the parent element and clean it
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
            let newItemCheckbox = newPayorItem.querySelector(".payor-checkbox");
            let newItemLabel = newPayorItem.querySelector(".payor-label");
            newItemCheckbox.id = payorName;
            newItemCheckbox.value = payorName;
            newItemLabel.htmlFor = payorName;
            newItemLabel.textContent = payorName;

            // Add its event listener
            newItemCheckbox.addEventListener("click", () => {
                updateSelectUnselectCheckbox();
            });

            // Add to the list!
            payorList.appendChild(newPayorItem);
        }
    }
}

// =================================
// 
// Function to update checked status of members in MODIFY PAYORS modal
//
// =================================
function updateCheckedStatusPayors(selectedPayors) {
    console.log("Selecting applicable payors...");

    // Get all the payor checkboxes
    let payorCheckboxes = payorList.querySelectorAll(".payor-checkbox");

    // Select member if applicable
    payorCheckboxes.forEach(selectPayors);
    function selectPayors(payorCheckbox) {
        if (selectedPayors.includes(payorCheckbox.value)) {
            payorCheckbox.checked = true;
        }
    }

    updateSelectUnselectCheckbox();
}

// =================================
// 
// Checkbox to SELECT/DESELECT ALL PAYORS
//
// =================================
let modifyPayorsModalSelectAllCheckbox = document.getElementById("modify-payors-modal-select-all-checkbox");
modifyPayorsModalSelectAllCheckbox.addEventListener("click", () => {
    selectUnselectAllPayors();
});

// =================================
// 
// Function to SELECT/DESELECT ALL PAYORS
//
// =================================
function selectUnselectAllPayors() {
    console.log("Selecting/unselecting all!");

    // Get all the payor checkboxes
    let payorCheckboxes = payorList.querySelectorAll(".payor-checkbox");

    // Get the previous state of this checkbox
    let isAllChecked = modifyPayorsModalSelectAllCheckbox.checked;

    // Check/uncheck all items as applicable
    payorCheckboxes.forEach(checkUncheckAllItems);
    function checkUncheckAllItems(item) {
        console.log(`Updating ${item}`);
        item.checked = isAllChecked;
    }
}

// =================================
// 
// Function to update SELECT/DESELECT ALL PAYORS checkbox based on status of payor checkboxes
//
// =================================
function updateSelectUnselectCheckbox() {
    console.log("Checking if All checkbox has to be updated...");

    // Get all payor checkboxes
    let payorCheckboxes = payorList.querySelectorAll(".payor-checkbox");
    let allItemsChecked = true;

    // Check if all checkboxes have the same status, update the All checkbox if applicable
    payorCheckboxes.forEach(checkAllCheckboxStatus);
    function checkAllCheckboxStatus(payorCheckbox) {
        if (!payorCheckbox.checked) {
            allItemsChecked = false;
        }
    }

    console.log("Updating All Checkbox...");
    modifyPayorsModalSelectAllCheckbox.checked = allItemsChecked;
}

// =================================
// 
// Button to close MODIFY PAYORS modal
//
// =================================
let modifyPayorsModalCloseButton = document.getElementById("modify-payors-modal-close-button");
modifyPayorsModalCloseButton.addEventListener("click", () => {
    closeModifyPayorsModal();
});

// =================================
/**
 * Function to close MODIFY PAYORS modal
 */
// =================================
function closeModifyPayorsModal() {
    // Record current entries
    temporaryExpenseInfo.setExpenseMembers(getSelectedPayors());

    // Compare with previous entries
    let isPayorsEqual = currentExpenseInfo.isExpenseMembersEqual(temporaryExpenseInfo);

    // Close this modal
    closeModal(modifyPayorsModalWrapper);
    document.removeEventListener("keydown", initModifyPayorsModalTrapFocus);

    // Display Confirm Cancel dialog if necessary
    if (!isPayorsEqual) {
        // Save this as the current dialog
        modalManager.setActiveModalInfo(openModifyPayorsModal, temporaryExpenseInfo, openAddExpenseModal, currentExpenseInfo);
        
        // Open the Cancel Confirmation modal
        openDoYouWantToCancelModal();
    }
    else {
        // Open Add Expense modal
        openAddExpenseModal(currentExpenseInfo);
    }
}

// =================================
/**
 * Submit MODIFY PAYORS modal
*/
// =================================
var modifyPayorsModalOKButton = document.getElementById("modify-payors-modal-ok-button");
modifyPayorsModalOKButton.addEventListener("click", () => {
    submitModifyPayorsModal();
});

// =================================
/**
 * Function to submit MODIFY PAYORS modal
*/
// =================================
function submitModifyPayorsModal() {
    console.log("Closing modify payors modal...");

    // Get selected payors
    let selectedPayors = getSelectedPayors();

    // Save the data
    currentExpenseInfo.setExpenseMembers(selectedPayors);

    // Close this dialog
    closeModal(modifyPayorsModalWrapper);
    document.removeEventListener("keydown", initModifyPayorsModalTrapFocus);

    // Open the Add Expense dialog
    addExpenseModalWrapper.style.display = "block";
    document.addEventListener("keydown", initAddExpenseModalTrapFocus);
}

// =================================
/**
 * Function to get selected members in MODIFY PAYORS modal
 * @returns {selectedPayorNames} The list of the names of selected payors
*/
// =================================
function getSelectedPayors() {
    // Get all the payor checkboxes
    let payorCheckboxes = payorList.querySelectorAll(".payor-checkbox");

    let selectedPayorNames = [];

    // Record the names of the selected checkboxes
    payorCheckboxes.forEach(getSelectedPayorNames);
    function getSelectedPayorNames(payorCheckbox) {
        if (payorCheckbox.checked) {
            selectedPayorNames.push(payorCheckbox.value);
        }
    }

    return selectedPayorNames;
}












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