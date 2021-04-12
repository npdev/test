import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Controller } from "../controllers/controller";
import HttpException from "../exceptions/HttpException";

const router = express.Router();
const controller = new Controller();

router.get( "/", ( req: Request, res: Response ) => {
    return res.send( "Hello world!" );
} );

router.post( "/createUser", async ( req: Request, res: Response, next: express.NextFunction ) => {
    try {
        const result = await controller.createUser(req.body.name);
        return res.status(201).send(result);
    } catch (err) {
        next(err);
    }
} );

router.post( "/createIssue", async ( req: Request, res: Response, next: express.NextFunction ) => {
    try {
        const result = await controller.createIssue(req.body.name);
        return res.status(201).send(result);
    } catch (err) {
        next(err);
    }
} );

router.put( "/doneIssue/:id", async ( req: Request, res: Response, next: express.NextFunction ) => {
    try {
        const issueId: mongoose.Types.ObjectId | null = req.params && req.params.id ? mongoose.Types.ObjectId(req.params.id) : null;
        const result = await controller.doneIssue(issueId);
            if (result) {
                return res.status(200).send(result);
            }
    } catch (err) {
        next(err);
    }
} );

export { router as router };
