# Barkada Bills

Barkada Bills is an expense splitter web application that takes group members, expenses, and allows customization on who contributes to which expense.

The name of the app is taken from the Filipino word “barkada”, which means “a group of friends”. It is a common experience during friend gatherings or parties that expenses are split equally and sometimes unequally; alcoholic drinks are only paid for by the ones who drink, gasoline is only paid for by the ones who were in the same car. This app aims to make the calculating part easier and quicker, which can be more complicated when done manually.

This application was submitted as a final project for Harvard’s CS50x 2025 online course.

This application has been set up at [Github Pages - Barkada Bills](https://the-llama-codes16.github.io/Barkada-Bills/).

A demo of this application is available at [YouTube](https://youtu.be/uzA1Ce4m18g?si=895uyYc5PBMZdYz2).


## UI Prototype
[Barkada Bills - Figma](https://www.figma.com/design/ZlPl9Nkz89UPsARzV1qw4w/Barkada-Bills?node-id=0-1&t=jb5aWE3NMtqIlpD9-1)  
*Note: The prototype may have slight differences from the actual app as changes were made during the implementation phase.*


## Technologies Used

-   HTML
-   CSS
-   JavaScript

## Pages

This application has 3 pages:

1.  **Home Page**
    - This is the landing page when the application is opened in a new session.

2.  **About Page**
    - This contains a brief explanation of the inspiration for creating this app.

3.  **Main Page**
    - This page contains the expense splitter, where the user inputs information and gets results.

Each of the pages contains buttons to navigate to the other pages. Any existing entry in the Main Page will remain as long as the user does not close the browser tab/window.

## Application Details

This application calculates the total contribution of each member by taking into account the expenses the member is added as a contributor to. A breakdown is also available for traceability.

### 1. Step 1 – Add Barkada Members

The first part of the main page screen prompts the user to add members of the group using the **Add Member** button. The member’s name must be:

-   Within 1-20 characters
-   A unique entry, case insensitive

A confirmation dialog will display the new member added. The new member will display as a new row in the table of members in the main screen. Each member row has corresponding **Edit** and **Delete** buttons.

> The **“Step 1”** label is merely to guide the user for a seamless input process. The user can add/modify/delete members at any point in time.

### 2. Step 2 – Add Expenses

The second part of the main page screen prompts the user to add expenses using the **Add Expense** button. For each expense, the following information is asked:

-   **Name** (required, must be unique, within 1-20 characters)
-   **Amount** (required, within 1-20 digits)
-   **To be paid by:** (default option is **Selected members**)
-   **Members** (optional)

A confirmation dialog will display the new expense added. The new expense will display as a new row in the table of expenses in the main screen. Each expense row has corresponding **Edit** and **Delete** buttons.

> The **“Step 2”** label is merely to guide the user for a seamless input process. The user can add/modify/delete expenses at any point in time.

### 3. Member Contribution

As soon as at least one member and at least one expense have been added, the **Member Contribution** table will update to show the contribution information for each member. The total amount and the breakdown of contributions are available for each member. Any updates on the members and/or expenses will be reflected in this table in real time.

Whenever the user closes a modal with unsaved changes, a **Discard changes?** modal will appear to confirm the cancellation.

## Code

### HTML

1.  **index.html** – HTML code for the Home Page.
2.  **pages/about.html** – HTML code for the About Page.
3.  **pages/main.html** – HTML code for the Main Page and all the modals that appear in this page.

### CSS

4.  **css/components.css** – CSS code for styling specific components: buttons, modals, tables.
5.  **css/styles.css** – CSS code for general styling: fonts, spacing, etc.

### JavaScript

6.  **scripts/main.js** – contains the algorithm for the behavior of everything that appears in the Main Page (except for the modals, which are placed in separate files). The code here ensures that all the buttons have their event handlers and the tables display current entries.
7.  **scripts/modal-add-member.js** – contains the algorithm for the behavior of the Add Member modal and New Member Added modal. The code here performs validation checks, saves entries, and ensures that the focus is trapped within the current modal while it is open.
8.  **scripts/modal-edit-member.js** – contains the algorithm for the behavior of the Edit Member modal and Edited Member modal. The code here performs validation checks, saves entries, and ensures that the focus is trapped within the current modal while it is open.
9.  **scripts/modal-add-expense.js** – contains the algorithm for the behavior of the Add Expense modal and the modal for selecting members. The same modals are used for the Edit Expense function, with the header strings replaced accordingly. The code here performs validation checks, saves entries, and ensures that the focus is trapped within the current modal while it is open.
10.  **scripts/modal-confirm-cancel.js** – contains the algorithm for the behavior of the Discard Changes modal, which is always shown whenever there are unsaved changes upon cancellation. The code here also ensures that the focus is trapped within the current modal while it is open.
11.  **scripts/modal-delete-item.js** – contains the algorithm for the behavior of the Delete modal and Deleted modal. This also performs the deletion of the member or expense and its removal from other items it appears in. The code here also ensures that the focus is trapped within the current modal while it is open.
12.  **scripts/modal-contrib-info.js** – contains the algorithm for the behavior of the View Contributor modal and performs retrieval of the relevant information to be displayed. The code here also ensures that the focus is trapped within the current modal while it is open.
13.  **scripts/reusable-functions.js** – contains the functions used repeatedly in many parts of the project.
14.  **scripts/classes/ModalManager.js** – Each modal has a corresponding function to open it. Whenever there are unsaved changes in a modal upon cancellation, the function to open that modal is saved before the Discard Changes modal is displayed. So, when the user decides not to cancel, the saved function is simply called to reopen the previous modal. The Modal Manager keeps track of the function.
15.  **scripts/classes/ItemManager.js** – The Main Page displays a table of members and expenses that the user has added. The Item Manager is used to keep track of the type(member/expense) and the name of the item whose corresponding Edit/Delete button has been clicked so that this information is properly displayed and processed in the applicable modal. However, since only the type and name are tracked here, this is not used for the Edit Expense function.
16.  **scripts/classes/ExpenseInfo.js** – This keeps track of the information of the expense whose corresponding Edit button has been clicked so that the information is properly displayed and processed in the Edit Expense modal.
17.  **scripts/classes/ContribInfo.js** – This keeps track of the contribution information, which contains a contribution breakdown for each member.

## Memory

Members and expenses are stored in `sessionStorage` as key/value pairs. When the user closes the browser, this information is deleted.

### Example:

```json
"memberData": {
  "members": ["Iam", "Al", "Diego", "Pol"]
}

"expenseData": {
  "expenses": {
    "Beer": {
      "amount": "100",
      "filter": "selected-members",
      "members": ["Iam", "Diego"]
    },
    "Gas": {
      "amount": "42",
      "filter": "all-except",
      "members": ["Iam", "Diego"]
    },
    "Cake": {
      "amount": "10",
      "filter": "all",
      "members": []
    }
  }
}

```

Member Contribution information, which is not user-provided but instead derived by calculating expenses for each member accordingly, is not stored in the `sessionStorage` but instead tracked using a `ContribInfo` object.

### Example:

```json
memberContribData = {
  "Iam": {
    "Beer": "50",
    "Cake": "5"
  },
  "Diego": {
    "Beer": "50",
    "Cake": "5"
  }
}

```

## Possible Improvements

1.  Allow users to select a currency.
2.  A note should appear under the Expense Table to indicate expenses that do not have selected members.
3.  Add a sorting option for tables (by name/amount).

