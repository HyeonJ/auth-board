package com.authboard.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.authboard.domain.Member;
import com.authboard.dto.MemberResponse;
import com.authboard.mapper.MemberMapper;
import com.authboard.mapper.PostMapper;
import com.authboard.mapper.RefreshTokenMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {

    private final MemberMapper memberMapper;
    private final PostMapper postMapper;
    private final RefreshTokenMapper refreshTokenMapper;

    @Transactional(readOnly = true)
    public List<MemberResponse> findAllMembers() {
        log.info("[findAllMembers] 회원 목록 조회");
        return memberMapper.findAll().stream()
                .map(m -> new MemberResponse(m.getId(), m.getEmail(), m.getNickname(), m.getRole(), m.getCreatedAt()))
                .toList();
    }

    @Transactional
    public void deleteMember(Long targetId, Long adminId) {
        log.info("[deleteMember] targetId={}, adminId={}", targetId, adminId);

        if (targetId.equals(adminId)) {
            throw new IllegalArgumentException("자기 자신은 강제 탈퇴할 수 없습니다");
        }

        Member target = memberMapper.findById(targetId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다"));

        postMapper.deleteByMemberId(target.getId());
        refreshTokenMapper.deleteByMemberId(target.getId());
        memberMapper.deleteById(target.getId());

        log.info("[deleteMember] 완료: email={}", target.getEmail());
    }
}
