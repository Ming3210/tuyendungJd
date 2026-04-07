package com.nhom5.backend.security.jwt;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Component
@Slf4j
public class JWTProvider {
    @Value("${jwt.secret}")
    private String secretKeyString;

    @Value("${jwt.expire}")
    private long jwtExpirationMs;

    private javax.crypto.SecretKey key; // Use SecretKey type

    @PostConstruct
    public void init() {
        // Ensure your secretKeyString is long enough!
        // If it's short, this line is likely where the 'init method failed' error happens.
        byte[] keyBytes = secretKeyString.getBytes(StandardCharsets.UTF_8);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpirationMs);

        return Jwts.builder()
                .subject(username) // New: .subject() instead of .setSubject()
                .issuedAt(now)     // New: .issuedAt() instead of .setIssuedAt()
                .expiration(expiryDate) // New: .expiration() instead of .setExpiration()
                .signWith(key)     // Algorithm is now inferred from the key
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .verifyWith(key) // New: .verifyWith() instead of .setSigningKey()
                    .build()
                    .parseSignedClaims(token); // New: .parseSignedClaims() instead of .parseClaimsJws()
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }

    public String getUsernameFromToken(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload() // New: .getPayload() instead of .getBody()
                .getSubject();
    }

    public LocalDateTime getExpiryFromToken(String token) {
        Date expiry = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();

        return expiry.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDateTime();
    }
    public boolean isTokenNearExpiry(String token, long thresholdMillis) {
        LocalDateTime expiry = getExpiryFromToken(token);
        return expiry.isBefore(LocalDateTime.now().plus(thresholdMillis, ChronoUnit.MILLIS));
    }

}
