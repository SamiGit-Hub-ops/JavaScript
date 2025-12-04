import { Expense } from "../Model/Expense.js";
import { UserService } from "./userService.js";

export class ExpenseService {
    constructor(userService) {

        this.expenses = [];
        this.userService = userService;

    }

    addExpense(paidBy, amount, description) {

        if(!this.userService.hasUser(paidBy)) {
            throw new Error("User does not exist add the user in Add user section");
        }


        const expense = new Expense(paidBy, amount, description);

        this.expenses.push(expense);

        return expense;
    }

    getAllExpenses() {
        return [...this.expenses];
    }


    getExpenseByUser(name) {
        return this.expenses.filter((e) => e.paidBy === name);
    }

    clear() {
        this.expenses = [];
    }

    simplifyExpenses() {
        //algorithm for splitting expenses

        // 1 Calclulate what each person should pay

        // 2 who overpaid, who underpaid

/*      tom -> 300  ->  balance  0
        jon -> 450  ->  to be received  150
        dom -> 150  ->  to be paid  150

        share per person ->  900/3  =  300 */
    

        // 3 Match folks that underpaid with folks that overpaid

        //result meessage -> Dom owes Jon INR 150
/* 
        result meessage  if multiple such combos then array of values
            ["Dom owes Jon INR 150", "Alice owes Joe INR 200", .....]
         */
        
        //get total number of users
        const userCount = this.userService.getUserCount();

        //base case - return empty array if no users are there
         if (userCount === 0) { 
            return [];
        }

        // net obj will store how much each user is owed or owes to other
        const net = {};

        //get array of all names of users
        const userNames = this.userService.getUserNames();

        // for now keep net balances as 0 for all users
        userNames.forEach(name => {
            net[name] = 0;
        });

        // to calculate share per user and to check
        // expenses for each user start a loop for expenses
        this.expenses.forEach(expense => {
            const share = expense.amount/userCount ;

            //now we got what the share for each user should be, so sustract share
            //from their already given expense, to find if they owe or are owed

            userNames.forEach(name => {
                if(name === expense.paidBy) {
                    net[name] += (expense.amount - share);  
            //incremental(+=) because there can be mutiple items from same user 
            // and that is why we also have a loop
            // logic- dom paid 300 and share is only 100 , then dom is owed 200

                } else {
            // if there is no match then that user did not added any expense yet
            // so user will be obliged to pay the share amount
                    net[name] -=  share; 
            //incremental(-=) because we can accumulate if there are mutiple entries
            //tom did not pay 200(share was 200 for now) later share became
            //300 so it will be -200-100 -> -300  for tom

                }
            });

        });
    
    //call another function for calculation using values, details from net  obj

    return this.calculateSettlements(net);
        
    }

    

    calculateSettlements(net) {
        // results array

        const results = [];

        //Collection of names from net object where net[name] ie value is non-zero
        const names = Object.keys(net).filter(name => Math.abs(net[name]) > 0.01);


        //sort the names in ascending order wrt net expense values
        names.sort((a, b) => net[a] - net[b] );

        // greedy and 2 pointer for actual calculation

        let i = 0, j = names.length - 1;

        while(i < j) {

        const debtor = names[i];  // person with -ve value , that they should pay
        const creditor = names[j]; // person with +ve value , that they should receive

        //amount to be added from one and removed from other to settle score
        
        const settlement = Math.min(-net[debtor], net[creditor] );

        if(settlement > 0.01) {
            net[debtor] += settlement;
            net[creditor] -= settlement;

            results.push(`${debtor} owes ${creditor} ₹${settlement.toFixed(2)}`);           
        }

        if(Math.abs(net[debtor]) < 0.01) i++;
        if(Math.abs(net[creditor]) < 0.01) j--;           
        
        }
    return results;  
         
    }
}
