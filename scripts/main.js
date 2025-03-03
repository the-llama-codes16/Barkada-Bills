// Main script for Main Expense Splitter Page
// Note: ChatGPT has been used to help with learning the language and with some specific issues/confusions encountered while coding, as allowed for the Final Project.
// However, the entire essence of the code is mine, and I took care that my use of ChatGPT is only as a helping tool, not replacing my work.

// Import da goods
import { openAddMemberModal } from "./modal-add-member.js";
import { openEditMemberModal } from "./modal-edit-member.js";
import { itemManager } from "./classes/ItemManager.js";
import { getMemberData, getExpenseData, capitalizeFirstletter, trapFocus, closeModal } from "./reusable-functions.js";
import { MEMBER_CATEGORY, openDeleteItemModal } from "./modal-delete-item.js";
import { openAddExpenseModal } from "./modal-add-expense.js";
import { currentExpenseInfo, originalExpenseInfo, ExpenseInfo } from "./classes/ExpenseInfo.js";
// import { openEditExpenseModal } from "./modal-edit-expense-test.js";
// =================================
/**
 * DOM Queries
*/
// =================================
export var addMemberOpenButton = document.getElementById("add-member-open-button");
export var addExpenseOpenButton = document.getElementById("add-expense-open-button");

// =================================
/**
 * Button to open ADD MEMBER modal
*/
// =================================
addMemberOpenButton.addEventListener("click", () => {
    // Open the modal
    openAddMemberModal();
})

// =================================
/**
 * Load the data on the tables as soon as this page is loaded
*/
// =================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("in DOMload")
    displayMembers();
    displayExpenses();
})

// =================================
/**
 * Function to reload and display members on a table
*/
// =================================
export function displayMembers() {
    console.log("displayMembers called!");

    // Get the existing data of member list
    const memberData = getMemberData();

    // Display if there is any
    let memberCount = memberData.members.length;
    console.log(`COUNT: ${memberCount}`);

    // Prepare the elements to be accessed
    const memberTable = document.getElementById("member-table");
    const memberTotalCountString = document.getElementById("member-total-count-string");
    const memberTotalCount = document.getElementById("member-total-count");

    // Clean the table
    let memberTableBody = memberTable.getElementsByTagName("tbody")[0];
    memberTableBody.innerHTML = "";

    if (memberCount > 0) {    
        // Display the table
        memberTable.classList.add("table-header-visible");

        // Clean the table 
        memberTableBody.innerHTML = "";
        
        // Display the total count
        memberTotalCountString.classList.add("total-visible");
        memberTotalCount.textContent = String(memberCount);

        // Update the table to display the names
        memberData.members.forEach(updateTableRow);

        function updateTableRow(memberName) {
            console.log(`memberName: ${memberName}`);

            // Clone the template
            let memberRowTemplate = document.getElementById("member-row-template");
            let newMemberRow = memberRowTemplate.content.cloneNode(true);

            // Populate our new row with the current member data
            newMemberRow.querySelector(".member-name").textContent = memberName;

            // Add event listeners for this row's buttons
            newMemberRow.querySelector(".member-edit-button").addEventListener("click", (event) => {
                let rowRef = event.currentTarget.closest("tr");
                editMember(rowRef);
            });
            newMemberRow.querySelector(".member-delete-button").addEventListener("click", (event) => {
                let rowRef = event.currentTarget.closest("tr");
                deleteMember(rowRef);
            });

            // Add this to the table!
            memberTableBody.appendChild(newMemberRow);
        }
    }
    else {
        // Ensure that the table and other related elements are not displayed
        memberTable.classList.remove("table-header-visible");
        memberTotalCountString.classList.remove("total-visible");
        memberTotalCount.textContent = String(memberCount);
    }
}

// =================================
/**
 * Function to edit a member name
*/
// =================================
function editMember(memberRow) {
    let memberName = memberRow.querySelector(".member-name").textContent;
    console.log(`Edit Member button clicked for ${memberName}!`);

    // Save the original name
    itemManager.setItemName(memberName);

    // Open Edit Member modal
    openEditMemberModal([memberName]);
}

