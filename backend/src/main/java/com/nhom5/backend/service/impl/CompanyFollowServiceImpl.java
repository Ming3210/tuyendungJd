package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.CompanyFollow;
import com.nhom5.backend.repository.CompanyFollowRepository;
import com.nhom5.backend.service.CompanyFollowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CompanyFollowServiceImpl implements CompanyFollowService {

    @Autowired
    private CompanyFollowRepository companyFollowRepository;

    @Override
    @Transactional
    public void follow(Long userId, Long enterpriseId) {
        if (!isFollowing(userId, enterpriseId)) {
            CompanyFollow follow = new CompanyFollow();
            follow.setUserId(userId);
            follow.setEnterpriseId(enterpriseId);
            companyFollowRepository.save(follow);
        }
    }

    @Override
    @Transactional
    public void unfollow(Long userId, Long enterpriseId) {
        companyFollowRepository.deleteByUserIdAndEnterpriseId(userId, enterpriseId);
    }

    @Override
    public boolean isFollowing(Long userId, Long enterpriseId) {
        return companyFollowRepository.findByUserIdAndEnterpriseId(userId, enterpriseId).isPresent();
    }

    @Override
    public List<CompanyFollow> getFollowsByUserId(Long userId) {
        return companyFollowRepository.findByUserId(userId);
    }

    @Override
    public List<CompanyFollow> getFollowersByEnterpriseId(Long enterpriseId) {
        return companyFollowRepository.findByEnterpriseId(enterpriseId);
    }
}
