package com.gm.syncope.web.rest;

import com.gm.syncope.SyncopeApp;
import com.gm.syncope.domain.SongBook;
import com.gm.syncope.repository.SongBookRepository;
import com.gm.syncope.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;


import java.util.List;

import static com.gm.syncope.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SongBookResource} REST controller.
 */
@SpringBootTest(classes = SyncopeApp.class)
public class SongBookResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private SongBookRepository songBookRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restSongBookMockMvc;

    private SongBook songBook;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SongBookResource songBookResource = new SongBookResource(songBookRepository);
        this.restSongBookMockMvc = MockMvcBuilders.standaloneSetup(songBookResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SongBook createEntity() {
        SongBook songBook = new SongBook()
            .name(DEFAULT_NAME);
        return songBook;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SongBook createUpdatedEntity() {
        SongBook songBook = new SongBook()
            .name(UPDATED_NAME);
        return songBook;
    }

    @BeforeEach
    public void initTest() {
        songBookRepository.deleteAll();
        songBook = createEntity();
    }

    @Test
    public void createSongBook() throws Exception {
        int databaseSizeBeforeCreate = songBookRepository.findAll().size();

        // Create the SongBook
        restSongBookMockMvc.perform(post("/api/song-books")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(songBook)))
            .andExpect(status().isCreated());

        // Validate the SongBook in the database
        List<SongBook> songBookList = songBookRepository.findAll();
        assertThat(songBookList).hasSize(databaseSizeBeforeCreate + 1);
        SongBook testSongBook = songBookList.get(songBookList.size() - 1);
        assertThat(testSongBook.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    public void createSongBookWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = songBookRepository.findAll().size();

        // Create the SongBook with an existing ID
        songBook.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restSongBookMockMvc.perform(post("/api/song-books")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(songBook)))
            .andExpect(status().isBadRequest());

        // Validate the SongBook in the database
        List<SongBook> songBookList = songBookRepository.findAll();
        assertThat(songBookList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = songBookRepository.findAll().size();
        // set the field null
        songBook.setName(null);

        // Create the SongBook, which fails.

        restSongBookMockMvc.perform(post("/api/song-books")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(songBook)))
            .andExpect(status().isBadRequest());

        List<SongBook> songBookList = songBookRepository.findAll();
        assertThat(songBookList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    public void getAllSongBooks() throws Exception {
        // Initialize the database
        songBookRepository.save(songBook);

        // Get all the songBookList
        restSongBookMockMvc.perform(get("/api/song-books?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(songBook.getId())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    public void getSongBook() throws Exception {
        // Initialize the database
        songBookRepository.save(songBook);

        // Get the songBook
        restSongBookMockMvc.perform(get("/api/song-books/{id}", songBook.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(songBook.getId()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }

    @Test
    public void getNonExistingSongBook() throws Exception {
        // Get the songBook
        restSongBookMockMvc.perform(get("/api/song-books/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateSongBook() throws Exception {
        // Initialize the database
        songBookRepository.save(songBook);

        int databaseSizeBeforeUpdate = songBookRepository.findAll().size();

        // Update the songBook
        SongBook updatedSongBook = songBookRepository.findById(songBook.getId()).get();
        updatedSongBook
            .name(UPDATED_NAME);

        restSongBookMockMvc.perform(put("/api/song-books")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSongBook)))
            .andExpect(status().isOk());

        // Validate the SongBook in the database
        List<SongBook> songBookList = songBookRepository.findAll();
        assertThat(songBookList).hasSize(databaseSizeBeforeUpdate);
        SongBook testSongBook = songBookList.get(songBookList.size() - 1);
        assertThat(testSongBook.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    public void updateNonExistingSongBook() throws Exception {
        int databaseSizeBeforeUpdate = songBookRepository.findAll().size();

        // Create the SongBook

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSongBookMockMvc.perform(put("/api/song-books")
            .contentType(TestUtil.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(songBook)))
            .andExpect(status().isBadRequest());

        // Validate the SongBook in the database
        List<SongBook> songBookList = songBookRepository.findAll();
        assertThat(songBookList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteSongBook() throws Exception {
        // Initialize the database
        songBookRepository.save(songBook);

        int databaseSizeBeforeDelete = songBookRepository.findAll().size();

        // Delete the songBook
        restSongBookMockMvc.perform(delete("/api/song-books/{id}", songBook.getId())
            .accept(TestUtil.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SongBook> songBookList = songBookRepository.findAll();
        assertThat(songBookList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
