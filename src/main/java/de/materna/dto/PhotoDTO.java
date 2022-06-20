package de.materna.dto;

import de.materna.entities.Photo;

import java.time.LocalDateTime;

public class PhotoDTO {

  public final String profileNickname;

  public final String name;

  public final boolean isProfilePhoto;

  public final LocalDateTime created;

  private PhotoDTO(Photo photo, String profileNickname) {
    this.profileNickname = profileNickname;
    this.name = photo.getName();
    this.isProfilePhoto = photo.isProfilePhoto();
    this.created = photo.getCreated();
  }

  public static PhotoDTO fromPhoto(Photo photo, String profileNickname) {
    return new PhotoDTO(photo, profileNickname);
  }

  public Photo toPhoto(PhotoDTO photoDTO){
    Photo photo = new Photo();
    photo.setName(photoDTO.name);
    photo.setProfilePhoto(photoDTO.isProfilePhoto);
    photo.setCreated(photoDTO.created);
    return photo;
  }


}
