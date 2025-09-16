import { Router } from 'express';
import { query } from '../models/db.js';
import { Property } from '../Entities.js';

const router = Router();

// get all properties
router.get("/", async (_req, res) => {
  try {
    const result = await query("SELECT * FROM properties;");
    res.json(result.rows);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error on consulting database table");
  }
});

// Get property by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("SELECT * FROM properties WHERE id = $1;", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Property not found");
    }
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error retrieving property");
  }
});

// Insertion in the db
router.post("/", async (req, res) => {
  const propertyData: Omit<Property, 'id' | 'createdAt'> = req.body;
  const { ownerId, description, type, zipCode, address, number, neighborhood, city, state, images, price, area, bedrooms, bathrooms } = propertyData;
  if (!ownerId || !description || !type || !zipCode || !address || !number || !neighborhood || !city || !state || !price || !area || !bedrooms || !bathrooms) {
    return res.status(400).send("Missing required fields");
  }
  try {
    const result = await query(
      "INSERT INTO properties (owner_id, description, type, zip_code, address, number, neighborhood, city, state, images, price, area, bedrooms, bathrooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;",
      [ownerId, description, type, zipCode, address, number, neighborhood, city, state, images, price, area, bedrooms, bathrooms]
    );
    res.status(201).json(result.rows[0] as Property);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error inserting new property");
  }
});

// Update property by ID
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData: Partial<Omit<Property, 'id' | 'createdAt'>> = req.body;
  const { ownerId, description, type, zipCode, address, number, neighborhood, city, state, images, price, area, bedrooms, bathrooms } = updateData;

  if (!ownerId && !description && !type && !zipCode && !address && !number && !neighborhood && !city && !state && !images && !price && !area && !bedrooms && !bathrooms) {
    return res.status(400).send("No fields to update");
  }

  try {
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (ownerId !== undefined) {
      fields.push(`owner_id = $${paramIndex++}`);
      values.push(ownerId);
    }
    if (description !== undefined) {
      fields.push(`description = $${paramIndex++}`);
      values.push(description);
    }
    if (type !== undefined) {
      fields.push(`type = $${paramIndex++}`);
      values.push(type);
    }
    if (zipCode !== undefined) {
      fields.push(`zip_code = $${paramIndex++}`);
      values.push(zipCode);
    }
    if (address !== undefined) {
      fields.push(`address = $${paramIndex++}`);
      values.push(address);
    }
    if (number !== undefined) {
      fields.push(`number = $${paramIndex++}`);
      values.push(number);
    }
    if (neighborhood !== undefined) {
      fields.push(`neighborhood = $${paramIndex++}`);
      values.push(neighborhood);
    }
    if (city !== undefined) {
      fields.push(`city = $${paramIndex++}`);
      values.push(city);
    }
    if (state !== undefined) {
      fields.push(`state = $${paramIndex++}`);
      values.push(state);
    }
    if (images !== undefined) {
      fields.push(`images = $${paramIndex++}`);
      values.push(images);
    }
    if (price !== undefined) {
      fields.push(`price = $${paramIndex++}`);
      values.push(price);
    }
    if (area !== undefined) {
      fields.push(`area = $${paramIndex++}`);
      values.push(area);
    }
    if (bedrooms !== undefined) {
      fields.push(`bedrooms = $${paramIndex++}`);
      values.push(bedrooms);
    }
    if (bathrooms !== undefined) {
      fields.push(`bathrooms = $${paramIndex++}`);
      values.push(bathrooms);
    }

    values.push(id); // for WHERE clause

    const result = await query(
      `UPDATE properties SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *;`,
      values
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Property not found");
    }

    res.json(result.rows[0] as Property);
  } catch (e) {
    console.log(e);
    res.status(500).send("Error updating property");
  }
});

// Delete property by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await query("DELETE FROM properties WHERE id = $1 RETURNING *;", [id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Property not found");
    }
    res.status(200).send("Property deleted successfully");
  } catch (e) {
    console.log(e);
    res.status(500).send("Error deleting property");
  }
});

export default router;
