'use strict';

const section = document.getElementById('countUpSection');
const countUpElement = document.querySelector('#count-up');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            setTimeout(() => {
                countUp(countUpElement, 477450917, 2000);
            }, 1000);
        }
    });
});

observer.observe(section);

function countUp(element, endVal, duration) {
    const startTime = Date.now();
    const endTime = startTime + duration;
    const distance = endVal;

    const update = () => {
        const now = Date.now();
        const progress = (now - startTime) / duration;
        const currentVal = Math.round(distance * progress);
        element.textContent = currentVal.toLocaleString();

        if (now < endTime) {
            requestAnimationFrame(update);
        }
    };
    update();
}