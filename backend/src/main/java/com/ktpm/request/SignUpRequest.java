package com.ktpm.request;


import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class SignUpRequest {
    private String email;
    private String password;
    private String name;
    private String birthdate;
    private Integer age;
    private String gender;
    private String phone;
}
