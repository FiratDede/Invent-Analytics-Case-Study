import {Router} from "express";
import { catchErrorWrapper } from "../helpers/errorHelpers";
import { getAllUsers,getUser,createUser, borrowBook,returnBook } from "../controllers/userController";

var router: Router = Router();

router.get("/",catchErrorWrapper(getAllUsers))

router.get("/:userId",catchErrorWrapper(getUser))

router.post("/",catchErrorWrapper(createUser))

// Borrow Book
router.post("/:userId/borrow/:bookId",catchErrorWrapper(borrowBook))
// Return Book
router.post("/:userId/return/:bookId", catchErrorWrapper(returnBook))

export default router