
export class User {
    constructor(name) {
        if(!name || typeof name !== "string") {
            throw new Error("name should be a valid string")
        }

        this.name = name.trim();
        this.id = this.generateID();
    }

    generateID() {
        return crypto.randomUUID();
    }
}
