package com.main.typeRacer.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

@Service
public class FactService {

    private final String apiUrl = "https://api.api-ninjas.com/v1/facts";
    private final String apiKey = "NBTb2x7Pmrdb/yegBcPPWA==sqPjIoB5B7MnDSHM";

    public String getRandomFact() {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Api-Key", apiKey);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                entity,
                String.class
        );

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode root = objectMapper.readTree(response.getBody());
            return root.get(0).get("fact").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return "Could not fetch fact";
        }
    }
}