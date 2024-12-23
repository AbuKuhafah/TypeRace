package com.main.typeRacer.Repository;
import com.main.typeRacer.Model.TypeRace;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRaceRepository extends JpaRepository<TypeRace, Long> {

    @Query("SELECT tr FROM TypeRace tr ORDER BY tr.accuracy DESC")
    List<TypeRace> findTop10ByAccuracy(PageRequest topTen);
    
    @Query("SELECT tr FROM TypeRace tr ORDER BY tr.wpm DESC")
    List<TypeRace> findTop10ByWpm(PageRequest topTen);
    
}

