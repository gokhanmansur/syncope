package com.gm.syncope.repository;

import com.gm.syncope.domain.SongBook;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the SongBook entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SongBookRepository extends MongoRepository<SongBook, String> {

}
