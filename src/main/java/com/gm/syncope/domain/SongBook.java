package com.gm.syncope.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A SongBook.
 */
@Document(collection = "song_book")
public class SongBook implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @DBRef
    @Field("song")
    private Set<Song> songs = new HashSet<>();

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

    public SongBook name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Song> getSongs() {
        return songs;
    }

    public SongBook songs(Set<Song> songs) {
        this.songs = songs;
        return this;
    }

    public SongBook addSong(Song song) {
        this.songs.add(song);
        song.setSongBook(this);
        return this;
    }

    public SongBook removeSong(Song song) {
        this.songs.remove(song);
        song.setSongBook(null);
        return this;
    }

    public void setSongs(Set<Song> songs) {
        this.songs = songs;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SongBook)) {
            return false;
        }
        return id != null && id.equals(((SongBook) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SongBook{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