// =================================
/**
 * Function to delete a member
*/
// =================================
function deleteMember(memberRow) {
    let memberName = memberRow.querySelector(".member-name").textContent;
    console.log(`Delete Member button clicked for ${memberName}!`);

    // Save the member data
    itemManager.setItemName(memberName);
    itemManager.setItemCategory(MEMBER_CATEGORY);

    // Open Delete Member modal
    openDeleteItemModal();
}

// =================================
/**
 * Button to open ADD EXPENSE modal
*/
// =================================
export var addExpenseModalHeaderInstruction = document.getElementById("add-expense-modal-header-instruction");
export var newExpenseModalHeaderInstruction = document.getElementById("new-expense-modal-header-instruction");

addExpenseOpenButton.addEventListener("click", () => {
    // Provide a clean slate to the Add Expense modal
    originalExpenseInfo.clearExpenseInfo();
    currentExpenseInfo.clearExpenseInfo();

    // Update header instructions
    addExpenseModalHeaderInstruction.innerHTML = "Add expense";
    newExpenseModalHeaderInstruction.innerHTML = "Expense added"

    openAddExpenseModal(originalExpenseInfo);
});

// =================================
/**
 * Function to reload and display expenses on a table
*/
// =================================
export function displayExpenses() {
    // Get the data on expenses
    let expenseData = getExpenseData();

    // Display if there is any
    let expenseCount = Object.keys(expenseData.expenses).length;
    console.log(`EXPENSE COUNT: ${expenseCount}`);

    // Prepare the elements to be accessed
    const expenseTable = document.getElementById("expense-table");
    const expenseTotalCountString = document.getElementById("expense-total-count-string");
    const expenseTotalCount = document.getElementById("expense-total-count");

    // Clean the table
    let expenseTableBody = expenseTable.getElementsByTagName("tbody")[0];
    expenseTableBody.innerHTML = "";

    if (expenseCount > 0) {    
        // Display the table
        expenseTable.classList.add("table-header-visible");

        // Display the total count
        expenseTotalCountString.classList.add("total-visible");
        expenseTotalCount.textContent = String(expenseCount);

        // Update the table to display the expenses
        let expenseNames = Object.keys(expenseData.expenses)
        expenseNames.forEach(updateExpenseTableRow)

        function updateExpenseTableRow(expenseName) {
            console.log(`expense Name: ${expenseName}`);

            let expenseAmount = expenseData.expenses[expenseName]["amount"];
            let expenseFilter = expenseData.expenses[expenseName]["filter"];
            let expenseMembers = expenseData.expenses[expenseName]["members"];

            // Clone the template
            let expenseRowTemplate = document.getElementById("expense-row-template");
            let newExpenseRow = expenseRowTemplate.content.cloneNode(true);

            // Populate our new row with the current expense data
            newExpenseRow.querySelector(".expense-name").textContent = expenseName;
            newExpenseRow.querySelector(".expense-amount").textContent = String(expenseAmount);
            newExpenseRow.querySelector(".expense-contributors-filter").textContent = capitalizeFirstletter(expenseFilter.replace("-", " "));

            // Update visibility and availability status of Member list button accordingly
            let expenseMemberListButton = newExpenseRow.querySelector(".expense-member-list-button");
            if (expenseFilter === "all") {
                expenseMemberListButton.style.visibility = "hidden";
            }
            else {
                expenseMemberListButton.style.visibility = "visible";

                // Disable this button if there are no selected members
                if (expenseMembers.length > 0) {
                    expenseMemberListButton.disabled = false;
                    expenseMemberListButton.title = "";
                }
                else {
                    expenseMemberListButton.disabled = true;
                    expenseMemberListButton.title = "No members selected. You may add members for this expense using the Edit feature."
                }
            }

            // Add event listeners for this row's buttons
            expenseMemberListButton.addEventListener("click", () => {
                console.log(`Member List button clicked for ${expenseName}!`);
                openExpensePayorsModal(expenseName, expenseAmount, expenseFilter, expenseMembers);
            });

            newExpenseRow.querySelector(".expense-edit-button").addEventListener("click", () => {
                console.log(`Edit expense button clicked for ${expenseName}!`);
                openEditExpenseModal(expenseName, expenseAmount, expenseFilter, expenseMembers);
            });

            newExpenseRow.querySelector(".expense-delete-button").addEventListener("click", () => {
                console.log(`Delete expense button clicked for ${expenseName}!`);
            });

            // Add this to the table
            expenseTableBody.appendChild(newExpenseRow);
        }
    }
    else {
        // Ensure that the table and other related elements are not displayed
        expenseTable.classList.remove("table-header-visible");
        expenseTotalCountString.classList.remove("total-visible");
        expenseTotalCount.textContent = String(expenseTotalCount);
    }
} 

