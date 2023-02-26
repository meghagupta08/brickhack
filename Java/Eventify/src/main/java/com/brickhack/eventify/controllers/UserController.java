package com.brickhack.eventify.controllers;

import com.brickhack.eventify.entities.User;
import com.brickhack.eventify.repositories.UserRepository;
import jakarta.persistence.Transient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller	// This means that this class is a Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path="/user") // This means URL's start with /demo (after Application path)
public class UserController {
    @Autowired // This means to get the bean called userRepository
    // Which is auto-generated by Spring, we will use it to handle the data
    private UserRepository userRepository;

    @PostMapping(path="/createUser") // Map ONLY POST Requests
    public @ResponseBody ResponseEntity createUser (@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).size() > 0){
            return ResponseEntity.badRequest().body("Email already exists");
        };
        userRepository.save(user);
        return ResponseEntity.ok("Created");
    }

    @GetMapping(path="/authenticate")
    public @ResponseBody ResponseEntity authenticate(@RequestParam String email, @RequestParam String password) {
        List<User> users = userRepository.findByEmail(email);
        if (users.size() > 0) {
            if (users.get(0).getPassword().equals(password)) {
                return ResponseEntity.ok("Login succeeded");
            }
        } else {
                return ResponseEntity.status(403).body("User does not exists.");
        }
        return ResponseEntity.status(403).body("Bad credentials.");
    }

    @GetMapping(path="/getUser")
    public @ResponseBody ResponseEntity getUser(@RequestParam String email) {
        List<User> users = userRepository.findByEmail(email);
        if (users.size() > 0) {
            User user = users.get(0);
            user.setPassword(null);
            return ResponseEntity.status(200).body(users.get(0));
        }
        return ResponseEntity.status(400).body("User not found");
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }
}
