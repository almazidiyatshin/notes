UPDATE "User" SET email = concat(login, '@example.ru')
WHERE email IS NULL