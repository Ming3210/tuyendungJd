package com.nhom5.backend.service;

import com.nhom5.backend.model.CompanyFollow;
import java.util.List;

public interface CompanyFollowService {
    void follow(Long userId, Long enterpriseId);
    void unfollow(Long userId, Long enterpriseId);
    boolean isFollowing(Long userId, Long enterpriseId);
    List<CompanyFollow> getFollowsByUserId(Long userId);
    List<CompanyFollow> getFollowersByEnterpriseId(Long enterpriseId);
}
