package com.ktpm.service;


import com.ktpm.dao.SubmitDao;
import com.ktpm.entity.Submit;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SubmitService {

    private final SubmitDao submitDao;

    public void createSubmit() {

    }

}
