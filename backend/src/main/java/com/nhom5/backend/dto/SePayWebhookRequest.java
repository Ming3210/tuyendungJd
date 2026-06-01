package com.nhom5.backend.dto;

import lombok.Data;

@Data
public class SePayWebhookRequest {
    private Long id;
    private String gateway;
    private String transactionDate;
    private String accountNumber;
    private String code;
    private String content; // Content is usually in "content" or "transactionContent" depending on SePay version
    private String transactionContent; // We'll accept both to be safe
    private Long transferAmount; 
    private Long amountIn; // Sometimes passed as amountIn
    private String referenceNumber;
    private String body;
}
