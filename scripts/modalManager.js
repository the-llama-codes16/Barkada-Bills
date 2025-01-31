// This ModalManager class is used to keep track of the modal that calls the Confirm Cancel functionality
// so that when user cancels exit, the previous modal can be traced and displayed again
// Note: With assistance from ChatGPT

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
