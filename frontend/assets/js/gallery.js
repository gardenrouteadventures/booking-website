/* assets/js/gallery.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== GALLERY FILTER =====
    const categoryBtns = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;

            galleryItems.forEach(item => {
                const itemCategory = item.dataset.category;
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;
    let currentGalleryItems = [];
    let currentIndex = 0;

    function openLightbox(index) {
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
            showLightboxImage(index);
        }
    }

    function showLightboxImage(index) {
        const item = currentGalleryItems[index];
        if (!item) return;

        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-item-overlay');
        
        if (lightboxImage) {
            lightboxImage.src = img ? img.src : '';
            lightboxImage.alt = img ? img.alt : '';
        }

        if (lightboxCaption) {
            const title = overlay ? overlay.querySelector('h4') : null;
            const desc = overlay ? overlay.querySelector('p') : null;
            lightboxCaption.querySelector('h4').textContent = title ? title.textContent : '';
            lightboxCaption.querySelector('p').textContent = desc ? desc.textContent : '';
        }

        currentIndex = index;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Check if it's a video item
            if (this.classList.contains('video-item')) {
                const videoModal = document.getElementById('videoModal');
                if (videoModal) {
                    videoModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                return;
            }

            currentGalleryItems = Array.from(document.querySelectorAll('.gallery-item:not(.video-item)'));
            const visibleItems = currentGalleryItems.filter(el => el.style.display !== 'none');
            currentGalleryItems = visibleItems;
            const idx = visibleItems.indexOf(this);
            if (idx !== -1) {
                openLightbox(idx);
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === this) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            if (currentIndex > 0) {
                showLightboxImage(currentIndex - 1);
            }
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            if (currentIndex < currentGalleryItems.length - 1) {
                showLightboxImage(currentIndex + 1);
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowLeft' && lightboxPrev) {
                lightboxPrev.click();
            } else if (e.key === 'ArrowRight' && lightboxNext) {
                lightboxNext.click();
            }
        }
    });

    // ===== VIDEO MODAL =====
    const videoModal = document.getElementById('videoModal');
    const videoModalClose = videoModal ? videoModal.querySelector('.video-modal-close') : null;
    const videoIframe = document.getElementById('videoIframe');

    if (videoModalClose) {
        videoModalClose.addEventListener('click', function() {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
            if (videoIframe) {
                videoIframe.src = '';
            }
        });
    }

    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === this) {
                videoModal.classList.remove('active');
                document.body.style.overflow = '';
                if (videoIframe) {
                    videoIframe.src = '';
                }
            }
        });
    }

    // Video items click - set iframe source
    document.querySelectorAll('.video-item').forEach(item => {
        item.addEventListener('click', function() {
            if (videoIframe) {
                // Placeholder - you can set actual video URLs
                videoIframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
            }
        });
    });
});