
import { User } from "../Model/User.js";

export class UserService {

    constructor() {

        this.users = new Map();
    }


    addUser(name) {
        if(!name) {
            throw new Error("User name is required");
        }

        if(this.users.has(name.trim())) {
            throw new Error("Duplicate name not allowed");
        }
        const user = new User(name.trim());
        this.users.set(name.trim(), user);
        return user;
    }

    getUser(name) {

        return this.users.get(name)
    }


    getAllUsers() {

        return Array.from(this.users.values());
    }

    getUserNames() {
        return Array.from(this.users.keys());
    }

    hasUser(name) {
        return this.users.has(name);
    }

    getUserCount() {
        return this.users.size;
    }

    clear() {
        this.users.clear();
    }
}

