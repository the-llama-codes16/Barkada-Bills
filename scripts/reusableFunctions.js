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