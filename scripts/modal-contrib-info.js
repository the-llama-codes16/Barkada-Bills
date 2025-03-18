// Script for Contribution Info modal

// Import da goods
import { contribInfo } from "./classes/ContribInfo.js";
import { closeModal, trapFocus } from "./reusable-functions.js";

// =================================
/**
 * DOM Queries
*/
// =================================
let contribInfoModalWrapper = document.getElementById("contrib-info-modal-wrapper");
let contribInfoName = document.getElementById("contrib-info-name");
let contribInfoAmount = document.getElementById("contrib-info-amount");
let contribInfoBasic = document.getElementById("contrib-info-basic");
let contribBreakdownTable = document.getElementById("contrib-breakdown-table");

// =================================
/**
 * Function to display CONTRIB INFO modal
*/
// =================================
export function openContribInfoModal(memberName, totalAmount) {
    console.log(`Displaying Contribution info for ${memberName}...`);

    // Fill up the basic fields
    contribInfoName.textContent = memberName;
    contribInfoAmount.textContent = totalAmount;
    contribInfoBasic.style.display = "block"

    // Populate the expense breakdown table
    let memberContribData = contribInfo.getContribInfo()[memberName];
    let expenseItems = Object.keys(memberContribData);

    let contribBreakdownTableBody = contribBreakdownTable.getElementsByTagName("tbody")[0];
    contribBreakdownTableBody.innerHTML = "";

    if (expenseItems.length > 0) {
        contribBreakdownTable.style.display = "block";
        expenseItems.forEach(addExpenseItem);
        function addExpenseItem(expenseName) {
            console.log(`Adding contrib for: ${expenseName}`);

            // Clone the template
            let contribInfoRowTemplate = document.getElementById("contrib-info-row-template");
            let newContribInfoRow = contribInfoRowTemplate.content.cloneNode(true);

            // Populate our new row with the current contrib data
            newContribInfoRow.querySelector(".contrib-info-expense-name").textContent = expenseName;
            newContribInfoRow.querySelector(".contrib-info-expense-amount").textContent = memberContribData[expenseName];

            // Add this to the table!
            contribBreakdownTableBody.appendChild(newContribInfoRow);
        }
    }
    else {
        contribBreakdownTable.style.display = "none";
    }

    contribInfoModalWrapper.style.display = "block";

    // Trap focus to this modal
    document.addEventListener("keydown", initcontribInfoModalTrapFocus);
}

// =================================
/**
 * Button to close CONTRIB INFO modal
*/
// =================================
let contribInfoModalOKButton = document.getElementById("contrib-info-modal-ok-button");
contribInfoModalOKButton.addEventListener("click", () => {
    closeContribInfoModal();
});

// =================================
/**
 * Function to close CONTRIB INFO modal
*/
// =================================
function closeContribInfoModal() {
    closeModal(contribInfoModalWrapper);
    document.removeEventListener("keydown", initcontribInfoModalTrapFocus);
}

// =================================
/**
 * Function to wrap trapFocus for NEW EXPENSE PAYORS modal
*/
// =================================
function initcontribInfoModalTrapFocus(event) {
    trapFocus(event, contribInfoModalWrapper);
}