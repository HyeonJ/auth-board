package com.authboard.mapper;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.authboard.domain.RefreshToken;

@Mapper
public interface RefreshTokenMapper {

    Optional<RefreshToken> findByToken(String token);

    void insert(RefreshToken refreshToken);

    void deleteByMemberId(Long memberId);
}
