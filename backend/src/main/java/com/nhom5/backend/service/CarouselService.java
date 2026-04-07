package com.nhom5.backend.service;

import com.nhom5.backend.model.Carousel;
import java.util.List;
import java.util.Optional;

public interface CarouselService {
    List<Carousel> getAllCarousels();
    Optional<Carousel> getCarouselById(Long id);
    Carousel createCarousel(Carousel carousel);
    Optional<Carousel> updateCarousel(Long id, Carousel carouselDetails);
    boolean deleteCarousel(Long id);
}
