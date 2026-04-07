package com.authboard.domain;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Member {

    private Long id;
    private String email;
    private String password;
    private String nickname;
    private String role;
    private LocalDateTime createdAt;
}
