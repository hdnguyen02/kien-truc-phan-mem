package com.ktpm.dto;

import com.ktpm.entity.Role;
import com.ktpm.entity.User;
import lombok.*;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserDto {
    private String email;
    private String name;
    private String birthdate;
    private String createAt;
    private Boolean isEnabled;
    private Set<Role> roles;
    public UserDto(User user) {
        email = user.getEmail();
        name = user.getName();
        birthdate = user.getBirthdate();
        createAt = user.getCreateAt();
        isEnabled = user.getIsEnabled();
        roles = user.getRoles();
    }
}
    