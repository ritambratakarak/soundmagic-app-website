import animateScrollTo from 'animated-scroll-to';

export const animateScroll = (className, speed = 1000) => {
    console.log('chat...',className)
    return animateScrollTo(document.querySelector(`.${className}`), { speed })
}