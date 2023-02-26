package com.brickhack.eventify.controllers;

import com.brickhack.eventify.entities.Event;
import com.brickhack.eventify.entities.User;
import com.brickhack.eventify.entities.UserEvent;
import com.brickhack.eventify.entities.UserEventKey;
import com.brickhack.eventify.repositories.EventRepository;
import com.brickhack.eventify.repositories.UserEventRepository;
import com.brickhack.eventify.repositories.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path="/event")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserEventRepository userEventRepository;

    @PostMapping(path="/createEvent")
    public @ResponseBody
    ResponseEntity createEvent (@RequestBody Event event, @RequestParam String userEmail) {
        User user = userRepository.findByEmail(userEmail).get(0);
        eventRepository.save(event);
        UserEvent userEvent = new UserEvent(user, event);
        userEvent.setHost(true);
        UserEventKey userEventKey = new UserEventKey(user.getId(),event.getId());
        userEvent.setId(userEventKey);
        userEventRepository.save(userEvent);
        return ResponseEntity.ok("Created");
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Event> getAllEvents() {
        // This returns a JSON or XML with the users
        return eventRepository.findAll();
    }

//    @GetMapping(path="/getUserRecommendedEvents")
//    public @ResponseBody Iterable<Event> getUserRecommendedEvents(@RequestParam String email) throws JsonProcessingException {
//        User user = userRepository.findByEmail(email).get(0);
//        List<Event> userEventsList = new ArrayList<>();
//        if(user != null){
//            List<UserEvent> userEvents = userEventRepository.findByIdUserId(user.getId());
//            if(userEvents != null){
//                for (UserEvent oneUserEvent: userEvents) {
//                    userEventsList.add(oneUserEvent.getEvent());
//                }
//                Set<Event> userEventSet = new HashSet<>(userEventsList);
//                List<Event> allEventsExceptUser = new ArrayList<>();
//                Iterable<Event> allEventsIterable = eventRepository.findAll();
//                for (Event oneEvent: allEventsIterable) {
//                    if (!userEventSet.contains(oneEvent)) {
//                        allEventsExceptUser.add(oneEvent);
//                    }
//                }
//
//                ObjectMapper Obj = new ObjectMapper();
//                for (Event oneUserEvent: userEventSet) {
//                    String url = String.format("http://localhost:5000/getRecommendedEventsForUser?inputEvent={0}&allEvents={1}",
//                            Obj.writeValueAsString(oneUserEvent),Obj.writeValueAsString(allEventsExceptUser));
//
//                    RestTemplate restTemplate = new RestTemplate();
//                    String result = restTemplate.getForObject(url, String.class);
//                    result.
//
//                }
//
//            }
//        } else {
//            return ResponseEntity.status(400).body("Invalid event id.");
//        }
//        return ResponseEntity.status(400).body("No event found.");
//
//        final String uri = "http://localhost:5000/getRecommendedEventsForUser";
//        String url = String.format("http://localhost:5000/getRecommendedEventsForUser?inputEvent={var1value}&allEvents={var2value}");
//        RestTemplate restTemplate = new RestTemplate();
//        String result = restTemplate.getForObject(uri, String.class);
//        return eventRepository.findAll();
//    }

    @GetMapping(path="/getEvent")
    public @ResponseBody ResponseEntity getEvent(@RequestParam Integer id) {
        if(id != null){
            Optional<Event> eventOptional = eventRepository.findById(id);
            if(eventOptional.isPresent()){
                return ResponseEntity.ok(eventOptional.get());
            }
        } else {
            return ResponseEntity.status(400).body("Invalid event id.");
        }
        return ResponseEntity.status(400).body("No event found.");
    }

    @GetMapping(path="/getEventHosts")
    public @ResponseBody ResponseEntity getEventHosts(@RequestParam Integer id) {
        List<User> hosts = new ArrayList<>();
        if(id != null){
            List<UserEvent> userEvents = userEventRepository.findByIdEventId(id);
            if(userEvents != null){
                for (UserEvent oneUserEvent: userEvents) {
                    if (oneUserEvent.getHost()) {
                        hosts.add(oneUserEvent.getUser());
                    }
                }
                return ResponseEntity.ok(hosts);
            }
        } else {
            return ResponseEntity.status(400).body("Invalid event id.");
        }
        return ResponseEntity.status(400).body("No event found.");
    }

    @GetMapping(path="/getEventParticipants")
    public @ResponseBody ResponseEntity getEventParticipants(@RequestParam Integer id) {
        List<User> hosts = new ArrayList<>();
        if(id != null){
            List<UserEvent> userEvents = userEventRepository.findByIdEventId(id);
            if(userEvents != null){
                for (UserEvent oneUserEvent: userEvents) {
                    if (!oneUserEvent.getHost()) {
                        hosts.add(oneUserEvent.getUser());
                    }
                }
                return ResponseEntity.ok(hosts);
            }
        } else {
            return ResponseEntity.status(400).body("Invalid event id.");
        }
        return ResponseEntity.status(400).body("No event found.");
    }

    @PostMapping(path="/registerToEvent")
    public @ResponseBody
    ResponseEntity registerToEvent (@RequestParam String userEmail, @RequestParam Integer eventId) {
        List<User> users = userRepository.findByEmail(userEmail);
        User user = null;
        if (users.size() > 0) {
            user = users.get(0);
        }
        Optional<Event> optionalEvent = eventRepository.findById(eventId);
        if (optionalEvent.isPresent() && user != null) {
            Event event = optionalEvent.get();
            UserEvent userEvent = new UserEvent(user, event);
            userEvent.setHost(false);
            UserEventKey userEventKey = new UserEventKey(user.getId(),event.getId());
            userEvent.setId(userEventKey);
            userEventRepository.save(userEvent);
            return ResponseEntity.ok("Registered.");
        }
        return ResponseEntity.status(400).body("Invalid user or event.");
    }

    @GetMapping(path="/getUserEvents")
    public @ResponseBody ResponseEntity getUserEvents(@RequestParam String email) {
        List<User> users = userRepository.findByEmail(email);
        List<Event> events = new ArrayList<>();
        User user = users.get(0);
        if(user != null){
            List<UserEvent> userEvents = userEventRepository.findByIdUserId(user.getId());
            if(userEvents != null){
                for (UserEvent oneUserEvent: userEvents) {
                    events.add(oneUserEvent.getEvent());
                }
                return ResponseEntity.ok(events);
            }
        } else {
            return ResponseEntity.status(400).body("Invalid email.");
        }
        return ResponseEntity.status(400).body("No event found.");
    }

}
