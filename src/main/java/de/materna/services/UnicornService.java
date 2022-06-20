package de.materna.services;

import de.materna.entities.Unicorn;
import de.materna.repositories.UnicornRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UnicornService {
  private UnicornRepository unicornRepository;

  @Autowired
  public UnicornService(UnicornRepository unicornRepository){
    this.unicornRepository = unicornRepository;
  }


  public Unicorn findUnicornByEmail(String currentPrincipalName) {
    return unicornRepository.findUnicornByEmail(currentPrincipalName);
  }
}
