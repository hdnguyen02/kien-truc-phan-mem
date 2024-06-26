package com.ktpm.service;


import com.ktpm.dao.UserDao;
import com.ktpm.dto.UserDto;
import com.ktpm.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserDao userDao;

    List<UserDto> getUsers() {
        List<User> users = userDao.findAll();

        return users.stream()
                .map(UserDto::new).toList();
    }

    // bộ thẻ và thẻ làm trong thống kê

    // lấy thông tin từ hóa đơn





}
