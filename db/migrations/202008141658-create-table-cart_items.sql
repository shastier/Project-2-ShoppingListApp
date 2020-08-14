-- a cart can have zero or many items.
CREATE TABLE IF NOT EXISTS cart_items (
	id SERIAL PRIMARY KEY,
    cart_id INTEGER NOT NULL,
    item_id INTEGER,
    FOREIGN KEY (cart_id) REFERENCES carts(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);