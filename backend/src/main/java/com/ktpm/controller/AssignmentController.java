package com.ktpm.controller;


import com.ktpm.dto.CardDto;
import com.ktpm.request.AssignmentRequest;
import com.ktpm.response.Response;
import com.ktpm.service.AssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("${system.version}")
public class AssignmentController {

    private final AssignmentService assignmentService;
    @PostMapping("/assignments")
    public ResponseEntity<?> filterCards(@RequestParam String name,
                                                @RequestParam String description,
                                                @RequestParam Long idGroup,
                                                @RequestParam String deadline,
                                                @RequestParam MultipartFile file
                                                ) throws Exception {

        Date dDeadline = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(deadline);
        boolean result = assignmentService.createAssignment(name, description, idGroup, dDeadline, file);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/assignments")
    public ResponseEntity<?> getAssignments(@RequestParam(name = "id-group") Long idGroup
    ) throws Exception {

        Response response = new Response();
        response.setData(assignmentService.getAssignments(idGroup));
        response.setSuccess(true);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
