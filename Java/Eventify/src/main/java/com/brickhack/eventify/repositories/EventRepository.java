package com.brickhack.eventify.repositories;

import com.brickhack.eventify.entities.Event;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface EventRepository extends CrudRepository<Event, Integer> {

    @Override
    Optional<Event> findById(Integer id);
}
