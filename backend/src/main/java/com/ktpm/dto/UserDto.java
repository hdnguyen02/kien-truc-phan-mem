package com.ktpm.dto;

import com.ktpm.entity.Role;
import com.ktpm.entity.User;
import lombok.*;
import org.springframework.data.jpa.repository.query.JSqlParserUtils;

import java.nio.file.Paths;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserDto {
    private String email;
    private String name;
    private String dateOfBirth;
    private String createAt;
    private Boolean isEnabled;
    private Set<Role> roles;
    private String avatar;
    private String gender;
    private String phone;
    private Integer age;
    public UserDto(User user) {
        avatar = user.getAvatar();
        email = user.getEmail();
        name = user.getName();
        dateOfBirth = user.getDateOfBirth();
        createAt = user.getCreateAt();
        isEnabled = user.getIsEnabled();
        gender = user.getGender();
        phone = user.getPhone();
        age= user.getAge();
        roles = user.getRoles();
    }
}
    