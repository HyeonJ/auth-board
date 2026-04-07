package com.authboard.domain;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Post {

    private Long id;
    private String title;
    private String content;
    private Long memberId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private String nickname;
}
