package com.ktpm.service;


import com.google.api.gax.rpc.NotFoundException;
import com.ktpm.Helper;
import com.ktpm.dao.AssignmentDao;
import com.ktpm.dao.GroupDao;
import com.ktpm.dto.AssignmentDto;
import com.ktpm.entity.Assignment;
import com.ktpm.entity.Group;
import com.ktpm.entity.User;
import com.ktpm.request.AssignmentRequest;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignmentService {
    private final Helper helper;
    private final AssignmentDao assignmentDao;
    private final GroupDao groupDao;
    private final FirebaseStorageService firebaseStorageService;

    public boolean createAssignment(@RequestParam String name,
                                    @RequestParam String description,
                                    @RequestParam Long idGroup,
                                    Date deadline,
                                    @RequestParam MultipartFile file) throws Exception {


        Group group = groupDao.findById(idGroup).orElse(null);
        if (group == null) throw new Exception("Không tìm thấy tài nguyên");
        String url = firebaseStorageService.save("assignment", file);


        Assignment assignment = Assignment.builder()
                .name(name)
                .description(description)
                .deadline(deadline)
                .url(url)
                .group(group)
                .build();

        try {
            assignmentDao.save(assignment);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return false;
        }
        return true;
    }


    public List<AssignmentDto> getAssignments(long idGroup) throws Exception {
        Group group =groupDao.findById(idGroup).orElse(null);
        if (group == null) throw new Exception("Không tồn tại group");
        List<Assignment> assignments = group.getAssignments();
        List<AssignmentDto> assignmentDtos = new ArrayList<>();
        assignments.forEach(assignment -> {
            assignmentDtos.add(new AssignmentDto(assignment));
        });
        System.out.println(assignmentDtos.size());
        return assignmentDtos;
    }

}


