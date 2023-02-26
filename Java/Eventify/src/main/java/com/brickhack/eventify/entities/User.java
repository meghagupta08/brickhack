package com.brickhack.eventify.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Entity(name="User")
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private String name;

    private String password;

    private String email;

    @Enumerated(EnumType.ORDINAL)
    private Major major;

    @Enumerated(EnumType.ORDINAL)
    private EventType eventType;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    Set<UserEvent> events = new HashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = major;
    }

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public Set<UserEvent> getEvents() {
        return events;
    }

    public void setEvents(Set<UserEvent> events) {
        this.events = events;
    }

    public User(String name, String password, String email, Major major, EventType eventType) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.major = major;
        this.eventType = eventType;
    }

    public User() {}

    public void addEvent(Event event) {
        UserEvent userEvent = new UserEvent(this, event);
        events.add(userEvent);
        event.getUsers().add(userEvent);
    }

    public void removeEvent(Event event) {
        for (Iterator<UserEvent> iterator = events.iterator();
             iterator.hasNext(); ) {
            UserEvent userEvent = iterator.next();

            if (userEvent.getUser().equals(this) &&
                    userEvent.getEvent().equals(event)) {
                iterator.remove();
                userEvent.getEvent().getUsers().remove(userEvent);
                userEvent.setUser(null);
                userEvent.setEvent(null);
            }
        }
    }
}
