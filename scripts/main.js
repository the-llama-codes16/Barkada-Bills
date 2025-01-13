// Add member modal script
var openMemberModalButton = document.getElementById("open-add-member-button")
var addMemberModal = document.getElementById("add-member-modal")
var closeMemberModalButton = document.getElementById("close-add-member-modal-button")
var addMemberModalButton = document.getElementById("add-member-modal-button")


// Learned about modals from w3schools.com. Code might be slightly similar as my use case is the same as with their example.s
openMemberModalButton.addEventListener("click", () => {
    openModal(addMemberModal);
})
closeMemberModalButton.addEventListener("click", () => {
    closeModal(addMemberModal);
})
addMemberModalButton.addEventListener("click", () => {
    closeModal(addMemberModal);
})


// Functions
function closeModal(targetModal) {
    console.log("closing")
    targetModal.style.display = "none";
}

function openModal(targetModal) {
    console.log("opening")
    targetModal.style.display = "block";
}



//Note: Check here for text limit as well even tho maxlength has been set on the text input


