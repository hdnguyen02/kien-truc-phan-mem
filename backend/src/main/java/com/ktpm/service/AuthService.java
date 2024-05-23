package com.ktpm.service;

import com.ktpm.Helper;
import com.ktpm.dao.TokenDao;
import com.ktpm.dao.UserDao;
import com.ktpm.dto.UserDto;
import com.ktpm.entity.Role;
import com.ktpm.entity.Token;
import com.ktpm.entity.User;
import com.ktpm.request.SignInRequest;
import com.ktpm.request.SignUpRequest;
import com.ktpm.response.AuthResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserDao userDao;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final Helper helper;
    private final TokenDao tokenDao;


    private void saveToken(String code, User user){
        System.out.println(user);
        Token token = Token.builder().code(code).isSignOut(false).user(user).build();
        try {
            tokenDao.save(token);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
        }

    }
    

    public AuthResponse signUp(SignUpRequest signUpRequest) throws Exception {
        Role role = new Role("USER");
        Set<Role> roles = new HashSet<>();
        roles.add(role);

        User userCheck =  userDao.findById(signUpRequest.getEmail()).orElse(null);
        if (userCheck != null) throw new Exception("Email đã được sử dụng!");
        if (signUpRequest.getPassword().length() < 6) throw new Exception("Password cần phải >= 6 ký tự!");
        var user = User.builder()
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .name(signUpRequest.getName())
                .birthdate(signUpRequest.getBirthdate())
                .gender(signUpRequest.getGender())
                .age(signUpRequest.getAge())
                .phone(signUpRequest.getPhone())
                .createAt(helper.formatDate(new Date()))
                .isEnabled(true)
                .roles(roles)
                .build();

        try {
            String accessToken = jwtService.generateToken(userDao.save(user));
            // saveToken(accessToken, user);

            return AuthResponse.builder()
                    .accessToken(accessToken)
                    .user(new UserDto(user))
                    .build();
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public AuthResponse signIn(SignInRequest signInRequest) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                signInRequest.getEmail(), signInRequest.getPassword()
        ));

        User user = userDao.findById(signInRequest.getEmail()).orElseThrow();
        String accessToken = jwtService.generateToken(user);
        // saveToken(accessToken, user);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .user(new UserDto(user))
                .build();
    }

}

