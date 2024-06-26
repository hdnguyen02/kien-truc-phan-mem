package com.ktpm.controller;

import com.ktpm.dto.GroupDto;
import com.ktpm.dto.UserDto;
import com.ktpm.dto.GroupRequest;
import com.ktpm.dto.UserGroupRequest;
import com.ktpm.dto.Response;
import com.ktpm.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("${system.version}")
public class GroupController {

    private final GroupService groupService;


    // tạo lớp với role giáo viên
    @PostMapping("/groups")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> createGroup(@RequestBody GroupRequest groupRequest){

        Response response = new Response();

        response.setData(groupService.createGroup(groupRequest));
        response.setSuccess(true);
        response.setMessage("Tạo class thành công");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // hiệu chỉnh lớp với role giáo viên
    @PutMapping("/groups/{id}")
    @PreAuthorize("hasRole('TEACHER')")
    public ResponseEntity<?> updateGroup(@PathVariable Long id , @RequestBody GroupRequest groupRequest) {

        Response responseData = new Response();
        responseData.setData(groupService.updateGroup(id, groupRequest));
        responseData.setSuccess(true);

        return ResponseEntity.status(HttpStatus.OK).body(responseData);
    }


    // chi tiết của 1 lớp học
    @GetMapping("/groups/{id}")
    public ResponseEntity<?> getGroupById(@PathVariable(name = "id") Long id) {
        Response response = new Response();

        GroupDto groupDto = groupService.getGroupById(id);
        response.setData(groupDto);
        response.setSuccess(true);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/groups/delete-user")
    public ResponseEntity<?> deleteUserGroup(@RequestBody UserGroupRequest userGroupRequest) {
        // Xóa thành viên khỏi lớp học.
        Response responseData = new Response();
        responseData.setData(groupService.deleteUserGroupById(userGroupRequest));
        responseData.setSuccess(true);

        return ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @PostMapping("/groups/{id}/invite")
    public ResponseEntity<?> inviteUserGroup(
            @PathVariable Long id, @RequestParam(name = "email-user") String emailUser) {

        Response responseData = new Response();

        responseData.setData(groupService.inviteUserGroup(id, emailUser));
        responseData.setSuccess(true);
        responseData.setMessage("Gửi mail đến người dùng thành công");

        return ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @GetMapping("/groups/owner")
    public ResponseEntity<?> getGroupByUser() {
        Response responseData = new Response();
        List<GroupDto> groupDtos = groupService.getGroupByOwner();
        responseData.setSuccess(true);
        responseData.setData(groupDtos);
        responseData.setMessage("Truy vấn thành công");
        return ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @GetMapping("/groups/attendance")
    public ResponseEntity<?> getGroupByAttendance(){
        Response responseData = new Response();

        responseData.setData(groupService.getGroupByAttendance());
        responseData.setSuccess(true);
        responseData.setMessage("Truy vấn thành công");

        return ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @PreAuthorize("hasRole('TEACHER')")
    @DeleteMapping("/groups/{id}")
    public ResponseEntity<?> deleteGroupById(@PathVariable Long id) {
        Response responseData = new Response();
        responseData.setData(groupService.deleteGroupById(id));
        responseData.setSuccess(true);
        return ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    //    @GetMapping("/groups/{id}/members")
    //    public ResponseEntity<?> getUserOfGroupById(@PathVariable Long id) {
    //        Response responseData = new Response();
    //
    //        List<UserDto> userDtos= groupService.getUserOfGroup(id);
    //        responseData.setData(userDtos);
    //        responseData.setSuccess(true);
    //
    //        return ResponseEntity.status(HttpStatus.OK).body(responseData);
    //    }
}
