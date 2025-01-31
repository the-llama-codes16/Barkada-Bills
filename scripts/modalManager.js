// Holds the activeModal variable and functions for modifying its value
// NOTE: With assistance from ChatGPT, since I had to ask about global variables

export let activeModal = null;

// =================================
// 
// Function to set/modify the active modal
//
// =================================
export function setActiveModal(modalId) {
    activeModal = modalId;
}

// =================================
// 
// Function to clear the active modal info 
//
// =================================
export function clearActiveModal() {
    activeModal = null;
}