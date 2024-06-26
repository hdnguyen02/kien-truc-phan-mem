package com.ktpm.entity;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "user_group")
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "email_user")
    private User user;

    @ManyToOne()
    @JoinColumn(name = "group_id")
    private Group group;

    private String tokenActive;

    private boolean isActive;
}

// người dùng có thể xin vào group => tiến hành xin vào.
// người dùng duyệt.

// khi đăng nhập => bắt buộc nhập vào username.

