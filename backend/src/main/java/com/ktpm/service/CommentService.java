package com.ktpm.service;

import com.ktpm.dao.CommentDao;
import com.ktpm.dto.CommentDto;
import com.ktpm.entity.Comment;
import com.ktpm.entity.Group;
import com.ktpm.entity.User;
import com.ktpm.request.CommentRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CommentService {
    @Autowired
    CommentDao commentRepository;

    public boolean createComment(CommentRequest commentRequest) {
        Comment comment = new Comment();

        Date created = new Date();
        comment.setCreated(created);
        comment.setUser(new User(commentRequest.getEmail()));

        comment.setContent(commentRequest.getContent());
        if (commentRequest.getParentId() != null) {
            comment.setComment(new Comment(commentRequest.getParentId()));
        }
        comment.setGroup(new Group(commentRequest.getGroupId()));

        commentRepository.save(comment);

        return true;
    }

    public boolean deleteComment(Long id) {
        return false;
    }

    public List<CommentDto> getListComment() {
        return null;
    }

    public List<CommentDto> getCommentByGroupId(Long id) {
        List<Comment> comments = commentRepository.findByCommentIsNull();
        List<CommentDto> commentDtos = new ArrayList<>();

        comments.forEach(comment -> {
            commentDtos.add(CommentDto.mapToCommentDto(comment));
        });

        return commentDtos;
    }
}
