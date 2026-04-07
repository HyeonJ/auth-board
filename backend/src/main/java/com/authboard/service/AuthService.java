package com.authboard.service;

import java.time.LocalDateTime;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.authboard.domain.Member;
import com.authboard.domain.RefreshToken;
import com.authboard.dto.LoginRequest;
import com.authboard.dto.LoginResponse;
import com.authboard.dto.SignupRequest;
import com.authboard.mapper.MemberMapper;
import com.authboard.mapper.RefreshTokenMapper;
import com.authboard.security.JwtProvider;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final MemberMapper memberMapper;
    private final RefreshTokenMapper refreshTokenMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Transactional
    public void signup(SignupRequest request) {
        log.info("[signup] email={}", request.getEmail());

        memberMapper.findByEmail(request.getEmail()).ifPresent(m -> {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다");
        });

        Member member = new Member();
        member.setEmail(request.getEmail());
        member.setPassword(passwordEncoder.encode(request.getPassword()));
        member.setNickname(request.getNickname());
        member.setRole("USER");

        memberMapper.insert(member);
        log.info("[signup] 완료: memberId={}", member.getId());
    }

    @Transactional
    public LoginResult login(LoginRequest request) {
        log.info("[login] email={}", request.getEmail());

        Member member = memberMapper.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다"));

        if (!passwordEncoder.matches(request.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다");
        }

        String accessToken = jwtProvider.createAccessToken(member.getId(), member.getEmail(), member.getRole());
        String refreshToken = jwtProvider.createRefreshToken(member.getId());

        refreshTokenMapper.deleteByMemberId(member.getId());

        RefreshToken tokenEntity = new RefreshToken();
        tokenEntity.setMemberId(member.getId());
        tokenEntity.setToken(refreshToken);
        tokenEntity.setExpiresAt(LocalDateTime.now().plusSeconds(jwtProvider.getRefreshTokenExpiry() / 1000));
        refreshTokenMapper.insert(tokenEntity);

        log.info("[login] 완료: memberId={}", member.getId());

        LoginResponse loginResponse = new LoginResponse(accessToken, member.getNickname(), member.getRole());
        return new LoginResult(loginResponse, refreshToken);
    }

    @Transactional(readOnly = true)
    public String refresh(String refreshTokenValue) {
        log.info("[refresh] 토큰 갱신 요청");

        if (!jwtProvider.validateToken(refreshTokenValue)) {
            throw new IllegalArgumentException("유효하지 않은 Refresh Token입니다");
        }

        RefreshToken storedToken = refreshTokenMapper.findByToken(refreshTokenValue)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 Refresh Token입니다"));

        if (storedToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("만료된 Refresh Token입니다");
        }

        Member member = memberMapper.findById(storedToken.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다"));

        log.info("[refresh] 완료: memberId={}", member.getId());
        return jwtProvider.createAccessToken(member.getId(), member.getEmail(), member.getRole());
    }

    @Transactional
    public void logout(Long memberId) {
        log.info("[logout] memberId={}", memberId);
        refreshTokenMapper.deleteByMemberId(memberId);
        log.info("[logout] 완료");
    }

    public record LoginResult(LoginResponse response, String refreshToken) {
    }
}
