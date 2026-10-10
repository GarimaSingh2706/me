
package com.garima.portfolio.service;

import com.garima.portfolio.dto.ContactRequest;
import com.garima.portfolio.entity.ContactMessage;
import com.garima.portfolio.repository.ContactMessageRepository;

import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;

    public ContactService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }

    public void saveContact(ContactRequest request) {
        ContactMessage contactMessage = new ContactMessage();

        contactMessage.setName(request.getName());
        contactMessage.setEmail(request.getEmail());
        contactMessage.setSubject(request.getSubject());
        contactMessage.setMessage(request.getMessage());

        contactMessageRepository.save(contactMessage);
    }
}
