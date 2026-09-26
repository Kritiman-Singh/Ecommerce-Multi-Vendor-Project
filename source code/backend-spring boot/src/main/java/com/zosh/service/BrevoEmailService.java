package com.zosh.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class BrevoEmailService {

    private final RestClient restClient;

    @Value("${brevo.api-key}")
    private String apiKey;

    @Value("${brevo.sender-email}")
    private String senderEmail;

    @Value("${brevo.sender-name:Zentro}")
    private String senderName;

    public BrevoEmailService() {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.brevo.com/v3")
                .build();
    }

    public void sendOtpEmail(
            String recipientEmail,
            String otp,
            String subject
    ) {

        String html = """
                <!DOCTYPE html>
                <html>
                <body style="margin:0;padding:0;background:#0b0b0b;
                             font-family:Arial,sans-serif;">

                    <div style="max-width:600px;margin:40px auto;
                                background:#111;border:1px solid #c9a227;
                                border-radius:12px;padding:40px;
                                text-align:center;">

                        <h1 style="color:#d4af37;margin-bottom:10px;">
                            Zentro
                        </h1>

                        <p style="color:#aaa;font-size:14px;
                                  letter-spacing:3px;">
                            LUXURY COMMERCE
                        </p>

                        <h2 style="color:#fff;margin-top:35px;">
                            Verification Code
                        </h2>

                        <p style="color:#ccc;">
                            Use the following OTP to continue:
                        </p>

                        <div style="margin:30px 0;
                                    background:#222;
                                    border:1px solid #d4af37;
                                    border-radius:10px;
                                    padding:20px;">

                            <span style="font-size:36px;
                                         font-weight:bold;
                                         letter-spacing:10px;
                                         color:#d4af37;">
                                %s
                            </span>

                        </div>

                        <p style="color:#888;font-size:13px;">
                            This OTP is valid for a limited time.
                        </p>

                        <p style="color:#666;font-size:12px;
                                  margin-top:30px;">
                            If you didn't request this code,
                            you can safely ignore this email.
                        </p>

                    </div>

                </body>
                </html>
                """.formatted(otp);

        Map<String, Object> requestBody = Map.of(
                "sender", Map.of(
                        "name", senderName,
                        "email", senderEmail
                ),
                "to", new Object[]{
                        Map.of(
                                "email", recipientEmail
                        )
                },
                "subject", subject,
                "htmlContent", html
        );

        restClient.post()
                .uri("/smtp/email")
                .header("api-key", apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .toBodilessEntity();
    }
}