export class Expense {
    constructor(paidBy, amount, description = "No description") {
        if(!paidBy || typeof paidBy !== "string") {
            throw new Error("PaidBy name should be a valid string")
        }

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            throw new Error('Amount must be a positive number');
        }

        this.paidBy = paidBy.trim();
        this.amount = parseFloat(amount.toFixed(2));
        this.description = description.trim();
        this.timeStamp = new Date().toISOString();
        this.id = this.generateID();
    }

    generateID() {
        return crypto.randomUUID();
    }
}
