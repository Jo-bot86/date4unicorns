package de.materna.security.services;

public class UnicornDetailsManger  {

//  private UnicornRepository unicornRepository;
//
//  @Autowired
//  public UnicornDetailsManger(UnicornRepository unicornRepository){
//    this.unicornRepository = unicornRepository;
//  }
//
//  @Override
//  public void createUser(UserDetails user) {
//
//  }
//
//  @Override
//  public void updateUser(UserDetails user) {
//
//  }
//
//  @Override
//  public void deleteUser(String username) {
//
//  }
//
//  @Override
//  public void changePassword(String oldPassword, String newPassword) {
//
//  }
//
//  @Override
//  public boolean userExists(String username) {
//    return false;
//  }

//  @Override
//  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//    Unicorn unicorn = unicornRepository.findUnicornByEmail(email);
//
//    if(unicorn == null) throw new UsernameNotFoundException("email " + email + " does not exists");
//
//    return new UserDetails() {
//      @Override
//      public Collection<? extends GrantedAuthority> getAuthorities() {
//        return List.of(() -> "USER");
//      }
//
//      @Override
//      public String getPassword() {
//        return unicorn.getPassword();
//      }
//
//      @Override
//      public String getUsername() {
//        return unicorn.getEmail();
//      }
//
//      @Override
//      public boolean isAccountNonExpired() {
//        return true;
//      }
//
//      @Override
//      public boolean isAccountNonLocked() {
//        return true;
//      }
//
//      @Override
//      public boolean isCredentialsNonExpired() {
//        return true;
//      }
//
//      @Override
//      public boolean isEnabled() {
//        return true;
//      }
//    };
//  }

}
