package com.hdnguyen.learnenglish.dao;

import com.hdnguyen.learnenglish.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenDao extends JpaRepository<Token, Integer> {
    @Query("""
            SELECT t FROM Token t WHERE t.user.email = :email AND t.isSignOut = false
            """)
    List<Token> findTokensValidOfUser(String email);
    Optional<Token> findByCode(String code);

}
