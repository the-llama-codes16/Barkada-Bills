// This ModalManager class is used to keep track of the function that opens the calling modal
// The calling modal is the modal that calls the Confirm Cancel modal, 
// which happens when a modal's Cancel button is clicked and the user has unsaved changes


export class ModalManager {
    constructor() {
        // The function that opens the modal
        this.activeModalOpeningFunction = null;
        // The list of parameters for the opening function
        this.activeModalOpeningFunctionParams = null;
        // The function that opens the parent modal of this modal
        this.parentModalOpeningFunction = null;
        // The list of parameters for the opening function of the parent modal
        this.parentModalOpeningFunctionParams = null;
    }

    setActiveModalInfo(activeModalOpeningFunction, activeModalOpeningFunctionParams = null, parentModalOpeningFunction = null, parentModalOpeningFunctionParams = null) {
        this.activeModalOpeningFunction = activeModalOpeningFunction;
        this.activeModalOpeningFunctionParams = activeModalOpeningFunctionParams;
        this.parentModalOpeningFunction = parentModalOpeningFunction;
        this.parentModalOpeningFunctionParams = parentModalOpeningFunctionParams;
    }

    displayActiveModal() {
        console.log("Displaying modal...")
        this.activeModalOpeningFunction(this.activeModalOpeningFunctionParams);
    }

    displayParentModal() {
        // Applicable for modals with a parent modal
        // Example: Modal B was opened using a button in Modal A. When user confirms cancel in Modal B, Modal A must display again
        console.log("Displaying parent modal...");
        this.parentModalOpeningFunction(this.parentModalOpeningFunctionParams);
    }

    hasParentModal() {
        return this.parentModalOpeningFunction !== null;
    }

    clearActiveModalInfo() {
        console.log("Clearing active modal info!")
        this.activeModalOpeningFunction = null;
        this.activeModalOpeningFunctionParams = null;
        this.parentModalOpeningFunction = null;
        this.parentModalOpeningFunctionParams = null;
    }
}

export const modalManager = new ModalManager();
