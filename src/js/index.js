require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import slider from './modules/slider';
import sliderStages from './modules/sliderStages';
import changeButtonClass from './modules/changeButtonClass';

window.addEventListener('DOMContentLoaded', () => {
    slider({
        slide: '.slider__slide',
        prevArrow: '.slider__prev',
        nextArrow: '.slider__next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.slider__window',
        field: '.slider__inner'
    });

    if (window.innerWidth <= 576) {
        sliderStages({
            slide: '.stages__item',
            prevArrow: '.stages__prev',
            nextArrow: '.stages__next',
            wrapper: '.stages__window',
            field: '.stages__inner',
            indicators: '.stages__indicators'
        });
    }

    changeButtonClass('btn_stages');
});