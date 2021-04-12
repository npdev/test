import express, { Request, Response } from "express";
import mongoose, {Schema} from "mongoose";
import {IUser, User} from "../models/user";
import {IIssue, Issue} from "../models/issue";

const router = express.Router();

router.get( "/", ( req: Request, res: Response ) => {
    return res.send( "Hello world!" );
} );

router.post( "/createUser", async ( req: Request, res: Response ) => {
    const { name, available } = req.body;
    const user = new User({ name, available });
    await user.save();
    return res.status(201).send(user);
} );

router.post( "/createIssue", async ( req: Request, res: Response ) => {
    const { name } = req.body;
    const user: IUser | null = await User.findOne({ "available": true }).exec();
    const issue: IIssue = new Issue({ name });
    if (user && user._id) {
        user.available = false;
        issue.userId = user._id;
    }
    await issue.save();
    await user.save();
    return res.status(201).send(issue);
} );

router.put( "/doneIssue/:id", async ( req: Request, res: Response ) => {
    const issueId: mongoose.Types.ObjectId | null = req.params && req.params.id ? mongoose.Types.ObjectId(req.params.id) : null;
    // @ts-ignore
    const updateObj = { done: true, userId: null };
    const originalIssue = await Issue.findByIdAndUpdate({ _id: issueId }, { $set: updateObj } , {
        returnOriginal: true
    });
    const resultIssue = Object.assign(originalIssue, updateObj);
    const userId = originalIssue.userId;
    await User.updateOne({ _id: userId }, { available: true });
    return res.status(200).send(resultIssue);
} );

export { router as router };
