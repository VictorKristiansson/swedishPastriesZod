// imports
import express from "express";
import { z } from "zod";

// server setup
const app = express();
const PORT = 3000;
app.use(express.json());

// pastry schema
const pastrySchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string(),
  price: z.number().min(0),
  isGlutenFree: z.boolean().optional(),
  calories: z.number().min(0).optional(),
});

// type
type Pastry = z.infer<typeof pastrySchema>;
let pastries: Pastry[] = [];

// get - get all pastries
app.get("/pastries", (req, res) => {
  if (pastries.length === 0) {
    return res.json({ message: "No pastries available" });
  }
  res.json({ message: "Here are all the pastries ", pastries: pastries });
});

// post - add a new pastry
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

// put - update a pastry
app.put("/pastries/:name", (req, res) => {
  const pastryName = req.params.name.trim().toLowerCase();
  const pastryIndex = pastries.findIndex(
    (p) => p.name.trim().toLowerCase() === pastryName
  );

  if (pastryIndex === -1) {
    return res.status(404).json({ message: "Pastry not found" });
  }

  const pastry = pastries[pastryIndex];

  pastry.name = req.body.name ?? pastry.name;
  pastry.price = req.body.price ?? pastry.price;
  pastry.isGlutenFree = req.body.isGlutenFree ?? pastry.isGlutenFree;
  pastry.calories = req.body.calories ?? pastry.calories;

  res.json({ message: `${pastry.name} updated!`, pastry });
});

// delete - remove a pastry
app.delete("/pastries/:name", (req, res) => {
  const pastryName = req.params.name.trim().toLowerCase();
  pastries = pastries.filter((p) => p.name.trim().toLowerCase() !== pastryName);
  res.json({ message: `${req.params.name} deleted!` });
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
