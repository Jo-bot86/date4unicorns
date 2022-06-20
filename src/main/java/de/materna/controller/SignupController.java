package de.materna.controller;

import de.materna.entities.Unicorn;
import de.materna.security.services.UnicornDetailsService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;


@RestController
public class SignupController {

  private UnicornDetailsService unicornDetailsService;

  @Autowired
  public SignupController(UnicornDetailsService unicornDetailsServiceService){
    this.unicornDetailsService = unicornDetailsServiceService;
  }

  @PostMapping("/signup")
  public Unicorn createUnicorn(@RequestBody Unicorn unicorn){
    return unicornDetailsService.createUnicorn(unicorn);
  }

  public void authWithHttpServletRequest(HttpServletRequest request, String username, String password) {
    try {
      request.login(username, password);
    } catch (ServletException e) {
    }
  }
}
