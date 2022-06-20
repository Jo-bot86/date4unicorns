package de.materna.entities;

import de.materna.entities.Profile;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
public class Unicorn {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn( name = "profile_fk" )
  private Profile profile;

  private String email;

  private String password;

}

