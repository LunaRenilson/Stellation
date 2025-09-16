# Stellation

## Project Purpose and Problem Solved

Stellation is a comprehensive platform designed to facilitate property rental management by integrating backend services, smart contracts, and a frontend interface. The main problem it addresses is the inefficiency and lack of transparency in traditional property rental processes. By leveraging blockchain technology through smart contracts, it ensures secure, transparent, and automated rental agreements and payments, reducing disputes and increasing trust between tenants and landlords.

---

## Backend

The backend is built using Node.js with Express and TypeScript. It provides RESTful APIs to manage entities such as persons, properties, contracts, payments, and posts. The backend handles database interactions, business logic, and serves as the bridge between the frontend and the blockchain smart contracts.

### API Routes and Functionality

The backend provides RESTful API endpoints organized into modular routes. Currently implemented routes include:

#### Persons (`/persons`)
- **GET /persons**: Retrieves a list of all persons in the system.
- **GET /persons/:id**: Retrieves a specific person by their ID.
- **POST /persons**: Creates a new person record. Required fields: name, age, document, email, password. Optional: phone, documentStatus.
- **PUT /persons/:id**: Updates an existing person by ID. Accepts partial updates for fields like name, age, document, email, password, phone, documentStatus.
- **DELETE /persons/:id**: Deletes a person by ID.

#### Properties (`/properties`)
- **GET /properties**: Retrieves a list of all properties in the system.
- **GET /properties/:id**: Retrieves a specific property by its ID.
- **POST /properties**: Creates a new property listing. Required fields: ownerId, description, type, zipCode, address, number, neighborhood, city, state, price, area, bedrooms, bathrooms. Optional: images.
- **PUT /properties/:id**: Updates an existing property by ID. Accepts partial updates for fields like ownerId, description, type, zipCode, address, number, neighborhood, city, state, images, price, area, bedrooms, bathrooms.
- **DELETE /properties/:id**: Deletes a property by ID.

#### Contracts (Planned)
- **GET /contracts**: Retrieves a list of all rental contracts.
- **GET /contracts/:id**: Retrieves a specific contract by ID, including details like property, tenant, landlord, contract hash, value, dates, and payment status.
- **POST /contracts**: Creates a new rental contract. Required fields: propertyId, tenantId, landlordId, contractHash, value, startDate, endDate. Initializes paymentStatus as "pending".
- **PUT /contracts/:id**: Updates contract details, such as extending endDate or updating paymentStatus.
- **DELETE /contracts/:id**: Terminates a contract (with appropriate checks for active payments).

Contracts automate rental agreements, enforce terms via smart contracts, and track payment statuses to ensure compliance.

#### Payments (Planned)
- **GET /payments**: Retrieves all payment records.
- **GET /payments/:id**: Retrieves a specific payment by ID.
- **POST /payments**: Records a new payment linked to a contract. Required fields: contractId, amount, dueDate. Optional: txHash for blockchain transactions.
- **PUT /payments/:id**: Updates payment status (e.g., from "pending" to "paid") and adds txHash upon blockchain confirmation.
- **GET /payments/contract/:contractId**: Retrieves all payments for a specific contract.

Payments integrate with Stellar blockchain for secure, transparent transactions, reducing disputes.

#### Posts (Planned)
- **GET /posts**: Retrieves property-related posts or announcements.
- **GET /posts/:id**: Retrieves a specific post by ID.
- **POST /posts**: Creates a new post. Required fields: propertyId, title, content. Status defaults to "active".
- **PUT /posts/:id**: Updates post content or status (active, inactive, archived).
- **DELETE /posts/:id**: Deletes a post.

Posts allow landlords to announce property availability or updates.

The backend uses a PostgreSQL database for persistent storage and organizes API endpoints in modular routes for scalability and maintainability. All endpoints return JSON responses and use standard HTTP status codes for success and error handling.

---

## Smart Contract

The smart contract component (located in the `contracts` directory) implements the rental agreements on the blockchain. It automates contract enforcement, payment tracking, and status updates, ensuring immutability and transparency. This reduces the need for intermediaries and manual contract management.

### Main Functionality

The smart contract is built on the Stellar blockchain to handle decentralized rental agreements and payments. It uses data structures (structs) to store contract and payment information immutably on the blockchain.

#### Data Structures (Structs)

- **ContractData**:
  - `contractId`: Unique identifier for the contract.
  - `propertyId`: ID of the property being rented.
  - `tenantId`: ID of the tenant.
  - `landlordId`: ID of the landlord.
  - `contractHash`: Cryptographic hash of the contract terms for integrity verification.
  - `value`: Rental value or amount.
  - `startDate`: Start date of the rental period.
  - `endDate`: End date of the rental period.
  - `paymentStatus`: Current status ("pending", "paid", "late").
  - `createdAt`: Timestamp of contract creation.

- **PaymentData**:
  - `paymentId`: Unique identifier for the payment.
  - `contractId`: ID of the associated contract.
  - `amount`: Payment amount.
  - `dueDate`: Due date for the payment.
  - `paidAt`: Timestamp when payment was made (optional).
  - `txHash`: Stellar transaction hash for the payment.
  - `status`: Payment status ("pending", "paid", "late").

These structs are stored in Stellar's ledger, ensuring all transaction data is transparent, tamper-proof, and accessible for verification.

#### Key Functions

- **deployContract(propertyId, tenantId, landlordId, value, startDate, endDate)**: Deploys a new rental contract on the blockchain. It creates a unique contract hash, sets the rental terms (value, dates), and initializes payment status to "pending". This function ensures the contract is immutable and verifiable. It stores a ContractData struct on the ledger.

- **makePayment(contractId, amount, dueDate)**: Processes a payment from the tenant to the landlord. It verifies the payment amount against the contract value, records the transaction hash on the blockchain, and updates the payment status to "paid" if successful. If the payment is late, it marks the status as "late" and may trigger penalties. It stores a PaymentData struct for each payment transaction.

- **checkPaymentStatus(contractId)**: Queries the blockchain to retrieve the current payment status for a contract. It checks transaction confirmations and returns whether payments are pending, paid, or late, providing real-time transparency. It reads from the stored PaymentData structs.

- **verifyContractHash(contractId, hash)**: Verifies the integrity of a contract by comparing the stored hash on the blockchain with the provided hash. This prevents tampering and ensures the contract terms remain unchanged. It compares against the contractHash in ContractData.

- **terminateContract(contractId)**: Ends a rental contract prematurely or upon expiration. It finalizes all outstanding payments, releases any escrowed funds, and updates the contract status to "terminated". It updates the ContractData struct and marks related PaymentData as finalized.

These functions leverage Stellar's fast, low-cost transactions to automate rental processes, reduce intermediaries, and provide a trustless environment for property rentals. All data is stored in the blockchain ledger for permanent, auditable records.

---

## Frontend

The frontend (located in the `frontend` directory) provides a user-friendly interface for tenants, landlords, and administrators to interact with the platform. It communicates with the backend APIs and displays real-time data regarding properties, contracts, and payments.

Key features:
- Responsive UI for managing properties and contracts.
- Integration with backend APIs for data retrieval and updates.
- User authentication and role-based access control.
- Visualization of contract and payment statuses.

---

This architecture ensures a seamless and secure property rental experience by combining traditional backend services with blockchain technology and an intuitive frontend interface.
