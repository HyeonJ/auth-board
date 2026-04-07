package com.authboard.dto;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class MemberResponse {

    private final Long id;
    private final String email;
    private final String nickname;
    private final String role;
    private final LocalDateTime createdAt;

    public MemberResponse(Long id, String email, String nickname, String role, LocalDateTime createdAt) {
        this.id = id;
        this.email = email;
        this.nickname = nickname;
        this.role = role;
        this.createdAt = createdAt;
    }
}
