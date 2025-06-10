// Statistics Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = {
        track: document.getElementById('statisticsTrack'),
        slides: [],
        indicators: document.getElementById('carouselIndicators'),
        prevBtn: document.getElementById('prevBtn'),
        nextBtn: document.getElementById('nextBtn'),
        currentSlide: 0,
        isPlaying: true,
        autoplayInterval: null
    };
    
    // Initialize carousel if elements exist
    if (carousel.track) {
        initializeCarousel();
    }
    
    function initializeCarousel() {
        carousel.slides = Array.from(carousel.track.querySelectorAll('.stat-slide'));
        
        if (carousel.slides.length === 0) return;
        
        createIndicators();
        bindEvents();
        startAutoplay();
        
        // Set initial state
        updateCarousel();
    }
    
    function createIndicators() {
        if (!carousel.indicators) return;
        
        carousel.indicators.innerHTML = '';
        
        carousel.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'indicator';
            indicator.setAttribute('aria-label', `Go to slide ${index + 1}`);
            
            if (index === 0) {
                indicator.classList.add('active');
            }
            
            indicator.addEventListener('click', () => {
                goToSlide(index);
                pauseAutoplay();
                startAutoplay(); // Restart autoplay after manual interaction
            });
            
            carousel.indicators.appendChild(indicator);
        });
    }
    
    function bindEvents() {
        if (carousel.prevBtn) {
            carousel.prevBtn.addEventListener('click', () => {
                previousSlide();
                pauseAutoplay();
                startAutoplay();
            });
        }
        
        if (carousel.nextBtn) {
            carousel.nextBtn.addEventListener('click', () => {
                nextSlide();
                pauseAutoplay();
                startAutoplay();
            });
        }
        
        // Pause on hover
        carousel.track.addEventListener('mouseenter', pauseAutoplay);
        carousel.track.addEventListener('mouseleave', startAutoplay);
        
        // Keyboard navigation
        document.addEventListener('keydown', (event) => {
            if (document.activeElement.closest('.carousel-container')) {
                switch(event.key) {
                    case 'ArrowLeft':
                        event.preventDefault();
                        previousSlide();
                        pauseAutoplay();
                        startAutoplay();
                        break;
                    case 'ArrowRight':
                        event.preventDefault();
                        nextSlide();
                        pauseAutoplay();
                        startAutoplay();
                        break;
                }
            }
        });
        
        // Pause autoplay when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                pauseAutoplay();
            } else if (carousel.isPlaying) {
                startAutoplay();
            }
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        carousel.track.addEventListener('touchstart', (event) => {
            startX = event.touches[0].clientX;
            isDragging = true;
            pauseAutoplay();
        });
        
        carousel.track.addEventListener('touchmove', (event) => {
            if (!isDragging) return;
            currentX = event.touches[0].clientX;
        });
        
        carousel.track.addEventListener('touchend', (event) => {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            const threshold = 50;
            
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }
            }
            
            startAutoplay();
        });
    }
    
    function updateCarousel() {
        // Update slides
        carousel.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            if (index === carousel.currentSlide) {
                slide.classList.add('active');
            } else if (index === getPreviousSlideIndex()) {
                slide.classList.add('prev');
            }
        });
        
        // Update indicators
        const indicators = carousel.indicators?.querySelectorAll('.indicator');
        if (indicators) {
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === carousel.currentSlide);
            });
        }
        
        // Update button states
        updateButtonStates();
    }
    
    function updateButtonStates() {
        if (carousel.prevBtn) {
            carousel.prevBtn.setAttribute('aria-disabled', carousel.currentSlide === 0);
        }
        
        if (carousel.nextBtn) {
            carousel.nextBtn.setAttribute('aria-disabled', 
                carousel.currentSlide === carousel.slides.length - 1);
        }
    }
    
    function goToSlide(index) {
        if (index < 0 || index >= carousel.slides.length) return;
        
        carousel.currentSlide = index;
        updateCarousel();
        announceSlideChange();
    }
    
    function nextSlide() {
        const nextIndex = (carousel.currentSlide + 1) % carousel.slides.length;
        goToSlide(nextIndex);
    }
    
    function previousSlide() {
        const prevIndex = carousel.currentSlide === 0 
            ? carousel.slides.length - 1 
            : carousel.currentSlide - 1;
        goToSlide(prevIndex);
    }
    
    function getPreviousSlideIndex() {
        return carousel.currentSlide === 0 
            ? carousel.slides.length - 1 
            : carousel.currentSlide - 1;
    }
    
    function startAutoplay() {
        if (!carousel.isPlaying) return;
        
        pauseAutoplay(); // Clear any existing interval
        
        carousel.autoplayInterval = setInterval(() => {
            nextSlide();
        }, 5000); // 5 seconds as specified
    }
    
    function pauseAutoplay() {
        if (carousel.autoplayInterval) {
            clearInterval(carousel.autoplayInterval);
            carousel.autoplayInterval = null;
        }
    }
    
    function announceSlideChange() {
        // For screen readers
        const currentSlideElement = carousel.slides[carousel.currentSlide];
        const statNumber = currentSlideElement.querySelector('.stat-number')?.textContent;
        const statDescription = currentSlideElement.querySelector('.stat-description')?.textContent;
        
        if (statNumber && statDescription) {
            const announcement = `Slide ${carousel.currentSlide + 1} of ${carousel.slides.length}: ${statNumber}, ${statDescription}`;
            
            // Create or update live region for screen readers
            let liveRegion = document.getElementById('carousel-live-region');
            if (!liveRegion) {
                liveRegion = document.createElement('div');
                liveRegion.id = 'carousel-live-region';
                liveRegion.setAttribute('aria-live', 'polite');
                liveRegion.setAttribute('aria-atomic', 'true');
                liveRegion.style.position = 'absolute';
                liveRegion.style.left = '-10000px';
                liveRegion.style.width = '1px';
                liveRegion.style.height = '1px';
                liveRegion.style.overflow = 'hidden';
                document.body.appendChild(liveRegion);
            }
            
            liveRegion.textContent = announcement;
        }
    }
    
    // Public API
    window.StatisticsCarousel = {
        goToSlide,
        nextSlide,
        previousSlide,
        startAutoplay,
        pauseAutoplay,
        getCurrentSlide: () => carousel.currentSlide,
        getTotalSlides: () => carousel.slides.length
    };
});
