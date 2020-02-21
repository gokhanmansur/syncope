package com.gm.syncope.web.rest;

import com.gm.syncope.domain.SongBook;
import com.gm.syncope.repository.SongBookRepository;
import com.gm.syncope.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.gm.syncope.domain.SongBook}.
 */
@RestController
@RequestMapping("/api")
public class SongBookResource {

    private final Logger log = LoggerFactory.getLogger(SongBookResource.class);

    private static final String ENTITY_NAME = "songBook";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SongBookRepository songBookRepository;

    public SongBookResource(SongBookRepository songBookRepository) {
        this.songBookRepository = songBookRepository;
    }

    /**
     * {@code POST  /song-books} : Create a new songBook.
     *
     * @param songBook the songBook to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new songBook, or with status {@code 400 (Bad Request)} if the songBook has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/song-books")
    public ResponseEntity<SongBook> createSongBook(@Valid @RequestBody SongBook songBook) throws URISyntaxException {
        log.debug("REST request to save SongBook : {}", songBook);
        if (songBook.getId() != null) {
            throw new BadRequestAlertException("A new songBook cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SongBook result = songBookRepository.save(songBook);
        return ResponseEntity.created(new URI("/api/song-books/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /song-books} : Updates an existing songBook.
     *
     * @param songBook the songBook to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated songBook,
     * or with status {@code 400 (Bad Request)} if the songBook is not valid,
     * or with status {@code 500 (Internal Server Error)} if the songBook couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/song-books")
    public ResponseEntity<SongBook> updateSongBook(@Valid @RequestBody SongBook songBook) throws URISyntaxException {
        log.debug("REST request to update SongBook : {}", songBook);
        if (songBook.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SongBook result = songBookRepository.save(songBook);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, songBook.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /song-books} : get all the songBooks.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of songBooks in body.
     */
    @GetMapping("/song-books")
    public List<SongBook> getAllSongBooks() {
        log.debug("REST request to get all SongBooks");
        return songBookRepository.findAll();
    }

    /**
     * {@code GET  /song-books/:id} : get the "id" songBook.
     *
     * @param id the id of the songBook to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the songBook, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/song-books/{id}")
    public ResponseEntity<SongBook> getSongBook(@PathVariable String id) {
        log.debug("REST request to get SongBook : {}", id);
        Optional<SongBook> songBook = songBookRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(songBook);
    }

    /**
     * {@code DELETE  /song-books/:id} : delete the "id" songBook.
     *
     * @param id the id of the songBook to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/song-books/{id}")
    public ResponseEntity<Void> deleteSongBook(@PathVariable String id) {
        log.debug("REST request to delete SongBook : {}", id);
        songBookRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id)).build();
    }
}
