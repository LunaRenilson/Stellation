import express from 'express';
import { query } from "./src/db.js";
import { Person } from './src/Entities.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// get all persons
app.get("/persons", async (_req, res) => {
  try {
    const result = await query("SELECT * FROM persons;");
    res.json(result.rows);
  }catch(e){
    console.log(e)
    res.status(500).send("Error on consulting database table")
  }
})

// Get person by ID
app.get("/persons/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("SELECT * FROM persons WHERE id = $1;", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Person not found");
    }
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error retrieving person");
  }
});

// Insertion in the db
app.post("/persons", async (req, res) => {
  const personData: Omit<Person, 'id' | 'createdAt'> = req.body;
  const { name, age, document, email, password, phone, documentStatus } = personData;
  if (!name || !age || !document || !email || !password) {
    return res.status(400).send("Missing required fields: name, age, document, email, password");
  }
  try {
    const result = await query(
      "INSERT INTO persons (name, age, document, email, password, phone, document_status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [name, age, document, email, password, phone, documentStatus]
    );
    res.status(201).json(result.rows[0] as Person);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error inserting new person");
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

