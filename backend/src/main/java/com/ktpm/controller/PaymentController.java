package com.ktpm.controller;

import com.google.rpc.Help;
import com.ktpm.dao.UserDao;
import com.ktpm.entity.Role;
import com.ktpm.entity.User;
import com.ktpm.response.Response;
import com.ktpm.service.PaymentService;
import com.ktpm.util.Helper;
import jakarta.mail.Header;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("api/v1")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final UserDao userDao;
    private final Helper helper;
    @GetMapping("payment")
    public ResponseEntity<?> getPayment(HttpServletRequest request) {

        System.out.println(helper.getEmailUser());
        String email = request.getParameter("email");
        String urlPayment = paymentService.createVnPayPayment(email, request);

        Response response = new Response();
        response.setSuccess(true);
        response.setData(urlPayment);
        response.setMessage("Tiến hành thanh toán");

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

//    @GetMapping("test")
//    public String test() {
//        User user = helper.getUser();
//        System.out.println(user.getRoles());
//        return "test";
//    }
    @GetMapping("payment-callback")
    public ResponseEntity<?> paymentCallbackHandler(HttpServletRequest request) {

        // lấy ra email
        String email = request.getParameter("email");
        User user = userDao.findById(email).orElseThrow();
        // update user
        user.getRoles().add(Role.builder().name("TEACHER").build());
        userDao.save(user);

        String status = request.getParameter("vnp_ResponseCode");


        if (status.equals("00")) {




            return ResponseEntity.status(HttpStatus.OK)
                    .body(Response.builder().success(true).message("Thanh toán thành công").data(null).build());
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Response.builder().success(false).message("Thanh toán thất bại").data(null).build());
        }
    }
}

