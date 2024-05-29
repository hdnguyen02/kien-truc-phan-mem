package com.ktpm.service;

import com.ktpm.dao.GroupDao;
import com.ktpm.dao.UserDao;
import com.ktpm.dao.UserGroupDao;
import com.ktpm.dto.GroupDto;
import com.ktpm.dto.UserDto;
import com.ktpm.entity.Group;
import com.ktpm.entity.User;
import com.ktpm.entity.UserGroup;
import com.ktpm.exception.GroupAlreadyExistsException;
import com.ktpm.request.GroupRequest;
import com.ktpm.request.UserGroupRequest;
import com.ktpm.sendmail.EmailDetails;
import com.ktpm.sendmail.EmailServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class GroupService {
    @Autowired
    private GroupDao groupRepository;

    @Autowired
    private UserGroupDao userGroupRepository;

    @Autowired
    private UserDao userRepository;

    @Autowired
    private EmailServiceImpl emailService; // = new EmailServiceImpl();

    public boolean createGroup(GroupRequest groupRequest) {
        Group group = new Group();

        Date created = new Date();

        group.setName(groupRequest.getName());
        group.setDescription(groupRequest.getDescription());
        group.setOwner(new User(groupRequest.getEmail()));
        group.setCreated(created);
        group.setCreatedBy(groupRequest.getEmail());

        Group groupSave = groupRepository.save(group);

        return true;
    }

    public boolean updateGroup(GroupRequest groupRequest) {
        Optional<Group> group = groupRepository.findById(groupRequest.getId());
        if (group.isEmpty()) {
            throw new GroupAlreadyExistsException("Group already exist with id "
                    + groupRequest.getId());
        }

        Group groupDb = group.get();
        groupDb.setName(groupRequest.getName());
        groupDb.setDescription(groupRequest.getDescription());
        groupDb.setOwner(new User(groupRequest.getEmail()));

        Date modified = new Date();
        groupDb.setModified(modified);
        groupDb.setModifiedBy(groupRequest.getEmail());

        groupRepository.save(groupDb);

        return true;
    }

    public List<GroupDto> getGroups() {
        return null;
    }

    public GroupDto getGroupById(Long id) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isEmpty()) {
            throw new GroupAlreadyExistsException("Group already exist with id "
                    + id);
        }
        return GroupDto.mapToGroupDto(group.get());
    }

    public GroupDto getGroupDetailById(Long id) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isEmpty()) {
            throw new GroupAlreadyExistsException("Group already exist with id "
                    + id);
        }
        return GroupDto.mapToGroupDtoDetail(group.get());
    }


    public List<GroupDto> getGroupByUser(String email) {
        List<Group> groups = groupRepository.findByOwner(new User(email));
        List<GroupDto> groupDtos = new ArrayList<>();

        groups.forEach(group -> {
            groupDtos.add(GroupDto.mapToGroupDto(group));
        });

        return groupDtos;
    }

    public boolean deleteGroupById(Long id) {
        Optional<Group> group = groupRepository.findById(id);
        if (group.isEmpty()) {
            throw new GroupAlreadyExistsException("Group already exist with id "
                    + id);
        }
        groupRepository.delete(group.get());
        return true;
    }


    public boolean addUserGroup(UserGroupRequest userGroupRequest) {
        // check email user
        Optional<User> userOptional = userRepository.findById(userGroupRequest.getEmail());
        if (userOptional.isEmpty()) {
            throw new UsernameNotFoundException("Người dùng có mail không tồn tại!");
        }

        // check is exist
        List<UserGroup> userGroups = userGroupRepository.findByUserAndGroup(new User(userGroupRequest.getEmail()),
                    new Group(userGroupRequest.getGroupId())
                );
        String token = UUID.randomUUID().toString();
        if (userGroups.size() > 0) {
            UserGroup userGroupDB = userGroups.get(0);
            if (!userGroupDB.isActive()) {
                userGroupDB.setTokenActive(token);


                Thread threadSaveData = new Thread(()-> {
                    userGroupRepository.save(userGroupDB);
                });

                Thread threadSendMail = new Thread(()->{
                    sendMailAddGroup(userGroupRequest.getGroupId(), userGroupRequest.getEmail(), token);
                });
            }

        } else {
            UserGroup userGroup =  new UserGroup();

            userGroup.setTokenActive(token);

            userGroup.setUser(new User(userGroupRequest.getEmail()));
            userGroup.setGroup(new Group(userGroupRequest.getGroupId()));
            userGroup.setActive(false);

            Thread threadSendMail = new Thread(()->{
                sendMailAddGroup(userGroupRequest.getGroupId(), userGroupRequest.getEmail(), token);
            });

            Thread threadSaveData = new Thread(()-> {
                userGroupRepository.save(userGroup);
            });

            threadSendMail.start();
            threadSaveData.start();

        }

        return true;
    }

    private void sendMailAddGroup(Long groupId, String emailTo, String token) {
        EmailDetails details = new EmailDetails();
        details.setSubject("Thư mời tham gia lớp học");
        details.setRecipient(emailTo);
        String link = "http://localhost:8080/api/v1/group/"+groupId+"/addUser/active/" + token;
        details.setMsgBody("<p>Xin chào bạn,</p>" +
                "<p>Bạn vui lòng nhấn vào <a href=\'"+link+"\'>link này</a> để tham gia lớp học.</p>" +
                "    <p>Trân trọng,</p>");
        emailService.sendMailWithAttachment(details);
    }

    public boolean activeUserGroup(Long groupId, String token) {
        Optional<UserGroup> userGroupOptional = userGroupRepository.findByGroupAndTokenActive(new Group(groupId), token);
        if (userGroupOptional.isEmpty()) {
            return false;
        }

        UserGroup userGroup = userGroupOptional.get();
        userGroup.setActive(true);
        userGroupRepository.save(userGroup);
        return true;
    }


}
