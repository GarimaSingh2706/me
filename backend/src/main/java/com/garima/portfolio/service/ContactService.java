package com.garima.portfolio.service;

import com.garima.portfolio.dto.ContactRequest;
import com.garima.portfolio.entity.ContactMessage;
import com.garima.portfolio.repository.ContactMessageRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final Logger log =
            LoggerFactory.getLogger(ContactService.class);

    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;

    public ContactService(
            ContactMessageRepository contactMessageRepository,
            EmailService emailService) {

        this.contactMessageRepository = contactMessageRepository;
        this.emailService = emailService;
    }

    public void saveContact(ContactRequest request) {

        log.info("CONTACT SERVICE REACHED");

        // 1. Create the contact message
        ContactMessage contactMessage = new ContactMessage();

        contactMessage.setName(request.getName());
        contactMessage.setEmail(request.getEmail());
        contactMessage.setSubject(request.getSubject());
        contactMessage.setMessage(request.getMessage());

        // 2. Save the message to PostgreSQL
        contactMessageRepository.save(contactMessage);

        log.info("CONTACT MESSAGE SAVED TO DATABASE");

        // 3. Send the owner notification and visitor acknowledgement
        log.info("CALLING EMAIL SERVICE");

        emailService.sendContactEmails(request);

        log.info("EMAIL SERVICE CALL COMPLETED");
    }
}