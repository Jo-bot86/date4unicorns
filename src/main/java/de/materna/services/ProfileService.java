package de.materna.services;


import de.materna.entities.Photo;
import de.materna.entities.Profile;
import de.materna.repositories.ProfileRepository;
import de.materna.entities.Unicorn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

  private ProfileRepository profileRepository;

  private UnicornService unicornService;


  @Autowired
  public ProfileService(ProfileRepository profileRepository, UnicornService unicornService) {
    this.profileRepository = profileRepository;
    this.unicornService = unicornService;
  }

  public List<Profile> getAllProfiles() {
    return profileRepository.findAll();
  }

  public Profile getProfileById(String id) {
    return profileRepository.findById(Long.valueOf(id)).get();
  }

  public Profile savePhoto(String id) {
    Photo newPhoto = new Photo();
    newPhoto.setCreated(LocalDateTime.now());
    newPhoto.setName("photoPath");
    newPhoto.setProfilePhoto(false);
    Optional<Profile> maybeProfile = profileRepository.findById(Long.valueOf(id));
    maybeProfile.ifPresent(profile -> {
      profile.getPhotos().add(newPhoto);
      newPhoto.setProfile(profile);
      profileRepository.save(profile);
    });
    return maybeProfile.get();
  }

  public Profile createProfile(Profile profile) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentPrincipalName = authentication.getName();
    Unicorn unicorn = unicornService.findUnicornByEmail(currentPrincipalName);
    Profile savedProfile = profileRepository.save(profile);
    System.out.println(savedProfile);
    unicorn.setProfile(savedProfile);
    return savedProfile;
  }

  public Profile getByNickname(String nickname) {
    return profileRepository.getByNickname(nickname);
  }

  public Profile updateProfile(Profile profile) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentPrincipalName = authentication.getName();
    Unicorn unicorn = unicornService.findUnicornByEmail(currentPrincipalName);
    Profile profileToUpdate = profileRepository.getReferenceById( unicorn.getProfile().getId());
    profileToUpdate.setNickname(profile.getNickname());
    profileToUpdate.setBirthdate(profile.getBirthdate());
    profileToUpdate.setHornlength(profile.getHornlength());
    profileToUpdate.setGender(profile.getGender());
    profileToUpdate.setAttractedToGender(profile.getAttractedToGender());
    profileToUpdate.setDescription(profile.getDescription());
    profileToUpdate.setPhotos(profile.getPhotos());
    return profileRepository.save(profileToUpdate);
  }

  public Integer getMaxAge() {
    return LocalDate.now().getYear() - profileRepository.getByMinBirthdate().getYear();
  }

  public Integer getMinAge(){
    return LocalDate.now().getYear() - profileRepository.getByMaxBirthdate().getYear();
  }

  public Integer getMaxHornLength() {
   return profileRepository.getMaxHornLength();
  }

  public Integer getMinHornLength() {
   return profileRepository.getMinHornLength();
  }

  public List<Profile> getProfileLiker(Profile profile) {
    return profileRepository.getAllByLikee(profile);
  }
}
