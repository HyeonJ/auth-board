package com.authboard.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.authboard.domain.Post;
import com.authboard.dto.PostDetailResponse;
import com.authboard.dto.PostListResponse;
import com.authboard.dto.PostRequest;
import com.authboard.mapper.PostMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {

    private final PostMapper postMapper;

    @Transactional(readOnly = true)
    public List<PostListResponse> findAll() {
        log.info("[findAll] 글 목록 조회");
        return postMapper.findAll().stream()
                .map(p -> new PostListResponse(p.getId(), p.getTitle(), p.getNickname(), p.getCreatedAt()))
                .toList();
    }

    @Transactional(readOnly = true)
    public PostDetailResponse findById(Long id) {
        log.info("[findById] postId={}", id);
        Post post = postMapper.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다"));
        return new PostDetailResponse(
                post.getId(), post.getTitle(), post.getContent(),
                post.getMemberId(), post.getNickname(),
                post.getCreatedAt(), post.getUpdatedAt());
    }

    @Transactional
    public Long create(PostRequest request, Long memberId) {
        log.info("[create] memberId={}", memberId);
        Post post = new Post();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setMemberId(memberId);
        postMapper.insert(post);
        log.info("[create] 완료: postId={}", post.getId());
        return post.getId();
    }

    @Transactional
    public void update(Long postId, PostRequest request, Long memberId) {
        log.info("[update] postId={}, memberId={}", postId, memberId);
        Post post = postMapper.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다"));

        if (!post.getMemberId().equals(memberId)) {
            throw new SecurityException("본인의 글만 수정할 수 있습니다");
        }

        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        postMapper.update(post);
        log.info("[update] 완료");
    }

    @Transactional
    public void delete(Long postId, Long memberId, String role) {
        log.info("[delete] postId={}, memberId={}, role={}", postId, memberId, role);
        Post post = postMapper.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 게시글입니다"));

        if (!post.getMemberId().equals(memberId) && !"ADMIN".equals(role)) {
            throw new SecurityException("삭제 권한이 없습니다");
        }

        postMapper.deleteById(postId);
        log.info("[delete] 완료");
    }
}
