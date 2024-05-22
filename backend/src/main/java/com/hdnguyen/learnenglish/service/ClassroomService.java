package com.hdnguyen.learnenglish.service;


import com.hdnguyen.learnenglish.Helper;
import com.hdnguyen.learnenglish.dao.ClassroomDao;
import com.hdnguyen.learnenglish.entity.Classroom;
import com.hdnguyen.learnenglish.entity.User;
import com.hdnguyen.learnenglish.request.ClassroomRequest;
import com.hdnguyen.learnenglish.response.ClassroomResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClassroomService {


    private final ClassroomDao classroomDao;
    private final Helper helper;


    public ClassroomResponse createClassroom(ClassroomRequest classroomRequest) {
        User user = helper.getUser();


        Classroom classroom = Classroom.builder()
                .name(classroomRequest.getName())
                .description(classroomRequest.getDescription())
                .build();

        return null;

    }












}
