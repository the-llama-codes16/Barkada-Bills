// This ModalManager class is used to keep track of the function that opens the calling modal
// The calling modal is the modal that calls the Confirm Cancel modal, 
// which happens when a modal's Cancel button is clicked and the user has unsaved changes


export class ModalManager {
    constructor() {
        this.activeModalOpeningFunction = null;
        this.activeModalOpeningFunctionParam = null;
    }

    setActiveModalInfo(activeModalOpeningFunction, activeModalOpeningFunctionParam) {
        this.activeModalOpeningFunction = activeModalOpeningFunction;
        this.activeModalOpeningFunctionParam = activeModalOpeningFunctionParam;
    }

    displayActiveModal() {
        console.log("Displaying modal...")
        this.activeModalOpeningFunction(this.activeModalOpeningFunctionParam);
    }

    clearActiveModalInfo() {
        console.log("Clearing active modal info!")
        this.activeModalOpeningFunction = null;
        this.activeModalOpeningFunctionParam = null;
    }
}

export const modalManager = new ModalManager();
