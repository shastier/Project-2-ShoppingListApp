--- Create a cart
    INSERT INTO carts (description)
    VALUES ('Hastier');

--- When create a new user, if the house has already a cart,
    --- assig that cart to the user.
    INSERT INTO users_carts (user_id, cart_id)
    VALUES (1,1);

--- Add item to cart
INSERT INTO cart_items (cart_id, item_id) VALUES
    (1, 3),
    (1, 7),
    (1, 22);