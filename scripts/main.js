// ADD MEMBER modal script
var openMemberModalButton = document.getElementById("open-add-member-button")
var addMemberModal = document.getElementById("add-member-modal")
var closeMemberModalButton = document.getElementById("close-add-member-modal-button")
// var addMemberModalButton = document.getElementById("add-member-modal-button")
var addMemberTextField = document.getElementById("member-name")
var addMemberForm = document.getElementById("add-member-form")


// TODO: FOCUS TRAPPING!
// Focus trapping for the Add Member modal
const focusableElementsAddMemberModal = addMemberModal.querySelectorAll(
    "input, button"
);
const firstElementAddMemberModal = focusableElementsAddMemberModal[0];
const lastElementAddMemberModal = focusableElementsAddMemberModal[focusableElementsAddMemberModal.length - 1];

// Note: This part of the code has AI assistance
addMemberForm.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
        if (event.shiftKey) {
            // Shift + Tab: Navigate backward
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus(); // Loop back to the last element
            }
        } else {
            // Tab: Navigate forward
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus(); // Loop back to the first element
            }
        }
    }
});

openMemberModalButton.addEventListener("click", () => {
    // Open the modal
    console.log("opening")
    addMemberModal.style.display = "block";

    // Ensure that text field is empty and set focus on it
    addMemberTextField.value = "";
    addMemberTextField.focus();
})
closeMemberModalButton.addEventListener("click", (event) => {
    closeModal(addMemberModal);
})
addMemberForm.addEventListener("submit", (event) => {
    // Prevent refresh
    event.preventDefault();

    // Add the member
    const name = String(document.getElementById("member-name").value);
    console.log(name);

    // Get the existing data of member list or create it if inexistent
    const memberDict = JSON.parse(sessionStorage.getItem("members")) || {};

    // Check if the name already exists
    if (name in memberDict) {
        console.log(`Member name already exists: ${name}`)

        // TODO: Raise a message here that name already exists then return
    }

    // Validate and add the name
    memberDict[name] = {};
    sessionStorage.setItem("members", JSON.stringify(memberDict));
    console.log(memberDict);
    // sessionStorage.clear();

    // Close
    closeModal(addMemberModal);
})

function closeModal(targetModal) {
    console.log("closing")
    targetModal.style.display = "none";
}

// Note: Check here for text limit as well even tho maxlength has been set on the text input


