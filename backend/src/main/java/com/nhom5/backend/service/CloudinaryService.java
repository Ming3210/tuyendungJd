package com.nhom5.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file, String folderName) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String resourceType = "auto";
        
        // Ensure Office documents are handled as 'raw' to preserve their integrity
        if (originalFilename != null && (originalFilename.toLowerCase().endsWith(".docx") || originalFilename.toLowerCase().endsWith(".doc"))) {
            resourceType = "raw";
        }

        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                        "folder", folderName,
                        "resource_type", resourceType,
                        "use_filename", true,
                        "unique_filename", true
                ));
        return uploadResult.get("secure_url").toString();
    }
}
