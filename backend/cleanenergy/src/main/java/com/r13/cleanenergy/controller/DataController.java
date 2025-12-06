package com.r13.cleanenergy.controller;

import com.r13.cleanenergy.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/data")
@CrossOrigin(origins = "http://localhost:4200")
public class DataController {

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/chart1")
    public ResponseEntity<?> getChart1Data(@RequestHeader("Authorization") String authHeader) {
        if (!validateToken(authHeader)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        // Chart 1: Hydropower Capacity by Project (MW)
        List<Map<String, Object>> data = Arrays.asList(
            createDataPoint("Paredinha (Brazil)", 21.9),
            createDataPoint("Svean (Norway)", 36.0),
            createDataPoint("Øksenelvane (Norway)", 110.0),
            createDataPoint("Inga I & II (DRC)", 1774.0)
        );

        return ResponseEntity.ok(data);
    }

    @GetMapping("/chart2")
    public ResponseEntity<?> getChart2Data(@RequestHeader("Authorization") String authHeader) {
        if (!validateToken(authHeader)) {
            return ResponseEntity.status(401).body("Unauthorized");
        }

        // Chart 2: Annual Energy Production (GWh)
        List<Map<String, Object>> data = Arrays.asList(
            createDataPoint("Svean (Norway)", 132.0),
            createDataPoint("Øksenelvane (Norway)", 171.0),
            createDataPoint("SFE Total Portfolio", 2400.0)
        );

        return ResponseEntity.ok(data);
    }

    private Map<String, Object> createDataPoint(String label, double value) {
        Map<String, Object> point = new HashMap<>();
        point.put("label", label);
        point.put("value", value);
        return point;
    }

    private boolean validateToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return false;
        }
        String token = authHeader.substring(7);
        try {
            String username = jwtUtil.getUsernameFromToken(token);
            return jwtUtil.validateToken(token, username);
        } catch (Exception e) {
            return false;
        }
    }
}