-- Person table
CREATE TABLE IF NOT EXISTS persons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INTEGER NOT NULL,
    document VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    document_status BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES persons(id) ON DELETE CASCADE,
    description TEXT,
    type VARCHAR(50),
    zip_code VARCHAR(10),
    address VARCHAR(255),
    number VARCHAR(10),
    neighborhood VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(50),
    images TEXT[], -- Array of image URLs
    price NUMERIC(12,2) NOT NULL,
    area NUMERIC(10,2),
    bedrooms INTEGER,
    bathrooms INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contract table
CREATE TABLE IF NOT EXISTS contracts (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    tenant_id INTEGER REFERENCES persons(id) ON DELETE CASCADE,
    landlord_id INTEGER REFERENCES persons(id) ON DELETE CASCADE,
    contract_hash VARCHAR(255) UNIQUE,
    value NUMERIC(12,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    payment_status VARCHAR(10) CHECK (payment_status IN ('pending', 'paid', 'late')) DEFAULT 'pending'
);

-- Post table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    property_id INTEGER REFERENCES properties(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(10) CHECK (status IN ('active', 'inactive', 'archived')) DEFAULT 'active'
);

-- Payment table
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
    amount NUMERIC(12,2) NOT NULL,
    due_date DATE NOT NULL,
    paid_at TIMESTAMP,
    tx_hash VARCHAR(255),
    status VARCHAR(10) CHECK (status IN ('pending', 'paid', 'late')) DEFAULT 'pending'
);
