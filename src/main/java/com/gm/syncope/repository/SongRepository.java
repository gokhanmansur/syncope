package com.gm.syncope.repository;

import com.gm.syncope.domain.Song;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for the Song entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SongRepository extends MongoRepository<Song, String> {

}
