package com.brickhack.eventify.entities;

import jakarta.persistence.*;

@Entity(name="UserEvent")
@Table(name="user_event")
public class UserEvent {

    @EmbeddedId
    UserEventKey id;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("userId")
    User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @MapsId("eventId")
    Event event;

    Boolean isHost;

    public UserEventKey getId() {
        return id;
    }

    public void setId(UserEventKey id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Boolean getHost() {
        return isHost;
    }

    public void setHost(Boolean host) {
        isHost = host;
    }

    public UserEvent(User user, Event event) {
        this.user = user;
        this.event = event;
    }

    public UserEvent() {}
}
