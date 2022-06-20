package de.materna.repositories;

import de.materna.entities.Unicorn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UnicornRepository extends JpaRepository<Unicorn, Long> {

  Unicorn findUnicornByEmail(String email);
}
