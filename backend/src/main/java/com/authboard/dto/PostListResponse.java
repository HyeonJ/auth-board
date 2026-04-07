package com.authboard.dto;

import java.time.LocalDateTime;

import lombok.Getter;

@Getter
public class PostListResponse {

    private final Long id;
    private final String title;
    private final String nickname;
    private final LocalDateTime createdAt;

    public PostListResponse(Long id, String title, String nickname, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.nickname = nickname;
        this.createdAt = createdAt;
    }
}
