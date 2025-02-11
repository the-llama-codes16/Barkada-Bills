// This ModalManager class is used to keep track of the function that opens the calling modal
// The calling modal is the modal that calls the Confirm Cancel modal, 
// which happens when a modal's Cancel button is clicked and the user has unsaved changes


export class ModalManager {
    constructor() {
        // The function that opens the modal
        this.activeModalOpeningFunction = null;
        // The list of parameters for the opening function
        this.activeModalOpeningFunctionParams = null;
    }

    setActiveModalInfo(activeModalOpeningFunction, activeModalOpeningFunctionParams) {
        this.activeModalOpeningFunction = activeModalOpeningFunction;
        this.activeModalOpeningFunctionParams = activeModalOpeningFunctionParams;
    }

    displayActiveModal() {
        console.log("Displaying modal...")
        this.activeModalOpeningFunction(this.activeModalOpeningFunctionParams);
    }

    clearActiveModalInfo() {
        console.log("Clearing active modal info!")
        this.activeModalOpeningFunction = null;
        this.activeModalOpeningFunctionParams = null;
    }
}

export const modalManager = new ModalManager();
