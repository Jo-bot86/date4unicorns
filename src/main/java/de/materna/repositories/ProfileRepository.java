package de.materna.repositories;

import de.materna.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {

  Profile getByNickname(String nickname);

  List<Profile> getAllByLikee(Profile profile);
  @Query("select max(p.birthdate) from Profile p")
  LocalDate getByMaxBirthdate();

  @Query("select min(p.birthdate) from Profile p")
  LocalDate getByMinBirthdate();

  @Query("select max(p.hornlength) from Profile p")
  Integer getMaxHornLength();

  @Query("select min(p.hornlength) from Profile p")
  Integer getMinHornLength();


  List<Profile> getProfilesByBirthdateBetweenAndHornlengthBetweenAndGenderAndAttractedToGenderAndNicknameNot(
      LocalDate minYear,
      LocalDate maxYear,
      short minHornLength,
      short maxHornLength,
      byte gender,
      byte attractedToGender,
      String nickname
  );
  List<Profile> getProfilesByBirthdateBetweenAndHornlengthBetweenAndAttractedToGenderAndNicknameNot(
      LocalDate minYear,
      LocalDate maxYear,
      short minHornLength,
      short maxHornLength,
      byte attractedToGender,
      String nickname
  );

  List<Profile> getProfilesByBirthdateBetweenAndHornlengthBetweenAndGenderAndNicknameNot(
      LocalDate minYear,
      LocalDate maxYear,
      short minHornLength,
      short maxHornLength,
      byte gender,
      String nickname
  );

  List<Profile> getProfilesByBirthdateBetweenAndHornlengthBetweenAndNicknameNot(
      LocalDate minYear,
      LocalDate maxYear,
      short minHornLength,
      short maxHornLength,
      String nickname
  );
}
