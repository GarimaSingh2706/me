
package com.garima.portfolio.service;

import com.garima.portfolio.dto.ContactRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    private static final Logger log =
            LoggerFactory.getLogger(EmailService.class);

    @Value("${resend.api.key}")
    private String resendApiKey;

    @Value("${portfolio.owner.email}")
    private String ownerEmail;

    @Value("${portfolio.sender.email}")
    private String senderEmail;

    @Async
    public void sendContactEmails(ContactRequest request) {

        log.info("EmailService called.");

        sendEmail(
                ownerEmail,
                "New Portfolio Contact: " + request.getSubject(),
                "You have received a new message through your portfolio.\n\n"
                        + "Name: " + request.getName() + "\n"
                        + "Email: " + request.getEmail() + "\n"
                        + "Subject: " + request.getSubject() + "\n\n"
                        + "Message:\n" + request.getMessage(),
                "OWNER"
        );

        sendEmail(
                request.getEmail(),
                "Thank you for contacting Garima",
                "Hi " + request.getName() + ",\n\n"
                        + "Thank you for contacting me through my portfolio!\n\n"
                        + "I have received your message and will get in touch "
                        + "with you soon.\n\n"
                        + "Best regards,\n"
                        + "Garima Singh\n"
                        + "Full Stack Developer",
                "VISITOR"
        );
    }

    private void sendEmail(
            String recipient,
            String subject,
            String messageText,
            String emailType) {

        try {
            Map<String, Object> payload = Map.of(
                    "from", senderEmail,
                    "to", List.of(recipient),
                    "subject", subject,
                    "text", messageText
            );

            RestClient.create()
                    .post()
                    .uri("https://api.resend.com/emails")
                    .header("Authorization", "Bearer " + resendApiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(payload)
                    .retrieve()
                    .toBodilessEntity();

            log.info("{} email accepted by Resend.", emailType);

        } catch (Exception e) {
            log.error("{} EMAIL FAILED", emailType, e);
        }
    }
}
