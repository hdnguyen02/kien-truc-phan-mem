package com.ktpm.service;

import com.ktpm.dao.GroupDao;
import com.ktpm.dao.UserGroupDao;
import com.ktpm.dto.GroupDto;
import com.ktpm.entity.Group;
import com.ktpm.entity.User;
import com.ktpm.entity.UserGroup;
import com.ktpm.exception.GroupAlreadyExistsException;
import com.ktpm.request.GroupRequest;
import com.ktpm.request.UserGroupRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class GroupService {
    @Autowired
    private GroupDao groupRepository;

    @Autowired
    private UserGroupDao userGroupRepository;

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
        // check is exist
        List<UserGroup> userGroups = userGroupRepository.findByUserAndGroup(new User(userGroupRequest.getEmail()),
                    new Group(userGroupRequest.getGroupId())
                );
        String token = UUID.randomUUID().toString();
        if (userGroups.size() > 0) {
            UserGroup userGroupDB = userGroups.get(0);
            if (!userGroupDB.isActive()) {
                userGroupDB.setTokenActive(token);
                userGroupRepository.save(userGroupDB);
            }

        } else {
            UserGroup userGroup =  new UserGroup();

            userGroup.setTokenActive(token);

            userGroup.setUser(new User(userGroupRequest.getEmail()));
            userGroup.setGroup(new Group(userGroupRequest.getGroupId()));
            userGroup.setActive(false);
            userGroupRepository.save(userGroup);
        }

        return true;
    }
}
