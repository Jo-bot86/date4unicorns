package de.materna.controller;

import de.materna.services.UnicornService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class UnicornRestController {

  private UnicornService unicornService;

  @Autowired
  public UnicornRestController(UnicornService unicornService){
    this.unicornService = unicornService;
  }



}
