function sliderStages ({slide, prevArrow, nextArrow, wrapper, field, indicators}) {
    
    const slides = document.querySelectorAll(slide),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
          indicators = document.querySelector(indicators);

    let slideIndex = 0,
        slidesPerPage = 1,
        offset = 0;

    let startIndex = slideIndex * slidesPerPage;
    let endIndex = Math.min(startIndex + slidesPerPage, slides.length);

    console.log(endIndex);

    slidesField.style.width = 100 * slides.length / slidesPerPage + '%';

    const dots = [];

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('stages__dot');
        dot.setAttribute('data-slide-to', i + 1);
        if (i == 0) {
            dot.style.backgroundColor = 'var(--grey49, rgba(49, 49, 49, 1))';
        }
        indicators.append(dot);
        dots.push(dot);
    }

    function deleteNotDigits(str) {
        return +str.replace(/[^\d.]/g, '');
    }

    function nextSlide() {
        if (offset !== deleteNotDigits(width) * (Math.ceil(slides.length / slidesPerPage) - 1)){
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if(endIndex !== slides.length) {
            prev.disabled = false;
            slideIndex = Math.min(slideIndex + 1, Math.ceil(slides.length / slidesPerPage) - 1);
            startIndex = slideIndex * slidesPerPage;
            endIndex = Math.min(startIndex + slidesPerPage, slides.length);
        }
        if(endIndex == slides.length) {
            next.disabled = true;
        }
        dots.forEach(dot => dot.style.backgroundColor = 'var(--grey217, rgba(217, 217, 217, 1))');
        dots[slideIndex].style.backgroundColor = 'var(--grey49, rgba(49, 49, 49, 1))';
    }

    function prevSlide() {
        if (offset !== 0){
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if(endIndex !== slidesPerPage) {
            next.disabled = false;
            slideIndex = Math.max(slideIndex - 1, 0);
            startIndex = slideIndex * slidesPerPage;
            endIndex = Math.min(startIndex + slidesPerPage, slides.length);
        }
        if(endIndex == slidesPerPage) {
            prev.disabled = true;
        }
        dots.forEach(dot => dot.style.backgroundColor = 'var(--grey217, rgba(217, 217, 217, 1))');
        dots[slideIndex].style.backgroundColor = 'var(--grey49, rgba(49, 49, 49, 1))';
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.backgroundColor = 'var(--grey217, rgba(217, 217, 217, 1))');
            dots[slideIndex].style.backgroundColor = 'var(--grey49, rgba(49, 49, 49, 1))';
        });
    });

    next.addEventListener('click', () => {
        nextSlide();
    });

    prev.addEventListener('click', () => {
        prevSlide();
    });
}



export default sliderStages;