// =================================
/**
 * Function to display modal to VIEW EXPENSE PAYORS
*/
// =================================
let expensePayorsModalWrapper = document.getElementById("expense-payors-modal-wrapper");
function openExpensePayorsModal(expenseName, expenseAmount, expenseFilter, expenseMembers) {
    // Get the list and clean it
    let expensePayorsList = document.getElementById("expense-payor-list");
    expensePayorsList.innerHTML = "";

    // Get the template for payors
    let expensePayorItemTemplate = document.getElementById("new-expense-payor-template");

    // Populate the list with the official payors
    console.log("Payors:");
    console.log(expenseMembers);
    expenseMembers.forEach(addExpensePayor);
    function addExpensePayor(payorName){
        let expensePayorItem = expensePayorItemTemplate.content.cloneNode(true);
        let expensePayorListItem = expensePayorItem.querySelector(".new-expense-payor");
        expensePayorListItem.textContent = payorName;
        expensePayorsList.appendChild(expensePayorItem);
    }

    // Update the missing entries, use default placeholders for missing entries
    document.getElementById("expense-payors-modal-expense-amount").textContent = expenseAmount || "0";
    document.getElementById("expense-payors-modal-expense-name").textContent = expenseName;
    document.getElementById("expense-payors-modal-expense-filter").textContent = expenseFilter.replace("-", " ");
    
    // Open this modal
    expensePayorsModalWrapper.style.display = "block";
    document.addEventListener("keydown", initExpensePayorsModalTrapFocus);
}

// =================================
/**
 * Button to close modal to VIEW EXPENSE PAYORS
*/
// =================================
var expensePayorsModalOKButton = document.getElementById("expense-payors-modal-ok-button");
expensePayorsModalOKButton.addEventListener("click", () => {
    closeExpensePayorsModal();
});

// =================================
/**
 * Function to close modal to VIEW EXPENSE PAYORS
*/
// =================================
function closeExpensePayorsModal() {
    // Close this modal
    closeModal(expensePayorsModalWrapper);
    document.removeEventListener("keydown", initExpensePayorsModalTrapFocus);
}

// =================================
/**
 * Function to display modal to EDIT EXPENSE
*/
// =================================
function openEditExpenseModal(expenseName, expenseAmount, expenseFilter, expenseMembers) {
    // Reuse the modals for ADD NEW EXPENSE by plugging in the info as a new ExpenseInfo object
    originalExpenseInfo.setExpenseName(expenseName);
    originalExpenseInfo.setExpenseFilter(expenseFilter);
    originalExpenseInfo.setExpenseAmount(String(expenseAmount));
    originalExpenseInfo.setExpenseMembers(expenseMembers);

    // Rename the modal headers accordingly
    addExpenseModalHeaderInstruction.innerHTML = "Edit expense";
    newExpenseModalHeaderInstruction.innerHTML = "Expense edited";

    // Open the expense info modal
    currentExpenseInfo.clearExpenseInfo();
    openAddExpenseModal(originalExpenseInfo);
}   

// =================================
/**
 * Function to wrap trapFocus to view EXPENSE PAYORS modal
*/
// =================================
function initExpensePayorsModalTrapFocus(event) {
    trapFocus(event, expensePayorsModalWrapper);
}
