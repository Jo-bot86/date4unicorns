package de.materna.controller;

import de.materna.entities.Profile;
import de.materna.entities.Unicorn;
import de.materna.services.ProfileService;
import de.materna.services.SearchService;
import de.materna.services.UnicornService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SearchRestController {

  private SearchService searchServiceService;

  private ProfileService profileService;

  private UnicornService unicornService;


  @Autowired
  public SearchRestController(SearchService searchService, ProfileService profileService, UnicornService unicornService) {
    this.searchServiceService = searchService;
    this.profileService = profileService;
    this.unicornService = unicornService;
  }

  @GetMapping("/api/v1/search")
  public List<Profile> getSearchResults(@RequestParam String minAge,
                                        @RequestParam String maxAge,
                                        @RequestParam String minHornLength,
                                        @RequestParam String maxHornLength,
                                        @RequestParam String gender,
                                        @RequestParam String attractedToGender) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentPrincipalName = authentication.getName();
    Unicorn unicorn = unicornService.findUnicornByEmail(currentPrincipalName);
    String nickname = unicorn.getProfile().getNickname();
    Byte parsedGender=null;
    Byte parsedAttractedToGender=null;

    if(!gender.equals("")) parsedGender = Byte.parseByte(gender);
    if(!attractedToGender.equals("")) parsedAttractedToGender = Byte.parseByte(attractedToGender);
    return searchServiceService.getSearchResults(
        Integer.parseInt(minAge),
        Integer.parseInt(maxAge),
        Short.parseShort(minHornLength),
        Short.parseShort(maxHornLength),
        parsedGender,
        parsedAttractedToGender,
        nickname);
  }


  @GetMapping("/api/v1/search/max_age")
  public Integer getMaxAge() {
    return profileService.getMaxAge();
  }

  @GetMapping("/api/v1/search/min_age")
  public Integer getMinAge() {
    return profileService.getMinAge();
  }

  @GetMapping("/api/v1/search/max_hornlength")
  public Integer getMaxHornLength() {
    return profileService.getMaxHornLength();
  }

  @GetMapping("/api/v1/search/min_hornlength")
  public Integer getMinHornLength() {
    return profileService.getMinHornLength();
  }
}
