#!/bin/bash

# Check if the environment variable is set, if not, default to /var/www/html/tmp
: ${PHP_UPLOAD_TMP_DIR:=/var/www/html/tmp}

# Replace the placeholder in php.ini.template with the value of the environment variable
envsubst < /usr/local/etc/php/conf.d/php.ini.template > /usr/local/etc/php/conf.d/php.ini

# Start PHP-FPM
exec php-fpm
