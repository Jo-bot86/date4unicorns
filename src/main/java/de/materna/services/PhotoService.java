package de.materna.services;


import de.materna.repositories.FileSystem;
import de.materna.entities.Photo;
import de.materna.repositories.PhotoRepository;
import de.materna.entities.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import java.io.UncheckedIOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Validated
public class PhotoService {
  private final FileSystem fs;

  private final AwtBicubicThumbnail abt;

  private PhotoRepository photoRepository;

  @Autowired
  public PhotoService(FileSystem fs, AwtBicubicThumbnail abt, PhotoRepository photoRepository) {
    this.fs = fs;
    this.abt = abt;
    this.photoRepository = photoRepository;
  }

  public Optional<byte[]> download(String name) {
    try {
      return Optional.of(fs.load("unicorns\\img\\" + name + ".jpg"));
    } catch (UncheckedIOException e) {
      return Optional.empty();
    }
  }

  public Optional<byte[]> download(@Valid Photo photo) {
    return download(photo.name);
  }

  public String upload(byte[] pic) {
    String imageName = UUID.randomUUID().toString();
    fs.store(imageName + "jpg", pic);
    byte[] thumbnailBytes = abt.thumbnail(pic);
    fs.store(imageName + "-thumb.jpg", thumbnailBytes);
    return imageName;
  }
  public List<Photo> getAllPhotosFor(Profile profile) {
    return photoRepository.getAllByProfile(profile);
  }

  public byte[] encodePhoto(byte[] photo){
    return Base64.getEncoder().encode(photo);
  }

  public Optional<byte[]> getEncodedPhoto(String photoName){
    return download(photoName).map(_photo -> encodePhoto(_photo));
  }

  public Photo getProfilePhoto(Profile profile) {
    return photoRepository.getProfilePhoto(profile);
  }
}
