-- schema/02_create_urls.sql
DROP TABLE IF EXISTS collections CASCADE;
-- CREATE URLS
CREATE TABLE collections (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  pokemon_id INTEGER NOT NULL,
  caught_normal BOOLEAN,
  caught_shiny BOOLEAN
);