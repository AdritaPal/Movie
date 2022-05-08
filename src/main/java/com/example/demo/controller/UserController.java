package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.repo.UserRepo;

@RequestMapping("/user")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
	
	@Autowired
	private UserRepo repo;
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody User user) {
		
		if(user.getPassword().equals(user.getCpassword())) {
			return ResponseEntity.ok(repo.save(user));
		}
		else {
			return (ResponseEntity<?>) ResponseEntity.internalServerError();
		}
	}
	
	
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody User userdata){
		User user = repo.findByUserId(userdata.getUserId());
		if(user.getPassword().equals(userdata.getPassword())) {
			return ResponseEntity.ok(user);
		}
		return (ResponseEntity<?>) ResponseEntity.internalServerError();
		
	}

}
