package de.materna.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()
        .authorizeHttpRequests(authorizeRequests ->
            authorizeRequests
                .antMatchers("/", "/login", "/signup", "/static/js/*.js").permitAll()
                .anyRequest().authenticated()
        )
        .formLogin(formLogin ->
            formLogin
                .loginPage("/login")
//                .defaultSuccessUrl("/", true)
                .loginProcessingUrl("/perform_login")
                .permitAll()
        )
        .logout(httpSecurityLogoutConfigurer ->
            httpSecurityLogoutConfigurer.permitAll()
                .logoutSuccessUrl("/")
                .logoutUrl("/perform_logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID"));

    return http.build();
  }
}
