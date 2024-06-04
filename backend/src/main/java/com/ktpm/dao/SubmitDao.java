package com.ktpm.dao;

import com.ktpm.entity.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmitDao extends JpaRepository<Card, Integer> {
}
