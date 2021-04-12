import mongoose from "mongoose";
import {IUser, User} from "../models/user";
import {IIssue, Issue} from "../models/issue";

export class Controller {

    public async createUser(name: string) {
        const user = new User({ name });
        await user.save();
        return user;
    }

    public async createIssue(name: string) {
        const user: IUser | null = await User.findOne({ "available": true }).exec();
        const issue: IIssue = new Issue({ name });
        if (user && user._id) {
            user.available = false;
            issue.userId = user._id;
        }
        await issue.save();
        await user.save();
        return issue;
    }

    public async doneIssue(id: mongoose.Types.ObjectId) {
        // @ts-ignore
        const updateObj = { done: true, userId: null };
        const originalIssue: IIssue = await Issue.findByIdAndUpdate({ _id: id }, { $set: updateObj } , {
            returnOriginal: true
        });
        const userId = originalIssue.userId;
        const resultIssue = Object.assign({...originalIssue.toObject()}, updateObj);
        await User.updateOne({ _id: userId }, { available: true });
        return resultIssue;
    }

}
