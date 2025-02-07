// Main script for Main Expense Splitter Page
// Note: ChatGPT has been used to help with learning the language and with some specific issues/confusions encountered while coding, as allowed for the Final Project.
// However, the entire essence of the code is mine, and I took care that my use of ChatGPT is only as a helping tool, not replacing my work.

// Import da goods
import { openAddMemberModal } from "./modal-add-member.js";
import { openEditMemberModal } from "./modal-edit-member.js";
import { memberNameManager } from "./classes/MemberNameManager.js";
import { getMemberData, setMemberData } from "./reusable-functions.js";

// =================================
// 
// DOM Queries 
//
// ================================= 
var addMemberOpenButton = document.getElementById("add-member-open-button");

// =================================
// 
// Button to open ADD MEMBER modal
//
// =================================
addMemberOpenButton.addEventListener("click", () => {
    // Open the modal
    openAddMemberModal();
})

// =================================
// 
// Load the data on the tables as soon as this page is loaded
//
// =================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("in DOMload")
    displayMembers();
})

// =================================
// 
// Function to reload and display members on a table
//
// =================================
export function displayMembers() {
    console.log("displayMembers called!");

    // Get the existing data of member list or create it if inexistent
    const memberData = getMemberData();

    // Display if there is any
    let memberCount = memberData.members.length;

    if (memberCount > 0) {    
        // Display the table
        const memberTable = document.getElementById("member-table");
        memberTable.classList.add("table-header-visible");

        // Clean the table 
        let memberTableBody = memberTable.getElementsByTagName("tbody")[0];
        memberTableBody.innerHTML = "";

        // Display the total count
        const memberTotalCountString = document.getElementById("member-total-count-string");
        memberTotalCountString.classList.add("total-visible");
        const memberTotalCount = document.getElementById("member-total-count");
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
  }
  
  function editMember(memberRow) {
    let memberName = memberRow.querySelector(".member-name").textContent;
    console.log(`Edit Member button clicked for ${memberName}!`);

    // Save the original name
    memberNameManager.setOriginalMemberName(memberName);

    // Open Edit Member modal
    openEditMemberModal(memberName);
  }
  
  function deleteMember(memberRow) {
    let memberName = memberRow.querySelector(".member-name").textContent;
    console.log(`Delete Member button clicked for ${memberName}!`);
  }
