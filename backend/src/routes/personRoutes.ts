import { Router } from 'express';
import { query } from '../models/db.js';
import { Person } from '../Entities.js';

const router = Router();

// get all persons
router.get("/", async (_req, res) => {
  try {
    const result = await query("SELECT * FROM persons;");
    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error on consulting database table");
  }
});

// Get person by ID
router.get("/:id", async (req, res) => {
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
router.post("/", async (req, res) => {
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

// Update person by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData: Partial<Omit<Person, 'id' | 'createdAt'>> = req.body;
  const { name, age, document, email, password, phone, documentStatus } = updateData;

  if (!name && !age && !document && !email && !password && !phone && documentStatus === undefined) {
    return res.status(400).send("No fields to update");
  }

  try {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (name !== undefined) {
      fields.push(`name = $${paramIndex++}`);
      values.push(name);
    }
    if (age !== undefined) {
      fields.push(`age = $${paramIndex++}`);
      values.push(age);
    }
    if (document !== undefined) {
      fields.push(`document = $${paramIndex++}`);
      values.push(document);
    }
    if (email !== undefined) {
      fields.push(`email = $${paramIndex++}`);
      values.push(email);
    }
    if (password !== undefined) {
      fields.push(`password = $${paramIndex++}`);
      values.push(password);
    }
    if (phone !== undefined) {
      fields.push(`phone = $${paramIndex++}`);
      values.push(phone);
    }
    if (documentStatus !== undefined) {
      fields.push(`document_status = $${paramIndex++}`);
      values.push(documentStatus);
    }

    values.push(id); // for WHERE clause

    const result = await query(
      `UPDATE persons SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *;`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Person not found");
    }

    res.json(result.rows[0] as Person);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error updating person");
  }
});

// Delete person by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("DELETE FROM persons WHERE id = $1 RETURNING *;", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Person not found");
    }
    res.status(200).send("Person deleted successfully");
  } catch (e) {
    console.log(e);
    res.status(500).send("Error deleting person");
  }
});

export default router;
