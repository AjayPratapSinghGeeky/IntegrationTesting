import express, { Request, Response } from "express";
import { prismaClient } from "./db";

export const app = express();

app.use(express.json());

app.post("/sum", async (req: Request, res: Response): Promise<void> => {
  try {
    const { a, b } = req.body;

    if (a > 1000000 || b > 1000000) {
      res.status(422).json({ message: "Sorry, we don't support big numbers" });
      return;
    }

    const result = a + b;

    const request = await prismaClient.request.create({
      data: { a, b, answer: result, type: "ADD" },
    });

    res.status(200).json({ answer: result, id: request.id });
  } catch (error) {
    console.error("Error processing request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});
