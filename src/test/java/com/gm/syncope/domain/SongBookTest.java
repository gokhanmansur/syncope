package com.gm.syncope.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.gm.syncope.web.rest.TestUtil;

public class SongBookTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SongBook.class);
        SongBook songBook1 = new SongBook();
        songBook1.setId("id1");
        SongBook songBook2 = new SongBook();
        songBook2.setId(songBook1.getId());
        assertThat(songBook1).isEqualTo(songBook2);
        songBook2.setId("id2");
        assertThat(songBook1).isNotEqualTo(songBook2);
        songBook1.setId(null);
        assertThat(songBook1).isNotEqualTo(songBook2);
    }
}
