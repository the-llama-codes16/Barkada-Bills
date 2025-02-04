// Reusable Functions

// =================================
// 
// Function to close modal
//
// =================================
export function closeModal(targetModal) {
  console.log("closing...")
  targetModal.style.display = "none";
}

// =================================
// 
// Function to check if key exists in a dictionary, case insensitive
//
// =================================
export function hasKeyCaseInsensitive(dictionary, targetKey) {
  console.log("checking if key exists, case insensitive...");
  const targetKeyLower = targetKey.toLowerCase();
  for (let key in dictionary) {
      if (String(key).toLowerCase() === targetKeyLower) {
          return true;
      }
  }
  return false;
}

// =================================
// 
// Function to trap focus in a given modal
//
// =================================
export function trapFocus(event, modal) {
  console.log("trapfocus called!")

  // Don't bother if no key is detected
  if (event.key == null) {
    return;
  }

  // Check if the key pressed is the Tab key
  const isTabPressed = event.key === `Tab` || event.keyCode === 9;
  if (!isTabPressed) {
    return;
  }

  // Get the modal and its focusable elements
  const focusableElements = `button, input, [tabindex]:not([tabindex="-1"])`;
  const focusableContent = modal.querySelectorAll(focusableElements);
  const firstFocusableElement = focusableContent[0];
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  if (event.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus();
      event.preventDefault();
    }
  } 
  else if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus();
      event.preventDefault();
  }
}

// =================================
// 
// Function to reload and display members on a table
//
// =================================
export function displayMembers() {
  console.log("displayMembers called!");

  // Get the existing data of member list or create it if inexistent
  const memberDict = JSON.parse(sessionStorage.getItem("members")) || {};
  console.log(`memberDict ==== ${memberDict}`);

  // Display if there is any
  let memberCount = Object.keys(memberDict).length;

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

    for (let memberName in memberDict) {
      console.log(`memberName: ${memberName}`);

      // Clone the template
      let memberRowTemplate = document.getElementById("member-row-template");
      let newMemberRow = memberRowTemplate.content.cloneNode(true);

      // Populate our new row with the current member data
      newMemberRow.querySelector(".member-name").textContent = memberName;

      // Add event listeners for this row's buttons
      newMemberRow.querySelector(".member-edit-button").addEventListener("click", () => {
        editMember(memberName);
      });
      newMemberRow.querySelector(".member-delete-button").addEventListener("click", () => {
        deleteMember(memberName);
      })

      // Add this to the table!
      memberTableBody.appendChild(newMemberRow);
    }
  }
}

function editMember(memberName) {
  console.log(`Edit Member button clicked for ${memberName}!`);
}

function deleteMember(memberName) {
  console.log(`Delete Member button clicked for ${memberName}!`);
}
