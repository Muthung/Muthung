<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $service = htmlspecialchars($_POST['service']);
    $message = htmlspecialchars($_POST['message']);

    $to = "muthunguclintn@gmail.com"; // Replace with your Gmail address
    $subject = "New Contact Form Submission";
    $body = "You have received a new message from your contact form:\n\n" .
            "First Name: $firstName\n" .
            "Last Name: $lastName\n" .
            "Email: $email\n" .
            "Phone: $phone\n" .
            "Service: $service\n\n" .
            "Message:\n$message";

    $headers = "From: $email\r\n" .
               "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send the message. Please try again.";
    }
}
?>