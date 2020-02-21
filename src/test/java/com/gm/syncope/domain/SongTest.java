package com.gm.syncope.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.gm.syncope.web.rest.TestUtil;

public class SongTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Song.class);
        Song song1 = new Song();
        song1.setId("id1");
        Song song2 = new Song();
        song2.setId(song1.getId());
        assertThat(song1).isEqualTo(song2);
        song2.setId("id2");
        assertThat(song1).isNotEqualTo(song2);
        song1.setId(null);
        assertThat(song1).isNotEqualTo(song2);
    }
}
