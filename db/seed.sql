-- Seed data for the database

-- Insert sample persons
INSERT INTO persons (name, age, document, email, password, phone, document_status) VALUES
('John Doe', 30, '123456789', 'john@example.com', 'password123', '1234567890', true),
('Jane Smith', 25, '987654321', 'jane@example.com', 'password123', '0987654321', true),
('Alice Johnson', 35, '456789123', 'alice@example.com', 'password123', '1122334455', false);

-- Insert sample properties
INSERT INTO properties (owner_id, description, type, zip_code, address, number, neighborhood, city, state, images, price, area, bedrooms, bathrooms) VALUES
(1, 'Beautiful apartment in the city center', 'apartment', '12345-678', 'Main Street', '100', 'Downtown', 'New York', 'NY', ARRAY['image1.jpg', 'image2.jpg'], 1500.00, 80.5, 2, 1),
(2, 'Spacious house with garden', 'house', '54321-876', 'Elm Street', '200', 'Suburb', 'Los Angeles', 'CA', ARRAY['house1.jpg', 'house2.jpg'], 2500.00, 150.0, 3, 2),
(1, 'Cozy studio for rent', 'studio', '11111-222', 'Oak Avenue', '50', 'Midtown', 'Chicago', 'IL', ARRAY['studio1.jpg'], 1000.00, 50.0, 1, 1);

-- Insert sample contracts
INSERT INTO contracts (property_id, tenant_id, landlord_id, contract_hash, value, start_date, end_date, payment_status) VALUES
(1, 2, 1, 'hash123456', 1500.00, '2023-01-01', '2023-12-31', 'pending'),
(2, 3, 2, 'hash789012', 2500.00, '2023-02-01', '2024-01-31', 'paid');

-- Insert sample posts
INSERT INTO posts (property_id, title, content, status) VALUES
(1, 'Great apartment available', 'Check out this amazing apartment in the heart of the city.', 'active'),
(2, 'Family house for rent', 'Perfect for families, with a large garden.', 'active'),
(3, 'Affordable studio', 'Ideal for students or young professionals.', 'inactive');

-- Insert sample payments
INSERT INTO payments (contract_id, amount, due_date, status) VALUES
(1, 1500.00, '2023-01-01', 'pending'),
(2, 2500.00, '2023-02-01', 'paid');
w