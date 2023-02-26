package com.brickhack.eventify.repositories;

import com.brickhack.eventify.entities.UserEvent;
import com.brickhack.eventify.entities.UserEventKey;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserEventRepository extends CrudRepository<UserEvent, UserEventKey> {

    List<UserEvent> findByIdEventId(Integer eventId);

    List<UserEvent> findByIdUserId(Integer userId);
}
