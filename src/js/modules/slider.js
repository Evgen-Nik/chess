function slider ({slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    
    const slides = document.querySelectorAll(slide),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 0,
        slidesPerPage = 3,
        offset = 0;

    if (window.matchMedia("(max-width: 768px)").matches) {
        slidesPerPage = 1;
    } else if (window.matchMedia("(max-width: 992px)").matches) {
        slidesPerPage = 2;
    } else {
        slidesPerPage = 3;
    }

    let startIndex = slideIndex * slidesPerPage;
    let endIndex = Math.min(startIndex + slidesPerPage, slides.length);

    total.textContent = slides.length;
    current.textContent = endIndex;

    slidesField.style.width = 100 * slides.length / slidesPerPage + '%';

    function deleteNotDigits(str) {
        return +str.replace(/[^\d.]/g, '');
    }

    function nextSlide() {
        if (offset == deleteNotDigits(width) * (Math.ceil(slides.length / slidesPerPage) - 1)){
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if(endIndex == slides.length) {
            slideIndex = 0;
            startIndex = slideIndex * slidesPerPage;
            endIndex = slidesPerPage;
        } else {
            slideIndex = Math.min(slideIndex + 1, Math.ceil(slides.length / slidesPerPage) - 1);
            startIndex = slideIndex * slidesPerPage;
            endIndex = Math.min(startIndex + slidesPerPage, slides.length);
        }

        current.textContent = endIndex;
    }

    function prevSlide() {
        if (offset == 0){
            offset = deleteNotDigits(width) * (Math.ceil(slides.length / slidesPerPage) - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(endIndex == slidesPerPage) {
            slideIndex = Math.ceil(slides.length / slidesPerPage) - 1;
            startIndex = slideIndex * slidesPerPage;
            endIndex = slides.length;
        } else {
            slideIndex = Math.max(slideIndex - 1, 0);
            startIndex = slideIndex * slidesPerPage;
            endIndex = Math.min(startIndex + slidesPerPage, slides.length);
        }

        current.textContent = endIndex;
    }

    next.addEventListener('click', () => {
        nextSlide();
    });

    prev.addEventListener('click', () => {
        prevSlide();
    });
    
    let intervalId = null;

    function startAutoScroll() {
        intervalId = setInterval(() => {
            nextSlide();
        }, 4000);
    }

    startAutoScroll();
    
    function stopAutoScroll() {
        console.log('stopAutoScroll');
        clearInterval(intervalId);
    }    
    
    // slidesWrapper.addEventListener('mouseover', stopAutoScroll);
    // slidesWrapper.addEventListener('mouseout', startAutoScroll);
}



export default slider;