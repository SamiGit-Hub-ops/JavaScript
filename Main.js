import { ExpenseUI } from "../UI/expenseUI.js";
import { UserService } from "../Services/userService.js";
import { ExpenseService } from "../Services/expenseService.js";


class ExpenseApp {
    constructor() {
        this.userService = new UserService();
        this.expenseService = new ExpenseService(this.userService);
        this.ui = null;
    }

    init() {
        try {
            this.ui = new ExpenseUI(this.userService, this.expenseService);
            console.log("Splitter App Initialized");

            } catch (error) {
         console.error("Failed to Initialize Splitter App", error.message);    
        }
    }
}


let expenseApp;

document.addEventListener("DOMContentLoaded", () => {
    expenseApp = new ExpenseApp();
    expenseApp.init();
});


// below part is added so that if expenseApp is not loaded will re-load with reqd steps plus
// it helps with toastify msgs also

window.addEventListener("load", () => {
    if(!expenseApp) {
        expenseApp = new ExpenseApp();
        expenseApp.init();
    }
});


