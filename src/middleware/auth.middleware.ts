import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token.startsWith("mock-token-")) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  const expiry = Number(token.split("mock-token-")[1]);

  if (!expiry || Date.now() > expiry) {
    return res.status(401).json({
      message: "Token expired",
    });
  }

  next();
};

export default authMiddleware;
