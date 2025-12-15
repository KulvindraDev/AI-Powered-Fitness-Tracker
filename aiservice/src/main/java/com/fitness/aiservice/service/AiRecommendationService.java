package com.fitness.aiservice.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class AiRecommendationService {
    private final WebClient webClient;

    @Value("${openrouter.api.url}")
    private String apiUrl;

    @Value("${openrouter.api.key}")
    private String apiKey;

    public AiRecommendationService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.build();
    }

    public String getRecommendations(String details) {
        Map<String, Object> requestBody = Map.of(
                "model", "openai/gpt-oss-20b:free",
                "messages", new Object[] {
                        Map.of(
                                "role", "user",
                                "content", details)
                });

        String response = webClient.post()
                .uri(apiUrl)
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + apiKey)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response);
            String content = root.path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();
            return "{\"candidates\": [{\"content\": {\"parts\": [{\"text\": \"" +
                    content.replace("\"", "\\\"").replace("\n", "\\n") +
                    "\"}]}}]}";
        } catch (Exception e) {
            e.printStackTrace();
            return response;
        }
    }
}
