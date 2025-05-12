<?php

//ini_set('display_errors', 1);
//error_reporting(E_ALL);

function is_json($string) {
    json_decode($string);
    return json_last_error() === JSON_ERROR_NONE;
}

// Get the Origin header from the incoming request
$origin = '';
if (isset($_SERVER['HTTP_HOST'])) {
    $origin = $_SERVER['HTTP_HOST'];
}
if (isset($_SERVER['HTTP_ORIGIN'])) {
    $origin = $_SERVER['HTTP_ORIGIN'];
}



function resizeAndCompressImage($file, $destination, $maxWidth, $maxHeight, $quality = 50) {
    // Load the image
    $imagePath = $file;
    $imageInfo = getimagesize($imagePath);
    $mimeType = $imageInfo['mime'];

    switch ($mimeType) {
        case 'image/jpeg':
            $srcImage = imagecreatefromjpeg($imagePath);
            break;
        case 'image/png':
            $srcImage = imagecreatefrompng($imagePath);
            break;
        case 'image/gif':
            $srcImage = imagecreatefromgif($imagePath);
            break;
        default:
            return ['error' => 'Unsupported image format'];
    }

    // Get original dimensions
    $originalWidth = imagesx($srcImage);
    $originalHeight = imagesy($srcImage);

    // New desired width (keep aspect ratio)
    $newWidth = 2200;
    $newHeight = (int) ($originalHeight * ($newWidth / $originalWidth));

    // Create a new image with the new dimensions
    $resizedImage = imagecreatetruecolor($newWidth, $newHeight);

    // Resample the image to the new size
    imagecopyresampled($resizedImage, $srcImage, 0, 0, 0, 0, $newWidth, $newHeight, $originalWidth, $originalHeight);

    // Get the real path to save the resized image in a folder
    $savePath = './' . $_GET['name']; // Assuming the 'images' folder is inside your document root

    // Save the resized image (JPEG format)
    imagejpeg($resizedImage, $savePath);

    // Free memory
    imagedestroy($srcImage);
    imagedestroy($resizedImage);

    return ['success' => 'Image resized and compressed successfully'];
}

function resizeCenterCompressImage($sourceImagePath, $targetWidth, $targetHeight, $outputImagePath, $quality = 75) {
    // Load the source image (JPEG example, but you can use PNG or GIF as well)
    $imageInfo = getimagesize($sourceImagePath);
    $mimeType = $imageInfo['mime'];

    switch ($mimeType) {
        case 'image/jpeg':
        case 'image/jpg':
            $srcImage = imagecreatefromjpeg($sourceImagePath);
            break;
        case 'image/png':
            $srcImage = imagecreatefrompng($sourceImagePath);
            break;
        case 'image/gif':
            $srcImage = imagecreatefromgif($sourceImagePath);
            break;
        default:
            return ['error' => 'Unsupported image format'];
    }

    $quality = 60;  // Set JPEG compression level (0-100)
    $savePath = './' . basename($_GET['name']);
    imagejpeg($srcImage, $savePath, $quality); // Save as JPEG

    // Clean up resources
    imagedestroy($srcImage);

    return ['success' => 'Image compressed successfully'];
}

function safeUnlink($filePath) {
    // Check if the file exists
    if (file_exists($filePath)) {
        // Check if the file is writable
        if (is_writable($filePath)) {
            // Attempt to unlink (delete) the file
            if (unlink($filePath)) {
                return ['success' => 'The file has been successfully deleted.'];
            } else {
                return ['error' => 'There was an error deleting the file. Please check permissions.'];
            }
        } else {
            return ['error' => 'The file is not writable. Cannot delete the file.'];
        }
    } else {
        return ['error' => 'File does not exist.'];
    }
}



if (isset($_COOKIE['PHPSESSID'])) {
  
      
        $extension = explode(".", $_FILES["file"]["name"]);
        $imageFileType = $extension[count($extension) - 1];
        $extensions_array1 = ["mp3", "mp4", "pdf"];
        $target_dir = "./";
        $target_file = $_GET["name"] ? $target_dir . basename(html_entity_decode(htmlspecialchars(strip_tags($_GET["name"])))) : exit;

        if (in_array($imageFileType, $extensions_array1)) {
           $uploadDir = '/var/www/html/api/uploads/';
            $uploadFile = $uploadDir . basename($_FILES['file']['name']);

            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);  // Create the directory if it doesn't exist
            }

            if (move_uploaded_file($_FILES['file']['tmp_name'], "/var/www/html/api/uploadfile/" .  $_GET["name"])) {
          
              
                    
                echo json_encode(['success' => $_GET["name"]]);
                exit();
            } else {
                echo json_encode(['error' => "Sorry, there was an error uploading your file."]);
                exit();
            }
        }

        $date = new DateTime();
        $timestamp = $date->getTimestamp();
        $str = isset($_GET['name']) ? mb_convert_encoding(urldecode(html_entity_decode(htmlspecialchars(strip_tags($_GET['name'])))), 'ISO-8859-1', 'UTF-8') : exit;
        $str = str_ends_with($str, '=') ? str_replace('=', '', $str) : $str;
        $uploadOk = 1;
        $imageFileTypes = ["jpg", "png", "jpeg"];

        // Check if image file is a actual image or fake image
        if (in_array($imageFileType, $imageFileTypes) && isset($_FILES["file"]["tmp_name"])) {
            if (isset($_FILES["file"]["tmp_name"]) && $_FILES["file"]["tmp_name"] != '') {
                $check = getimagesize($_FILES["file"]["tmp_name"]);
                if ($check !== false) {
                    $extensions_array = ["jpg", "png", "jpeg"];
                    // Allow certain file formats
                    if (!in_array($imageFileType, $extensions_array)) {
                        echo json_encode(['error' => "Sorry, only JPG, JPEG, PNG & GIF files are allowed."]);
                        $uploadOk = 0;
                    }

                    // Check if $uploadOk is set to 0 by an error
                    if ($uploadOk == 0) {
                        echo json_encode(['error' => $_GET["name"] . ' nok']);
                    } else {
                        // Example usage
                        /* $sourceImagePath = $_FILES["file"]["tmp_name"];
                        $targetWidth = 1950;
                        $targetHeight = 1050;
                        $outputImagePath = $_GET["name"];
                        $quality = 75;  // JPEG compression quality (1 = worst, 100 = best)
                        $filePath = './' . basename($_GET['name']);
                        safeUnlink($filePath);
                        resizeCenterCompressImage($sourceImagePath, $targetWidth, $targetHeight, $outputImagePath, $quality);*/
                        $uploadDir = '/var/www/html/api/uploadfile/';
                        $uploadFile = $uploadDir . $_GET['name'];

                        if (!file_exists($uploadDir)) {
                            mkdir($uploadDir, 0777, true);  // Create the directory if it doesn't exist
                        }

                        if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
          
                            echo json_encode(['success' => $_GET["name"]]);
                        } else {
                            echo json_encode(['error' => "Possible file upload attack"]);
                        
                        }
                    }
                } else {
                    echo json_encode(['error' => "File is not an image."]);
                    exit();
                }
            }
        } else {
            echo json_encode(['error' => "Invalid file type."]);
            exit();
        }
    } else {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden: Invalid token']);
        exit();
    }

?>
