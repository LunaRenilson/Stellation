import { Router } from 'express';
import { query } from '../models/db.js';
import { Person } from '../Entities.js';
import Server, { Keypair, Address, Contract } from '@stellar/stellar-sdk';
import crypto from "crypto";
import { getBalance } from '../models/stellar.js';

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

		const pair = Keypair.random();
		console.log('Public Key:', pair.publicKey());
		console.log('Secret Key:', pair.secret());

		// Funding the account using Friendbot (only works on the testnet)
		try {
			const response = await fetch(`https://friendbot.stellar.org?addr=${pair.publicKey()}`);
			const responseJSON = await response.json();
			console.log('Friendbot response:', responseJSON);
		} catch (error) {
			console.error('Error funding account with Friendbot:', error);
		}

		// pair.publicKey() & pair.secret() in database, associating em to created person.
		await query(
			"UPDATE persons SET public_key = $1, private_key = $2 WHERE id = $3;",
			[pair.publicKey(), pair.secret(), result.rows[0].id]
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

router.get("/fund_account/:id", async (req, res) => {

	// Creating a pair of keys
	const pair = Keypair.random();
	console.log('Public Key:', pair.publicKey());
	console.log('Secret Key:', pair.secret());

	// Funding the account using Friendbot (only works on the testnet)
	try {
		const response = await fetch(`https://friendbot.stellar.org?addr=${pair.publicKey()}`);
		const responseJSON = await response.json();
		console.log('Friendbot response:', responseJSON);
	} catch (error) {
		console.error('Error funding account with Friendbot:', error);
	}

	// Check if person exists in database
	const result = await query("SELECT * FROM persons WHERE id = $1;", [req.params.id]);
	if (result.rows.length === 0) {
		return res.status(404).send("Person not found");
	}

	// pair.publicKey() & pair.secret() in database, associating em to created person.
	await query(
		"UPDATE persons SET public_key = $1, private_key = $2 WHERE id = $3;",
		[pair.publicKey(), pair.secret(), result.rows[0].id]
	);
});

// Get balance by public key
router.get("/balance/:publicKey", async (req, res) => {
	const { publicKey } = req.params;
	const contract = new Contract("CAQTKL46VVXCU2765KTCLENVSAJBALM3QP2ZSZDUHRYSBH2EBQ2VXSOA");
	try {
		// O endereço deve ser passado como Address
		const addr = new Address(publicKey);

		// Monta a chamada ao método do contrato
		const result = contract.call('read_balance', [addr.toString()]);
		res.json({ publicKey, balance });
	} catch (e) {
		console.error(e);
		res.status(500).send("Error fetching balance from contract");
	}
});



// PROXIMOS PASSOS
// 1. INVOCAR CONTRATO COM NOSSO ADDR COMO ADMIN
// 2. FAZER TRANSFERENCIA DE XLM PARA O CONTRATO

export default router;
