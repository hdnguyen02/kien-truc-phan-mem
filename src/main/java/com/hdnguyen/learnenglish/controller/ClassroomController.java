package com.hdnguyen.learnenglish.controller;


import com.hdnguyen.learnenglish.request.ClassroomRequest;
import com.hdnguyen.learnenglish.response.ClassroomResponse;
import com.hdnguyen.learnenglish.response.Response;
import com.hdnguyen.learnenglish.service.ClassroomService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("${system.version}")
public class ClassroomController {

    private final ClassroomService classroomService;



    // bắt dầu với teacher => role giáo viên
    @PostMapping("teacher/classrooms")
    public ResponseEntity<Response> createClassroom(ClassroomRequest classroomRequest) {
//        ClassroomResponse classroomResponse = classroomService.
        return null;
    }

}
