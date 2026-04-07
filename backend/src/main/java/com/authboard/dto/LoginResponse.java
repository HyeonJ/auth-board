package com.authboard.dto;

import lombok.Getter;

@Getter
public class LoginResponse {

    private final String accessToken;
    private final String nickname;
    private final String role;

    public LoginResponse(String accessToken, String nickname, String role) {
        this.accessToken = accessToken;
        this.nickname = nickname;
        this.role = role;
    }
}
