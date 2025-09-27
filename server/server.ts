import express from "express";
import { z } from "zod";

const app = express();
const PORT = 3000;

app.use(express.json());

const pastrySchema = z.object({
  name: z.string(),
  price: z.number().min(0),
  isGlutenFree: z.boolean().optional(),
  calories: z.number().min(0).optional(),
});

type Pastry = z.infer<typeof pastrySchema>;

const pastries: Pastry[] = [];

app.get("/pastries", (req, res) => {
  res.json(pastries);
});

app.post("/pastries", (req, res) => {
  const result = pastrySchema.safeParse(req.body);
  if (!result.success) {
    return res
      .status(400)
      .json({ message: `Error adding pastry`, errors: result.error });
  }
  pastries.push(result.data);
  res
    .status(201)
    .json({ message: `${req.body.name} Added!`, pastry: result.data });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
