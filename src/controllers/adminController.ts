import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { check, validationResult } from "express-validator";
import crypto from "crypto";
import User from "../models/User"; // Adjust the import path as needed

const controllers = {
  getRegister: (req: Request, res: Response) => {
    res.render("register");
  },

  postRegister: [
    check("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase character")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase character")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number"),
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        return res.render("register", { errors: errorMessages });
      }

      try {
        const existingUser = await User.findOne({
          username: req.body.username,
        });
        if (existingUser) {
          return res.render("register", {
            errors: ["Username already exists"],
          });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
        await newUser.save();

        req.session.user = newUser;
        res.redirect("/login");
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
    },
  ],

  getLogin: (req: Request, res: Response) => {
    res.render("login");
  },

  postLogin: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
        return res.status(400).send("Invalid username or password");
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(400).send("Invalid username or password");
      }

      req.session.user = user;
      res.redirect("/member");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },

  postLogout: (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      res.redirect("/login");
    });
  },

  getAdminPage: (req: Request, res: Response) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }
    res.render("member");
  },

  getResetPassword: (req: Request, res: Response) => {
    res.render("users/reset-password");
  },

  postResetPassword: (req: Request, res: Response) => {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        console.log(err);
        return res.redirect("/reset-password");
      }
      const token = buffer.toString("hex");
      try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.redirect("/reset-password");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        await user.save();
        res.redirect("/login");
      } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
      }
    });
  },

  getNewPassword: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({
        resetToken: req.params.token,
        resetTokenExpiration: { $gt: Date.now() },
      });
      if (!user) {
        return res.redirect("/login");
      }
      res.render("users/set-new-password", {
        userId: user._id.toString(),
        passwordToken: req.params.token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },

  postNewPassword: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({
        _id: req.body.userId,
        resetToken: req.body.passwordToken,
        resetTokenExpiration: { $gt: Date.now() },
      });
      if (!user) {
        return res.redirect("/login");
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
      res.redirect("/login");
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },
};

export default controllers;
