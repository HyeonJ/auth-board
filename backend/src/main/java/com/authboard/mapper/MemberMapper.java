package com.authboard.mapper;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.authboard.domain.Member;

@Mapper
public interface MemberMapper {

    Optional<Member> findByEmail(String email);

    Optional<Member> findById(Long id);

    void insert(Member member);
}
