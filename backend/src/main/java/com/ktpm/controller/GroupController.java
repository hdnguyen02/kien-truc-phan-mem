package com.ktpm.controller;

import com.ktpm.dto.GroupDto;
import com.ktpm.dto.UserDto;
import com.ktpm.request.GroupRequest;
import com.ktpm.request.UserGroupRequest;
import com.ktpm.response.Response;
import com.ktpm.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("${system.version}")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @PostMapping("/group")
    public ResponseEntity<?> createGroup(@RequestBody GroupRequest groupRequest){
        Response responseData = new Response();

        responseData.setData(groupService.createGroup(groupRequest));
        responseData.setSuccess(true);

        return  ResponseEntity.status(HttpStatus.CREATED).body(responseData);
    }


    @PutMapping("/group")
    public ResponseEntity<?> updateGroup(@RequestBody GroupRequest groupRequest) {
        Response responseData = new Response();
        responseData.setData(groupService.updateGroup(groupRequest));
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @GetMapping("/group")
    public ResponseEntity<?> getGroups() {
        Response responseData = new Response();
        responseData.setSuccess(true);


        return  ResponseEntity.status(HttpStatus.CREATED).body(responseData);
    }


    @GetMapping("/group/{id}")
    public ResponseEntity<?> getGroupById(@PathVariable(name = "id") Long id) {
        Response responseData = new Response();

        GroupDto groupDto = groupService.getGroupById(id);
        responseData.setData(groupDto);
        responseData.setSuccess(true);

        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @GetMapping("/group/usersActive/{id}")
    public ResponseEntity<?> getUserOfGroupById(@PathVariable(name = "id") Long id) {
        Response responseData = new Response();

        List<UserDto> userDtos= groupService.getUserOfGroup(id);
        responseData.setData(userDtos);
        responseData.setSuccess(true);

        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @GetMapping("/group/user/{email}")
    public ResponseEntity<?> getGroupByUser(@PathVariable(name = "email") String email) {
        Response responseData = new Response();

        List<GroupDto> groupDtos = groupService.getGroupByUser(email);
        responseData.setSuccess(true);
        responseData.setData(groupDtos);

        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @GetMapping("/group/detail/{id}")
    public ResponseEntity<?> getGroupByIdDetail(@PathVariable(name = "id") Long id) {
        Response responseData = new Response();

        GroupDto groupDto = groupService.getGroupDetailById(id);
        responseData.setData(groupDto);
        responseData.setSuccess(true);

        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @DeleteMapping("/group/{id}")
    public ResponseEntity<?> deleteGroupById(@PathVariable(name = "id") Long id) {
        Response responseData = new Response();
        responseData.setData(groupService.deleteGroupById(id));
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

//    @DeleteMapping("/group/delUser")
    @PostMapping("/group/delUser")
    public ResponseEntity<?> deleteUserGroup(@RequestBody UserGroupRequest userGroupRequest) {
        Response responseData = new Response();
        responseData.setData(groupService.deleteUserGroupById(userGroupRequest));
        responseData.setSuccess(true);
        return  ResponseEntity.status(HttpStatus.OK).body(responseData);
    }

    @PostMapping("/group/addUser")
    public ResponseEntity<?> addUserGroup(@RequestBody UserGroupRequest userGroupRequest){
        Response responseData = new Response();

        responseData.setData(groupService.addUserGroup(userGroupRequest));
        responseData.setSuccess(true);

        return  ResponseEntity.status(HttpStatus.CREATED).body(responseData);
    }

    @GetMapping("/group/{id}/addUser/active/{token}")
    public ResponseEntity<?> addUserGroup(@PathVariable(name = "id") Long id,
                                          @PathVariable(name = "token") String token){
        Response responseData = new Response();

        responseData.setData(groupService.activeUserGroup(id, token));
        responseData.setSuccess(true);

        return  ResponseEntity.status(HttpStatus.CREATED).body(responseData);
    }

    @GetMapping("/group/attendance/{email}")
    public ResponseEntity<?> getGroupAttendance(@PathVariable(name = "email") String email){
        Response responseData = new Response();

        responseData.setData(groupService.getGroupAttend(email));
        responseData.setSuccess(true);

        return  ResponseEntity.status(HttpStatus.CREATED).body(responseData);
    }
}
