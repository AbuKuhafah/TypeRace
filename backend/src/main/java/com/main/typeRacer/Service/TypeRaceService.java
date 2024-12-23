package com.main.typeRacer.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.main.typeRacer.Model.TypeRace;
import com.main.typeRacer.Repository.TypeRaceRepository;

@Service
public class TypeRaceService {

     @Autowired
    private TypeRaceRepository typeRaceRepository;

    public List<TypeRace> getTopTenByAccuracy() {
        //To get only top 10
        PageRequest topTen = PageRequest.of(0, 10);
        return typeRaceRepository.findTop10ByAccuracy(topTen);
    }

    public List<TypeRace> getTopTenByWpm() {
        //To get only top 10
        PageRequest topTen = PageRequest.of(0, 10);
        return typeRaceRepository.findTop10ByWpm(topTen);
    }

}
