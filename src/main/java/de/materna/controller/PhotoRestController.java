package de.materna.controller;

import de.materna.dto.PhotoDTO;
import de.materna.entities.Photo;
import de.materna.entities.Profile;
import de.materna.services.AwtBicubicThumbnail;
import de.materna.services.PhotoService;
import de.materna.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

@RestController
public class PhotoRestController {

  PhotoService photoService;
  ProfileService profileService;

  AwtBicubicThumbnail awtBicubicThumbnail;

  @Autowired
  public PhotoRestController(PhotoService photoService, ProfileService profileService, AwtBicubicThumbnail awtBicubicThumbnail) {
    this.photoService = photoService;
    this.profileService = profileService;
    this.awtBicubicThumbnail = awtBicubicThumbnail;
  }

  @GetMapping("/api/v1/photo/{nickname}")
  public PhotoDTO getProfilePhoto(@PathVariable String nickname){
    Profile profile = profileService.getByNickname(nickname);
    return PhotoDTO.fromPhoto(photoService.getProfilePhoto(profile), nickname);
  }

}
