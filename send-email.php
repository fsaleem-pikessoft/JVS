<?php
// Contact form email handler
// This script sends emails directly to heelofaizan222@gmail.com

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get form data
$firstName = isset($_POST['firstName']) ? htmlspecialchars($_POST['firstName']) : '';
$lastName = isset($_POST['lastName']) ? htmlspecialchars($_POST['lastName']) : '';
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['phone']) ? htmlspecialchars($_POST['phone']) : 'Not provided';
$subject = isset($_POST['subject']) ? htmlspecialchars($_POST['subject']) : '';
$message = isset($_POST['message']) ? htmlspecialchars($_POST['message']) : '';
$serviceType = isset($_POST['serviceType']) ? htmlspecialchars($_POST['serviceType']) : 'Not specified';

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email) || empty($subject) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'All required fields must be filled']);
    exit;
}

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Email configuration
$to = 'heelofaizan222@gmail.com';
$emailSubject = 'Contact Form: ' . $subject;
$fromEmail = 'noreply@jvstaxservices.com'; // Change to your domain email if available
$fromName = 'JVS Tax Services Contact Form';

// Create email body
$emailBody = "New Contact Form Submission from JVS Tax Services Website\n\n";
$emailBody .= "Name: {$firstName} {$lastName}\n";
$emailBody .= "Email: {$email}\n";
$emailBody .= "Phone: {$phone}\n";
$emailBody .= "Subject: {$subject}\n";
$emailBody .= "Service Type: {$serviceType}\n\n";
$emailBody .= "Message:\n{$message}\n\n";
$emailBody .= "---\n";
$emailBody .= "This email was sent from the JVS Tax Services contact form.\n";

// Email headers
$headers = "From: {$fromName} <{$fromEmail}>\r\n";
$headers .= "Reply-To: {$firstName} {$lastName} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
$mailSent = mail($to, $emailSubject, $emailBody, $headers);

if ($mailSent) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please try again later.'
    ]);
}
?>

