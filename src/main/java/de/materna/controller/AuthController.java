package de.materna.controller;

import de.materna.entities.Unicorn;
import de.materna.security.services.UnicornDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {

  private UnicornDetailsService unicornDetailsService;

  @PostMapping("/login")
  @ResponseBody
  public Unicorn getUnicorn(Unicorn unicorn){
    System.out.println(unicorn);
    return unicorn;
  }



}
