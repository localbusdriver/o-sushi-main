import express, { Request, Response } from 'express';
import expressLayouts from "express-ejs-layouts";
import path from 'path';
import adminController from './controllers/adminController';

const app = express();
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get('/', (req: Request, res: Response) => {
  res.render("index"); //to index.ejs
});

app.get('/menu', (req: Request, res: Response) => {
  res.render('items');
});

app.get("/login", adminController.getLogin);
app.post("/login", adminController.postLogin);
app.post("/logout", adminController.postLogout);
app.get("/member", adminController.getAdminPage);
//Display password reset page
app.get("/reset-password", adminController.getResetPassword);
//Process password reset request
app.post("/reset-password", adminController.postResetPassword);
//Use token to display password set page
app.get("/reset/:token", adminController.getNewPassword);
//set the new password
app.post("/new-password", adminController.postNewPassword);

const PORT: number = parseInt(process.env.PORT || "3000", 10);
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});