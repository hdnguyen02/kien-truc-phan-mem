package com.ktpm;

import com.ktpm.dao.RoleDao;
import com.ktpm.entity.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner (RoleDao roleDao) {
		return arg -> {
			List<Role> roles = roleDao.findAll();
			if (!roles.isEmpty()) return;
			Role roleUser = new Role("USER");
			Role roleAdmin = new Role("ADMIN");
			roles.add(roleUser);
			roles.add(roleAdmin);
			roleDao.saveAll(roles);
		};
	}
}
