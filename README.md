# ![English](https://flagcdn.com/40x30/gb.png)

This docker will allow you to visualize the full app with docker :

please run docker-compose up --build

You have to run script api\bdd.sql in phpmyadmin under static_cms

To access backoffice on localhost:3000, you will need to create credentials:

- an email address
- a password built as following :

At least 8 characters in total.

At least one uppercase letter (A to Z).

At least one lowercase letter (a to z).

At least one number (0 to 9).

You must convert this password in a hash on this website https://onlinephp.io/password-hash and add these as following in bdd through phpmyadmin
INSERT INTO `user` (`id`, `email`, `password`, `token`, `connection_attempts`) VALUES (NULL, 'your_email_address', 'your_password_hashed', '', 0);

You will then be able to access the BO

Last updates are not yet all available on this branch.

.env at the root of the project should be added with following values

DB_HOST = "mysql"

DB_PORT = "3306"

DB_USER = "root"

DB_PASSWORD = "admin"

DB_NAME = "static_cms"

ALLOWED_ORIGIN ="http://localhost:3000"

NEXT_PUBLIC_VITE_REACT_APP_BACKEND_URL="http://localhost"

NEXT_PUBLIC_VITE_REACT_APP_FRONTEND_IMAGE_URL="http://localhost"

NEXT_PUBLIC_SECRET="chose a set of characters of your choice and replace this value"

NEXT_HOST="http://localhost:3000"
