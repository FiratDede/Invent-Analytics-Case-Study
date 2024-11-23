import express from "express";
import userRouter from "./routers/userRouter"
import bookRouter from "./routers/bookRouter"
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT: number = 3000

// Start Server
app.listen(PORT, () => {
    console.log('Server is running on http://localhost:'+PORT);
});

app.use("/users",userRouter)
app.use("/books",bookRouter)


// Middleware For Handling Errors
app.use(errorHandlerMiddleware)
