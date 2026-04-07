package com.authboard.domain;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshToken {

    private Long id;
    private Long memberId;
    private String token;
    private LocalDateTime expiresAt;
    private LocalDateTime createdAt;
}
