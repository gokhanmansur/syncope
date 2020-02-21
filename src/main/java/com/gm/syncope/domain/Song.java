package com.gm.syncope.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Song.
 */
@Document(collection = "song")
public class Song implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @Field("lyrics")
    private String lyrics;

    @DBRef
    @Field("songBook")
    @JsonIgnoreProperties("songs")
    private SongBook songBook;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Song name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLyrics() {
        return lyrics;
    }

    public Song lyrics(String lyrics) {
        this.lyrics = lyrics;
        return this;
    }

    public void setLyrics(String lyrics) {
        this.lyrics = lyrics;
    }

    public SongBook getSongBook() {
        return songBook;
    }

    public Song songBook(SongBook songBook) {
        this.songBook = songBook;
        return this;
    }

    public void setSongBook(SongBook songBook) {
        this.songBook = songBook;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Song)) {
            return false;
        }
        return id != null && id.equals(((Song) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Song{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", lyrics='" + getLyrics() + "'" +
            "}";
    }
}
