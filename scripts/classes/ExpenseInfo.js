// This ExpenseInfo class is used to keep track of the details of the Expense being currently written/edited by user

export class ExpenseInfo {
    constructor() {
        this.expenseName = "";
        this.expenseAmount = "";
        this.expenseFilter = "selected-members";
        this.expenseMembers = [];
    }

    setExpenseName(expenseName) {
        console.log(`Setting expense name to ${expenseName}...`);
        this.expenseName = expenseName;
    }

    getExpenseName() {
        return this.expenseName;
    }

    setExpenseAmount(expenseAmount) {
        console.log(`Setting expense amount to ${expenseAmount}`);
        this.expenseAmount = expenseAmount;
    }

    getExpenseAmount() {
        return this.expenseAmount;
    }

    setExpenseFilter(expenseFilter) {
        console.log(`Setting expense filter to ${expenseFilter}`);
        this.expenseFilter = expenseFilter;
    }

    getExpenseFilter() {
        return this.expenseFilter;
    }

    setExpenseMembers(expenseMembers) {
        console.log(`Setting expense members to ${expenseMembers}`);
        this.expenseMembers = expenseMembers;
    }

    getExpenseMembers() {
        return this.expenseMembers;
    }

    isEqual(otherExpenseInfo) {
        console.log(`Comparing to ${otherExpenseInfo}...`);

        if (otherExpenseInfo.getExpenseName() !== this.expenseName){
            return false;
        }
        if (otherExpenseInfo.getExpenseAmount() !== this.expenseAmount) {
            return false;
        }
        if (otherExpenseInfo.getExpenseFilter() !== this.expenseFilter) {
            return false;
        }

        return (this.isExpenseMembersEqual(otherExpenseInfo));
    }

    isExpenseMembersEqual(otherExpenseInfo) {
        if (otherExpenseInfo.getExpenseMembers().length != this.expenseMembers.length) {
            console.log("Length not equal");
            return false;
        }
        for (let i = 0; i < this.expenseMembers.length; i++) {
            if (otherExpenseInfo.getExpenseMembers()[i] !== this.expenseMembers[i]) {
                console.log(`Not the same: ${otherExpenseInfo.getExpenseMembers()[i]} vs ${this.expenseMembers[i]}`)
                return false;
            }
        }

        return true;
    }

    clearExpenseInfo() {
        console.log("Clearing expense info!");
        this.expenseName = "";
        this.expenseAmount = "";
        this.expenseFilter = "selected-members";
        this.expenseMembers = [];
    }
}

// Keeps track of the original, saved info
export let originalExpenseInfo = new ExpenseInfo();

// Keeps track of the modified info to compare with original
export let currentExpenseInfo = new ExpenseInfo();

// Keeps track of the modified expenseMembers without saving them to the current one yet
export let temporaryExpenseInfo = new ExpenseInfo();