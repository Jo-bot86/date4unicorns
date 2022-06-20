package de.materna.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Access(AccessType.FIELD)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Profile {

  public static final int FEE = 1;
  public static final int MAA = 2;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String nickname;

  private LocalDate birthdate;

  private short hornlength;

  private byte gender;

  @OneToMany(mappedBy = "profile", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JsonBackReference
  private List<Photo> photos;

  @Column(name = "attracted_to_gender")
  private Byte attractedToGender;

  private String description;

  private LocalDateTime lastseen;

  @ManyToMany
  @JoinTable(name="likes",
      joinColumns=@JoinColumn(name="likee_fk"),
      inverseJoinColumns=@JoinColumn(name="liker_fk")
  )
  @JsonBackReference
  private List<Profile> liker;

  @ManyToMany
  @JoinTable(name="likes",
      joinColumns=@JoinColumn(name="liker_fk"),
      inverseJoinColumns=@JoinColumn(name="likee_fk")
  )
  @JsonBackReference
  private List<Profile> likee;

  @Override
  public boolean equals(Object o) {
    return o instanceof Profile profile
        && nickname.equals(profile.nickname);
  }

  @Override
  public int hashCode() {
    return nickname.hashCode();
  }

  @Override
  public String toString() {
    return "Profile[id=%d]".formatted(id);
  }
}
