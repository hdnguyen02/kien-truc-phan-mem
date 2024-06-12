package com.ktpm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {

    public String code;
    public String message;
    public String paymentUrl;

}
