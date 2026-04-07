package com.nhom5.backend.controller;

import com.nhom5.backend.model.Carousel;
import com.nhom5.backend.service.CarouselService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carousel")
@CrossOrigin(origins = "*")
public class CarouselController {

    @Autowired
    private CarouselService carouselService;

    @GetMapping
    public List<Carousel> getAll() {
        return carouselService.getAllCarousels();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Carousel> getById(@PathVariable Long id) {
        return carouselService.getCarouselById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Carousel create(@RequestBody Carousel carousel) {
        return carouselService.createCarousel(carousel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Carousel> update(@PathVariable Long id, @RequestBody Carousel carousel) {
        return carouselService.updateCarousel(id, carousel)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Carousel> patch(@PathVariable Long id, @RequestBody Carousel patch) {
        return carouselService.getCarouselById(id).map(existing -> {
            if (patch.getStatus() != null) existing.setStatus(patch.getStatus());
            if (patch.getTitle() != null) existing.setTitle(patch.getTitle());
            if (patch.getImgUrl() != null) existing.setImgUrl(patch.getImgUrl());
            if (patch.getIdx() != null) existing.setIdx(patch.getIdx());
            return ResponseEntity.ok(carouselService.createCarousel(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (carouselService.deleteCarousel(id)) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
