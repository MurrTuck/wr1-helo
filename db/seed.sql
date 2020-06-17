DROP TABLE IF EXISTS users;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(150),
  username VARCHAR(50)
  hash TEXT
)

DROP TABLE IF EXISTS posts;

CREATE TABLE posts(
  id SERIAL PRIMARY KEY,
  post_title VARCHAR(200),
  post_body VARCHAR(500)
)


ALTER TABLE users
ADD COLUMN username TEXT;

ALTER TABLE users
ALTER password
SET DATA TYPE TEXT

ALTER TABLE users
DROP COLUMN hash;

-- updating passwords
UPDATE users
SET password = 'e'
WHERE id = 1

UPDATE users
SET password = 'm'
WHERE id = 2

--DUMMY DATA

-- INSERT INTO users (
-- first_name,
-- last_name,
-- email,
-- hash
-- ) VALUES (
-- 'Earl',
-- 'Dibbles',
-- 'hillbilly@yeeyee.com',
-- 'm'
-- );

-- INSERT INTO posts (
-- post_title,
-- post_body
-- ) VALUES (
-- 'The Adventures of Earl Dibbles',
-- 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus veritatis quasi et illum placeat!'
-- )

--I was messing with the --> ' <-- in the title of the post. 
-- INSERT INTO posts (
-- post_title,
-- post_body
-- ) VALUES (
-- 'Murr''s High Heat',
-- 'Possimus veritatis quasi et illum placeat! Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
-- )
