<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize form inputs
    $firstName = htmlspecialchars(trim($_POST['firstName']));
    $lastName = htmlspecialchars(trim($_POST['lastName']));
    $email = htmlspecialchars(trim($_POST['email']));
    $phone = htmlspecialchars(trim($_POST['phone']));
    $service = htmlspecialchars(trim($_POST['service']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Set recipient email (your forwarding address)
    $to = "contact@muthungu.co.ke";
    
    // Email configuration
    $subject = "New Contact Form Submission from " . $firstName . " " . $lastName;
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Compose email body
    $emailBody = "Name: " . $firstName . " " . $lastName . "\n";
    $emailBody .= "Email: " . $email . "\n";
    $emailBody .= "Phone: " . $phone . "\n";
    $emailBody .= "Service: " . $service . "\n\n";
    $emailBody .= "Message:\n" . $message;

    // Send email
    if(mail($to, $subject, $emailBody, $headers)) {
        // Redirect to success page
        header("Location: thank-you.html");
        exit();
    } else {
        // Redirect to error page
        header("Location: error.html");
        exit();
    }
}
?>