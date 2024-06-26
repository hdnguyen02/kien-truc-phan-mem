package com.ktpm.dto;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SignUpRequest {
    private String email;
    private String password;
    private String name; // khi đăng ký bắt buộc.
    private Boolean isRemember;
}
