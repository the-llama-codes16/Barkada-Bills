// Add member modal script
var openMemberModalButton = document.getElementById("open-add-member-button")
var addMemberModal = document.getElementById("add-member-modal")
var closeMemberModalButton = document.getElementById("close-add-member-modal-button")
var addMemberModalButton = document.getElementById("add-member-modal-button")


// Functions
function closeModal(targetModal) {
    console.log("closing")
    targetModal.style.display = "none";
}

function openModal(targetModal) {
    console.log("opening")
    targetModal.style.display = "block";
}


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
// document.addEventListener("click", function(event) {
//     if (!addMemberModal.contains(event.target)) {
//         closeModal(addMemberModal);
//     }
// })


