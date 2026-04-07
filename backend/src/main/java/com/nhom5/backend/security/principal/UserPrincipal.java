package com.nhom5.backend.security.principal;

import com.nhom5.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserPrincipal implements UserDetails {
    private Long id;
    private String username;
    private String fullname;
    private String password;
    private String email;
    private String phoneNumber;
    private String role;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public static UserPrincipal build(User user) {
        return UserPrincipal.builder()
                .id(user.getId())
                .username(user.getUserName())
                .fullname(user.getFullName())
                .password(user.getPassword())
                .email(user.getEmail())
                .phoneNumber(user.getPhone())
                .role(user.getRole())
                .status(user.getStatus())
                .createdAt(LocalDateTime.now())
                .authorities(Collections.singletonList(new SimpleGrantedAuthority(user.getRole())))
                .build();
    }



    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !"BLOCKED".equals(status);
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return "ACTIVE".equals(status);
    }
}
