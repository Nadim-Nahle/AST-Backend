import { Request, Response, NextFunction } from "express";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];

  if (token !== "mock-jwt-token-123456") {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  next();
};

export default authMiddleware;