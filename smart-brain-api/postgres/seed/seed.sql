BEGIN TRANSACTION;

INSERT INTO users (name, email, entries, joined, age, pet) VALUES ('psyger100', 'psyger100@gmail.com', 5, '2018-01-01', 22, 'Lycagon');
INSERT INTO login (hash, email ) VALUES('$2a$10$mUTRtnroWNZa1y0nnE2F6ujIgMM0XTMziC9QCBkXz.Ka/Qudz.8u6','psyger100@gmail.com');

COMMIT;