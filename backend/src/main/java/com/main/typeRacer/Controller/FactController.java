package com.main.typeRacer.Controller;

import com.main.typeRacer.Model.TypeRace;
import com.main.typeRacer.Repository.TypeRaceRepository;
import com.main.typeRacer.Service.FactService;
import com.main.typeRacer.Service.TypeRaceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Arrays;

@RestController
@RequestMapping("/api/typeRacer")
@CrossOrigin(origins = "http://localhost:3000")
public class FactController {

    private final FactService factService;

    @Autowired
    private TypeRaceRepository typeRaceRepository;

    @Autowired
    private TypeRaceService typeRaceService;

    public FactController(FactService factService) {
        this.factService = factService;
    }

    @GetMapping("/randomFact")
    public ResponseEntity<String> getRandomFact() {
        String fact = factService.getRandomFact();
        System.out.println("Getting Fact: "+ fact);
        return ResponseEntity.ok(fact);
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveTypeRace(@RequestBody TypeRace typeRace) {
        try {
            typeRaceRepository.save(typeRace);
            System.out.println("TypeRace data: " + typeRace);
            return ResponseEntity.ok("TypeRace data saved successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving TypeRace data");
        }
    }

    @GetMapping("/topTenAcc")
    public List<TypeRace> getTopTenByAccuracy() {
        return typeRaceService.getTopTenByAccuracy();
    }
    

    @GetMapping("/topTenWpm")
    public List<TypeRace> getTopTenByWpm() {
        return typeRaceService.getTopTenByWpm();
    }
}
