package com.zosh.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

// Public health check - bina login/token ke kahi se bhi access hoga.
// Render / uptime monitor se server alive hai ya nahi, ye hit karke pata chalega:
//   GET https://tumhara-backend.onrender.com/health
@RestController
@RequestMapping("/health")
public class HealthController {

    @GetMapping
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> body = new HashMap<>();
        body.put("status", "UP");
        body.put("service", "ecommerce-multi-vendor");
        body.put("timestamp", LocalDateTime.now().toString());
        return new ResponseEntity<>(body, HttpStatus.OK);
    }
}
