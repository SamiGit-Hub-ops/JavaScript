
import { User } from "../Model/User.js";
import { UserService } from "../Services/userService.js";
import { ExpenseService } from "../Services/expenseService.js";
import { DOMHelpers } from "./DOMHelpers.js";
import { showSuccessToast, showErrorToast } from "../Expense Splitter/Utils/toastUtil.js";


export class ExpenseUI {
    constructor(userService, expenseService) {
        this.userService = userService;
        this.expenseService = expenseService;
        this.initializeElements();
        this.bindEvents();
        this.initializeSelectBox();
    }

    //initialize  UI elements 
    initializeElements() {
        this.elements = {
            addUserForm : DOMHelpers.getElementById("addUserForm"),
            userInput : DOMHelpers.getElementById("userInput"),
            addExpenseForm : DOMHelpers.getElementById("addExpenseForm"),
            expenseUserInput : DOMHelpers.getElementById("expenseUserInput"),
            expenseAmountInput : DOMHelpers.getElementById("expenseAmountInput"),
            expenseReasonInput : DOMHelpers.getElementById("expenseReasonInput"),
            paymentList : DOMHelpers.getElementById("payment-list"),
            simplifyBtn: DOMHelpers.getElementById("simplifyBtn"),
            resultArea: DOMHelpers.getElementById("resultArea"),

        }
    }

    // bind events
    bindEvents() {
        this.elements.addUserForm.addEventListener("submit", (e) => {
            this.handleAddUser(e);
        })

        this.elements.addExpenseForm.addEventListener("submit", (e) => {
            this.handleAddExpense(e);
        });

        this.elements.simplifyBtn.addEventListener("click", () => {
            this.handleSimplify();
        })
    }

    handleAddUser(e) {
        e.preventDefault();

        try {
            //get user name entered in user input box
            const name = this.elements.userInput.value.trim();

            //user name check - error or falsy value
            if(!name) {
                throw new Error("Invalid user name");
            }

            //userService's addUser will create class instance for user add it to DS and return the created user
            const user = this.userService.addUser(name);

            //add user to the expense select box
            this.addUserToSelect(user.name);

            //form reset
            this.elements.addUserForm.reset();

            //display on console the user added 
            showSuccessToast(` User ${user.name} is added`);



            /* //display on console all the users added 
            //console.log(`All Users added so far: ${JSON.stringify(this.userService.getAllUsers(), null, 2)}`);
            // The 'null, 2' arguments format the JSON with 2 spaces for readability

            console.log(`All Users added so far: ${JSON.stringify(this.userService.getUserNames(), null, 2)}`);

            //count of users added
            console.log(`Number Users added so far: ${this.userService.getUserCount()}`); */

        } catch (error) {
            console.error(error.message);
            showErrorToast(error.message);
        }
    }

    handleAddExpense(e) {
        e.preventDefault();
        try {
            const paidBy = this.elements.expenseUserInput.value.trim();
            const amount = this.elements.expenseAmountInput.valueAsNumber; 
            const description = this.elements.expenseReasonInput.value.trim();

            if(!paidBy) {
                throw new Error("Please select a user");
            }

            if (!amount || amount <= 0) {
                throw new Error("Please enter an amount greater than zero");
            }

            const expense = this.expenseService.addExpense(paidBy, amount, description);

            //render expenses
            this.renderExpense(expense);

            //reset the form
            this.elements.expenseAmountInput.value = "";  // we will not to form.reset here as we want to retain user list in select box
            this.elements.expenseReasonInput.value = "";

            //show success toast
            showSuccessToast(`Expense ${amount} added by ${paidBy}`);
            console.log(`Expense ${amount} added by ${paidBy}`);
            
        } catch (error) {
            showErrorToast(error.message);
            console.error(error.message);
        }

    }

    handleSimplify() {

        try {
            const results = this.expenseService.simplifyExpenses();
            this.displayResults(results);
            
        } catch (error) {
            console.error(error.message);
            showErrorToast(error.message);
        }
    }


    //initializeSelectBox

    initializeSelectBox() {
        const defaultOption = DOMHelpers.createOption("Select User", "");
        this.elements.expenseUserInput.add(defaultOption);
    }


    //addUserToSelect

    addUserToSelect(userName) {
        const newOption = DOMHelpers.createOption(userName, userName);
        this.elements.expenseUserInput.add(newOption);
    }


    renderExpense(expense) {
        const hasDescription = 
                    expense.description 
                    && expense.description.trim().length > 0
                    && expense.description !== "No description";


        const text = hasDescription
         ? `${expense.paidBy} paid INR ${expense.amount} for ${expense.description}` 
         :  `${expense.paidBy} paid INR ${expense.amount}` ;
        const listItem = DOMHelpers.createListItem(text, "expense-item");

        this.elements.paymentList.appendChild(listItem);


    }

    displayResults(results) {
        console.log(results);

        DOMHelpers.clearElement(this.elements.resultArea);

        if(results.length === 0) {
            const noResultsItem = DOMHelpers.createListItem("All expenses are settled",
                "no-results");

            this.elements.resultArea.appendChild(noResultsItem);
            return;
        }

        DOMHelpers.appendFragment(this.elements.resultArea, results, 
            (result) => DOMHelpers.createListItem(result, "settlement-item")  );

    }



}

//initialize all UI elements and create an object containing them all

// bind events -- eg binding a submit event to a form 

//take care of expense select box
