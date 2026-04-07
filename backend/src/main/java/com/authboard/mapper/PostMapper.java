package com.authboard.mapper;

import java.util.List;
import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.authboard.domain.Post;

@Mapper
public interface PostMapper {

    List<Post> findAll();

    Optional<Post> findById(Long id);

    void insert(Post post);

    void update(Post post);

    void deleteById(Long id);

    void deleteByMemberId(Long memberId);
}
