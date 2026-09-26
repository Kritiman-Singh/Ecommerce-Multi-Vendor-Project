package com.zosh.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private BrevoEmailService brevoEmailService;

    public void sendVerificationOtpEmail(
            String userEmail,
            String otp,
            String subject,
            String text
    ) {

        try {

            brevoEmailService.sendOtpEmail(
                    userEmail,
                    otp,
                    subject
            );

        } catch (Exception e) {

            System.out.println("Mail send failed: " + e.getMessage());

            throw new RuntimeException(
                    "Failed to send verification email",
                    e
            );
        }
    }
}
