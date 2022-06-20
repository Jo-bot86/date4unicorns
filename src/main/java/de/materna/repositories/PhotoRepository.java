package de.materna.repositories;

import de.materna.entities.Photo;
import de.materna.entities.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Long> {

  List<Photo> getAllByProfile(Profile profile);

  @Query("select p from Photo p where p.profile = :profile and p.isProfilePhoto=true")
  Photo getProfilePhoto(Profile profile);
}
