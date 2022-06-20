package de.materna.services;

import de.materna.entities.Profile;
import de.materna.repositories.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class SearchService {

  private ProfileRepository profileRepository;

  @Autowired
  public SearchService(ProfileRepository profileRepository){
    this.profileRepository = profileRepository;
  }


  public List<Profile> getSearchResults(int minAge, int maxAge, short minHornLength, short maxHornLength, Byte gender, Byte attractedToGender,String nickname) {
    LocalDate maxYear = LocalDate.now().minusYears(minAge);
    LocalDate minYear = LocalDate.now().minusYears(maxAge);
    if(gender == null && attractedToGender == null) return profileRepository.getProfilesByBirthdateBetweenAndHornlengthBetweenAndNicknameNot(minYear, maxYear, minHornLength, maxHornLength, nickname);
    if(attractedToGender == null) return profileRepository.getProfilesByBirthdateBetweenAndHornlengthBetweenAndGenderAndNicknameNot(minYear, maxYear, minHornLength, maxHornLength, gender, nickname);
    if(gender == null) return profileRepository.getProfilesByBirthdateBetweenAndHornlengthBetweenAndAttractedToGenderAndNicknameNot(minYear, maxYear, minHornLength, maxHornLength, attractedToGender, nickname);

    return profileRepository.getProfilesByBirthdateBetweenAndHornlengthBetweenAndGenderAndAttractedToGenderAndNicknameNot(minYear, maxYear, minHornLength, maxHornLength, gender, attractedToGender, nickname);
  }
}
