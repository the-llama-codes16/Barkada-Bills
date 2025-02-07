// This MemberManager class is used to keep track of the original name of the member being edited

export class MemberNameManager {
    constructor() {
        this.originalMemberName = "";
    }

    setOriginalMemberName(originalMemberName) {
        console.log(`Saving name: ${originalMemberName}`);
        this.originalMemberName = originalMemberName;
    }

    getOriginalMemberName() {
        console.log(`Displaying Name: ${this.originalMemberName}`);
        return this.originalMemberName;
    }

    clearOriginalMemberName() {
        this.originalMemberName = "";
    }
}

export const memberNameManager = new MemberNameManager();
