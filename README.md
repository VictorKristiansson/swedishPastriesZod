# Swedish Pastry API

This is a simple REST API for managing Swedish pastries.  
It is built with **Express**, **TypeScript**, and **Zod** for validation.

## Features

- **GET /pastries** – Get all pastries  
- **POST /pastries** – Add a new pastry  
- **PUT /pastries/:name** – Update a pastry by name  
- **DELETE /pastries/:name** – Delete a pastry by name  

## Zod Schema

const pastrySchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be 0 or more"),
  isGlutenFree: z.boolean().optional(),
  calories: z.number().min(0).optional(),
});


## How to run the code
1. Copy the code

2. Install NPM

3. Run npm run dev in the terminal to start the server

4. Use Postman to send requests
