import { Request, Response, NextFunction } from "express";

interface Session {
  user: string;
}

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.user) {
    return next();
  } else {
    res.status(401).send("Please log in before using these operations");
  }
}

export default ensureAuthenticated;
