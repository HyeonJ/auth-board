package com.authboard.controller;

import java.util.List;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.authboard.dto.ApiResponse;
import com.authboard.dto.PostDetailResponse;
import com.authboard.dto.PostListResponse;
import com.authboard.dto.PostRequest;
import com.authboard.service.PostService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<PostListResponse>>> list() {
        log.info("[GET /api/posts]");
        return ResponseEntity.ok(ApiResponse.success(postService.findAll()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<PostDetailResponse>> detail(@PathVariable Long id) {
        log.info("[GET /api/posts/{}]", id);
        return ResponseEntity.ok(ApiResponse.success(postService.findById(id)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Long>> create(@Valid @RequestBody PostRequest request,
                                                    Authentication authentication) {
        Long memberId = (Long) authentication.getPrincipal();
        log.info("[POST /api/posts] memberId={}", memberId);
        Long postId = postService.create(request, memberId);
        return ResponseEntity.ok(ApiResponse.success(postId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> update(@PathVariable Long id,
                                                    @Valid @RequestBody PostRequest request,
                                                    Authentication authentication) {
        Long memberId = (Long) authentication.getPrincipal();
        log.info("[PUT /api/posts/{}] memberId={}", id, memberId);
        postService.update(id, request, memberId);
        return ResponseEntity.ok(ApiResponse.success());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(@PathVariable Long id,
                                                    Authentication authentication) {
        Long memberId = (Long) authentication.getPrincipal();
        String role = authentication.getAuthorities().iterator().next().getAuthority()
                .replace("ROLE_", "");
        log.info("[DELETE /api/posts/{}] memberId={}, role={}", id, memberId, role);
        postService.delete(id, memberId, role);
        return ResponseEntity.ok(ApiResponse.success());
    }
}
