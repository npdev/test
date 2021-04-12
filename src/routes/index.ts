import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Controller } from "../controllers/controller";

const router = express.Router();
const controller = new Controller();

router.get( "/", ( req: Request, res: Response ) => {
    return res.send( "Hello world!" );
} );

router.post( "/createUser", async ( req: Request, res: Response ) => {
    const result = await controller.createUser(req.body.name);
    return res.status(201).send(result);
} );

router.post( "/createIssue", async ( req: Request, res: Response ) => {
    const result = await controller.createIssue(req.body.name);
    return res.status(201).send(result);
} );

router.put( "/doneIssue/:id", async ( req: Request, res: Response ) => {
    const issueId: mongoose.Types.ObjectId | null = req.params && req.params.id ? mongoose.Types.ObjectId(req.params.id) : null;
    const result = await controller.doneIssue(issueId);
    return res.status(200).send(result);
} );

export { router as router };
