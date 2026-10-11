package com.garima.portfolio.service;

import com.garima.portfolio.dto.ContactRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private static final Logger log =
            LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${portfolio.owner.email}")
    private String ownerEmail;

    @Value("${spring.mail.username}")
    private String senderEmail;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendContactEmails(ContactRequest request) {

        log.info("EmailService called.");

        try {
            SimpleMailMessage ownerMessage = new SimpleMailMessage();
            ownerMessage.setFrom(senderEmail);
            ownerMessage.setTo(ownerEmail);
            ownerMessage.setReplyTo(request.getEmail());
            ownerMessage.setSubject(
                    "New Portfolio Contact: " + request.getSubject()
            );
            ownerMessage.setText(
                    "You have received a new message through your portfolio.\n\n"
                    + "Name: " + request.getName() + "\n"
                    + "Email: " + request.getEmail() + "\n"
                    + "Subject: " + request.getSubject() + "\n\n"
                    + "Message:\n" + request.getMessage()
            );

            log.info("Attempting owner notification.");
            mailSender.send(ownerMessage);
            log.info("Owner notification accepted by mail server.");

        } catch (Exception e) {
            log.error("OWNER EMAIL FAILED", e);
        }

        try {
            SimpleMailMessage visitorMessage = new SimpleMailMessage();
            visitorMessage.setFrom(senderEmail);
            visitorMessage.setTo(request.getEmail());
            visitorMessage.setSubject("Thank you for contacting Garima");
            visitorMessage.setText(
                    "Hi " + request.getName() + ",\n\n"
                    + "Thank you for contacting me through my portfolio!\n\n"
                    + "I have received your message and will get in touch "
                    + "with you soon.\n\n"
                    + "Best regards,\n"
                    + "Garima Singh\n"
                    + "Full Stack Developer"
            );

            log.info("Attempting visitor acknowledgement.");
            mailSender.send(visitorMessage);
            log.info("Visitor acknowledgement accepted by mail server.");

        } catch (Exception e) {
            log.error("VISITOR EMAIL FAILED", e);
        }
    }
}