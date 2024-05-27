package com.ktpm.dao;

import com.ktpm.entity.Group;
import com.ktpm.entity.User;
import com.ktpm.entity.UserGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserGroupDao extends JpaRepository<UserGroup, Long> {
    List<UserGroup> findByUserAndGroup(User user, Group group);
}
