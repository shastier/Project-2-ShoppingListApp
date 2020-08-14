-- many to many relationship. Different users from the same household
-- can share same cart. And an user can have different carts, that represent
-- different dates for future apps versions.
CREATE TABLE IF NOT EXISTS users_carts (
	id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    cart_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (cart_id) REFERENCES carts(id)
);