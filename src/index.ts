import express, {Request, Response} from "express";
import dotenv from "dotenv";
import { router } from "./routes/index";
import mongoose from "mongoose";
import errorMiddleware from './middleware/error.middleware';
import HttpException from "./exceptions/HttpException";

dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.use((err: HttpException, req: Request, res: Response, next: express.NextFunction) => {
    errorMiddleware(err, req, res, next);
});

mongoose.connect('mongodb://localhost:27017/ryd', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true}, () => {
    // tslint:disable-next-line:no-console
    console.log('connected to database')
});
mongoose.Promise = global.Promise;
// tslint:disable-next-line:no-console
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
export { app as app };