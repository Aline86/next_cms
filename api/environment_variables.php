<?php

// Check if the file exists
if (file_exists($envFile)) {

    // Read the file
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        // Remove comments and spaces
        $line = trim($line);
        if (empty($line) || $line[0] === '#') {
            continue; // Skip empty lines and comments
        }

        // Split the line by the first '=' to get key and value
        list($key, $value) = explode('=', $line, 2);

        // Trim spaces and handle quotes
        $key = trim($key);
        $value = trim($value);

        // Optionally remove quotes around the value
        if ((($value[0] === '"' && $value[-1] === '"') || ($value[0] === "'" && $value[-1] === "'")) && strlen($value) > 1) {
            $value = substr($value, 1, -1);
        }

        // Set the environment variable
        putenv("$key=$value");

        // Alternatively, you can populate the $_ENV array
        $_ENV[$key] = $value;
       
    }
  
} 


?>