let index = 0;
const cutieImages = document.querySelectorAll('.cutie-img'),
    dots = document.querySelectorAll('.dot'),
    next = document.querySelector('.next'),
    prev = document.querySelector('.prev'),
    header = document.querySelector('header'),
    spawnCatBtn = document.querySelector('.spawn-cat'),
    bubbleImg = document.querySelectorAll('.bubble-maker-image'),
    boom = document.querySelector('.boom'),
    killedScore = document.querySelector('.killed-score'),
    summonedScore = document.querySelector('.summoned-score'),
    burger = document.querySelector('.burger'),
    navMenu = document.querySelector('.cats-nav'),
    navItems = document.querySelectorAll('.nav-item');


let degree = 0,
    killed = 0,
    summoned = 0;


//burger

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navItems.forEach(element => {
    element.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

//image carousel
showImage(0);
function showImage(i) {
    index += i;
    checkIndex()
    renderImage(index);
}

function renderImage(i) {
    cutieImages.forEach(element => {
        element.style.display = 'none';

    });
    dots.forEach(element => {
        element.classList.remove('active-dot');

    });
    cutieImages[i].style.display = 'block';
    dots[i].classList.add('active-dot');
    checkIndex();
}

function checkIndex() {
    if (index > cutieImages.length - 1) {
        index = 0;
    }
    if (index < 0) {
        index = cutieImages.length - 1;
    }
}
next.addEventListener('click', function () {
    showImage(-1);
});
prev.addEventListener('click', function () {
    showImage(1);
});

dots.forEach((element, i) => {
    element.addEventListener('click', () => {
        renderImage(i);
        index = i;
    })
})

const interval = setInterval(function () {
    renderImage(index++);
}, 10000);

//scroll
window.addEventListener('scroll', function () {
    header.classList.toggle('fixed-header', window.scrollY > 0);
})

//bubbles

function yesOrNo() {
    const answer = Math.random();
    return answer > 0.5 ? true : false;
}


function setDeg() {
    let minus = '-';
    if (yesOrNo()) {
        minus = '';
    }
    degree = minus + Math.random() * 360 + 'deg';

    // root.style.setProperty('--degree', degree)
    // console.log(degree)
}
function randomCatImg(size, bubbleOuter) {
    const randNum = Math.floor(Math.random() * bubbleImg.length),
        bubbleInside = document.createElement('div');

    bubbleInside.style.width = bubbleInside.style.height = (size - 6) + 'px';
    bubbleInside.classList.add('bubble-inside');
    bubbleInside.style.backgroundImage = `url(${bubbleImg[randNum].src})`;
    if (yesOrNo() === true) {
        setDeg();

    } else {
        degree = 0 + 'deg';
    }

    bubbleInside.style.transition = 'transform infinite';
    bubbleInside.style.transform = `rotate(${degree})`;


    bubbleOuter.appendChild(bubbleInside);

}

function removeBubbleStyles(bubble) {
    bubble.innerHTML = '';
    bubble.style.border = 'none';
    bubble.style.backgroundImage = `url(${boom.src})`;
    bubble.style.backgroundSize = 'cover';

}
function showSummoned() {
    summoned += 1;
    summonedScore.innerHTML = summoned;
}
function showCaught() {
    killed += 1;
    killedScore.innerHTML = killed;
}
function generateBubble() {
    showSummoned()
    const bubble = document.createElement('div'),
        bubbleParent = document.querySelector('.bubble-maker__wrapper');
    let size = 0;
    let visibleWidth = window.innerWidth;

    let leftGap = 0;


    while (size < 50) {
        size = Math.floor(Math.random() * 90);
    }
    while (leftGap < 10 || leftGap >= visibleWidth) {
        leftGap = (Math.random() * visibleWidth) - (size + 10);
    }
    bubble.classList.add('bubble');

    bubble.style.width = bubble.style.height = size + 'px';
    bubble.style.position = 'absolute';

    bubble.style.zIndex = '100000000';

    bubble.style.bottom = '0';
    bubble.style.left = leftGap + 'px';

    randomCatImg(size, bubble);


    bubbleParent.appendChild(bubble);

    bubble.addEventListener('click', () => {


        removeBubbleStyles(bubble);
        bubble.styleanimationPlayState = 'paused';
        setTimeout(() => {
            showCaught()
            bubble.remove();
        }, 200);
    });


    let timer = 0;
    while (timer < 24000) {
        timer = Math.random() * 30000;
    }
    setTimeout(() => {

        removeBubbleStyles(bubble);
        setTimeout(() => {
            bubble.remove();
        }, 200);

    }, timer);

}
function bubblesGeneration() {
    const randomAmount = Math.floor(Math.random() * 17);
    for (let i = 0; i < randomAmount; i++) {

        generateBubble();


    }
}
spawnCatBtn.addEventListener('click', function () {
    bubblesGeneration()
});