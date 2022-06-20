package de.materna.security.services;


import de.materna.entities.Unicorn;
import de.materna.repositories.UnicornRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import javax.servlet.http.HttpServletRequest;
import java.util.Collection;
import java.util.List;

@Configuration
public class UnicornDetailsService implements UserDetailsService{

  private UnicornRepository unicornRepository;
  private AuthenticationManager authenticationManager;


  @Autowired
  public UnicornDetailsService(UnicornRepository unicornRepository){
    this.unicornRepository = unicornRepository;
  }

  public void authWithAuthManager(HttpServletRequest request, String username, String password) {
    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
    authToken.setDetails(new WebAuthenticationDetails(request));

    Authentication authentication = authenticationManager.authenticate(authToken);

    SecurityContextHolder.getContext().setAuthentication(authentication);
  }

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    Unicorn unicorn = unicornRepository.findUnicornByEmail(email);

    if (unicorn == null) throw new UsernameNotFoundException("email " + email + " does not exists");

    return new UserDetails() {
      @Override
      public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(() -> "USER");
      }

      @Override
      public String getPassword() {
        return unicorn.getPassword();
      }

      @Override
      public String getUsername() {
        return unicorn.getEmail();
      }

      @Override
      public boolean isAccountNonExpired() {
        return true;
      }

      @Override
      public boolean isAccountNonLocked() {
        return true;
      }

      @Override
      public boolean isCredentialsNonExpired() {
        return true;
      }

      @Override
      public boolean isEnabled() {
        return true;
      }
    };
  }

  public Unicorn createUnicorn(Unicorn unicorn) {
    unicorn.setPassword("{noop}" + unicorn.getPassword());

    return unicornRepository.save(unicorn);
  }
}
