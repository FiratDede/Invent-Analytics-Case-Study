import {Router} from "express";
import { catchErrorWrapper } from "../helpers/errorHelpers";
import { getAllBooks,getBook,createBook } from "../controllers/bookController";

var router: Router = Router();

router.get("/",catchErrorWrapper(getAllBooks))

router.get("/:bookId",catchErrorWrapper(getBook))

router.post("/",catchErrorWrapper(createBook))

export default router