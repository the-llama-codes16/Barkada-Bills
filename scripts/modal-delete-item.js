// Script for Delete Item modal and Deleted Item modal

// Import da goods
import { setMemberData, trapFocus, closeModal } from "./reusable-functions.js";
import { itemManager } from "./classes/ItemManager.js";
import { getMemberData } from "./reusable-functions.js";
import { displayMembers } from "./main.js";

// =================================
// 
// DOM Queries 
//
// ================================= 
const deleteItemModalWrapper = document.getElementById("delete-item-modal-wrapper");
const deleteItemModalCancelButton = document.getElementById("delete-item-modal-cancel-button");
const deleteItemCategory = document.getElementById("delete-item-category");
const deleteItemName = document.getElementById("delete-item-name");

// =================================
// 
// Category names
//
// ================================= 
export const MEMBER_CATEGORY = "member";
export const EXPENSE_CATEGORY = "expense";

// =================================
// 
// Function to display DELETE ITEM modal
//
// =================================
export function openDeleteItemModal() {
    console.log("opening Delete Item Modal...");
    deleteItemModalWrapper.style.display = "block";

    // Display name and category
    deleteItemCategory.innerHTML = itemManager.getItemCategory();
    deleteItemName.innerHTML = itemManager.getItemName();

    // Set focus on Cancel button
    deleteItemModalCancelButton.focus();

    // Start listening for tab key presses and trap focus
    document.addEventListener("keydown", initDeleteItemModalTrapFocus);
}

// =================================
//
// Button to cancel DELETE ITEM modal
//
// =================================
deleteItemModalCancelButton.addEventListener("click", () => {
    // Close this modal
    closeModal(deleteItemModalWrapper);
    document.removeEventListener("keydown", initDeleteItemModalTrapFocus);

    // Clear data on current item selected
    itemManager.clearItemInfo();
});

// =================================
//
// Button to confirm DELETE ITEM modal
//
// =================================
const deleteItemModalYesButton = document.getElementById("delete-item-modal-yes-button");
deleteItemModalYesButton.addEventListener("click", () => {
    console.log(`Deleting ${itemManager.getItemName()}`);

    // Delete this item
    if (itemManager.getItemCategory() === MEMBER_CATEGORY) {
        deleteMember(itemManager.getItemName());
    }
    else {
        deleteExpense(itemManager.getItemName());
    }

    // Close this modal
    closeModal(deleteItemModalWrapper);
    document.removeEventListener("keydown", initDeleteItemModalTrapFocus);

    // Display members
    displayMembers();

    // Open the delete confirmation modal
    openDeletedItemModal();
});

// =================================
//
// Function to display DELETED ITEM modal
//
// =================================
const deletedItemModalWrapper = document.getElementById("deleted-item-modal-wrapper");
const deletedItemModalOKButton = document.getElementById("deleted-item-modal-ok-button");
function openDeletedItemModal() {
    // Set the details to be displayed
    const deletedItemName = document.getElementById("deleted-item-name");
    deletedItemName.textContent = itemManager.getItemName();
    const deletedCategoryName = document.getElementById("deleted-item-category");
    deletedCategoryName.textContent = itemManager.getItemCategory();

    // Display the modal
    deletedItemModalWrapper.style.display = "block";

    // Set focus on OK button
    deletedItemModalOKButton.focus();

    // Start listening for tab key presses and trap focus
    document.addEventListener("keydown", initDeletedItemModalTrapFocus); 
    
    // Clear data on current item selected
    itemManager.clearItemInfo();
}

// =================================
//
// Button to close DELETED ITEM modal
//
// =================================
deletedItemModalOKButton.addEventListener("click", () => {
    // Close the modal
    closeModal(deletedItemModalWrapper);

    // Stop listening for tab key presses
    document.removeEventListener("keydown", initDeletedItemModalTrapFocus);
    
    // Display members
    displayMembers();

});

// =================================
// 
// Function to delete member and its existence from expenses
//
// =================================
function deleteMember(memberName) {
    // Get the latest member names
    let memberData = getMemberData();

    // Locate the member and delete
    let memberLoc = memberData.members.indexOf(memberName);
    memberData.members.splice(memberLoc, 1);
    setMemberData(memberData);

    console.log("After deletion");
    console.log(memberData);

    // TODO: Delete the member from the expenses
}

// =================================
// 
// Function to delete expenses 
//
// =================================
function deleteExpense(expenseName) {
    console.log(`deleteExpense called for ${expenseName}`);
}

// =================================
// 
// Function to wrap trapFocus for DELETE ITEM modal
//
// =================================
function initDeleteItemModalTrapFocus(event) {
    trapFocus(event, deleteItemModalWrapper);
}

// =================================
// 
// Function to wrap trapFocus for DELETED ITEM modal
//
// =================================
function initDeletedItemModalTrapFocus(event) {
    trapFocus(event, deletedItemModalWrapper);
}