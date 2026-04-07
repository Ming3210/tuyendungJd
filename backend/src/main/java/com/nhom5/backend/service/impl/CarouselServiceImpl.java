package com.nhom5.backend.service.impl;

import com.nhom5.backend.model.Carousel;
import com.nhom5.backend.repository.CarouselRepository;
import com.nhom5.backend.service.CarouselService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarouselServiceImpl implements CarouselService {

    @Autowired
    private CarouselRepository carouselRepository;

    @Override
    public List<Carousel> getAllCarousels() {
        return carouselRepository.findAll();
    }

    @Override
    public Optional<Carousel> getCarouselById(Long id) {
        return carouselRepository.findById(id);
    }

    @Override
    public Carousel createCarousel(Carousel carousel) {
        return carouselRepository.save(carousel);
    }

    @Override
    public Optional<Carousel> updateCarousel(Long id, Carousel details) {
        return carouselRepository.findById(id).map(c -> {
            c.setTitle(details.getTitle());
            c.setIdx(details.getIdx());
            c.setImgUrl(details.getImgUrl());
            c.setStatus(details.getStatus());
            return carouselRepository.save(c);
        });
    }

    @Override
    public boolean deleteCarousel(Long id) {
        if (carouselRepository.existsById(id)) {
            carouselRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
