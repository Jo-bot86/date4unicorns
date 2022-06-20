package de.materna.controller;

import de.materna.dto.PhotoDTO;
import de.materna.entities.Photo;
import de.materna.entities.Profile;
import de.materna.entities.Unicorn;
import de.materna.services.PhotoService;
import de.materna.services.ProfileService;
import de.materna.services.UnicornService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.nio.file.Path;
import java.util.List;


@RestController
public class ProfileRestController {

  private ProfileService profileService;
  private UnicornService unicornService;

  private PhotoService photoService;

  @Autowired
  public ProfileRestController(ProfileService profileService, UnicornService unicornService, PhotoService photoService) {
    this.profileService = profileService;
    this.unicornService = unicornService;
    this.photoService = photoService;
  }

  @PostMapping("/api/v1/profiles/{id}/photos")
  @ResponseBody
  public Profile savePhoto(@PathVariable String id) {
    return profileService.savePhoto(id);
  }


  @GetMapping("/api/v1/profile")
  public Profile getProfile() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentPrincipalName = authentication.getName();
    Unicorn unicorn = unicornService.findUnicornByEmail(currentPrincipalName);
    return unicorn.getProfile();
  }

  @PostMapping("/api/v1/profile")
  @Transactional
  public Profile createProfile(@RequestBody Profile profile) {
    return profileService.createProfile(profile);
  }

  @GetMapping("/api/v1/profile/{nickname}/photos")
  public List<PhotoDTO> getAllPhotos(@PathVariable String nickname) {
    Profile profile = profileService.getByNickname(nickname);
    return photoService.getAllPhotosFor(profile).stream()
        .map(photo -> PhotoDTO.fromPhoto(photo, profile.getNickname()))
        .toList();
  }

  @PutMapping("/api/v1/profile/edit")
  @Transactional
  public Profile updateProfile(@RequestBody Profile profile){
    return profileService.updateProfile(profile);
  }

  @GetMapping("/api/v1/profile/{nickname}")
  public Profile getMemberProfile(@PathVariable String nickname){
    return profileService.getByNickname(nickname);
  }

  @GetMapping("/api/v1/profile/liker")
  public List<Profile> getProfileLiker(){
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentPrincipalName = authentication.getName();
    Unicorn unicorn = unicornService.findUnicornByEmail(currentPrincipalName);
    return profileService.getProfileLiker(unicorn.getProfile());
  }

  @GetMapping("/api/v1/profile/liker/{nickname}")
  public List<Profile> getProfileLiker(@PathVariable String nickname){
    return profileService.getProfileLiker(profileService.getByNickname(nickname));
  }


}

