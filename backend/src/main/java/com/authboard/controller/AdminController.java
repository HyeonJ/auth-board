package com.authboard.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.authboard.dto.ApiResponse;
import com.authboard.dto.MemberResponse;
import com.authboard.service.AdminService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/members")
    public ResponseEntity<ApiResponse<List<MemberResponse>>> members() {
        log.info("[GET /api/admin/members]");
        return ResponseEntity.ok(ApiResponse.success(adminService.findAllMembers()));
    }

    @DeleteMapping("/members/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteMember(@PathVariable Long id,
                                                          Authentication authentication) {
        Long adminId = (Long) authentication.getPrincipal();
        log.info("[DELETE /api/admin/members/{}] adminId={}", id, adminId);
        adminService.deleteMember(id, adminId);
        return ResponseEntity.ok(ApiResponse.success());
    }
}
