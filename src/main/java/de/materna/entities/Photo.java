package de.materna.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Access( AccessType.FIELD )
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
public class Photo {
  @Id
  @GeneratedValue( strategy = GenerationType.IDENTITY )
  private Long id;

  @ManyToOne
  @JoinColumn( name = "profile_fk" )
  private Profile profile;

  public String name;

  @Column( name = "is_profile_photo" )
  private boolean isProfilePhoto;

  @CreatedDate
  private LocalDateTime created;

  @Override public String toString() {
    return "Photo[" + id + "]";
  }

}
