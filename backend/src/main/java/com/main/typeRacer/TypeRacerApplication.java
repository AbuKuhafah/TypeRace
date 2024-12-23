package com.main.typeRacer;

import com.main.typeRacer.Service.FactService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TypeRacerApplication {

    public static void main(String[] args) {
		//final FactService factService = new FactService();
		SpringApplication.run(TypeRacerApplication.class, args);
		//System.out.println(factService.getRandomFact());
	}



}
