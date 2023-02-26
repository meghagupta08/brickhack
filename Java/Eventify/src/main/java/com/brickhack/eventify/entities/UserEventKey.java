package com.brickhack.eventify.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;

import java.io.Serializable;

@Embeddable
public class UserEventKey implements Serializable {

    @Column(name = "user_id")
    Integer userId;

    @Column(name = "event_id")
    Integer eventId;

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getEventId() {
        return eventId;
    }

    public void setEventId(Integer eventId) {
        this.eventId = eventId;
    }

    public UserEventKey(Integer userId, Integer eventId) {
        this.userId = userId;
        this.eventId = eventId;
    }

    public UserEventKey() {}
}
