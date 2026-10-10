
package com.garima.portfolio.controller;

import com.garima.portfolio.dto.ContactRequest;
import com.garima.portfolio.service.ContactService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = {
    "http://localhost:4200",
    "https://me-two-umber.vercel.app"
})
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<String> submitContact(
            @Valid @RequestBody ContactRequest request) {

        contactService.saveContact(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body("Contact message submitted successfully!");
    }
}
