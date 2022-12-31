// accessing all elements
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
    summoned = 0,
    index = 0;


//burger
// to show the hidden header on click of the burger and on another click to hide it
burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});
// to hide the header whenever you choose a nav link 
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

// showing the image and its dot by hiding every image and dot and then showing the ones that are chosen
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
// to make a circle of images and not going beyond the number of images
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

// to make an carousel automated and scrolling itself by default every 10 secs
const interval = setInterval(function () {
    renderImage(index++);
}, 10000);


//scroll

// when you scroll apply new  styles for header and when come back return them
window.addEventListener('scroll', function () {
    header.classList.toggle('fixed-header', window.scrollY > 0);
})

//bubbles


// this function returns a random boolean value
function yesOrNo() {
    const answer = Math.random();
    return answer > 0.5 ? true : false;
}

// this function sets the "degree" variable to a random number between 0 and 360, preceded by a "-" if a random boolean value is true
function setDeg() {
    let minus = '-';
    if (yesOrNo()) {
        minus = '';
    }
    degree = minus + Math.random() * 360 + 'deg';


}
// this function creates a div element with a randomly selected cat image as its background image, and sets its transform style to a randomly generated degree of rotation if a random boolean value is true, or 0deg if it is false
function randomCatImg(size, bubbleOuter) {
    // select a random index from the "bubbleImg" array
    const randNum = Math.floor(Math.random() * bubbleImg.length),
        // create a new div element
        bubbleInside = document.createElement('div');


    // set the width and height of the div element to the specified size minus 6 pixels
    bubbleInside.style.width = bubbleInside.style.height = (size - 6) + 'px';
    // add the "bubble-inside" class to the div element
    bubbleInside.classList.add('bubble-inside');
    // set the background image of the div element to the cat image at the random index of the "bubbleImg" array
    bubbleInside.style.backgroundImage = `url(${bubbleImg[randNum].src})`;
    // if a random boolean value is true, call the "setDeg" function to set the "degree" variable to a random degree of rotation
    if (yesOrNo() === true) {
        setDeg();

    } else {
        // If a random boolean value is false, set the "degree" variable to 0deg
        degree = 0 + 'deg';
    }
    // set the  transform styles of the div element
    bubbleInside.style.transform = `rotate(${degree})`;

    // append the div element to the specified "bubbleOuter" element
    bubbleOuter.appendChild(bubbleInside);

}

// this function removes the inner HTML, border, and background image of the specified "bubble" element and sets its background image to an explosion image or basically deletes the bubble
function removeBubbleStyles(bubble) {
    // clear the inner HTML of the "bubble" 
    bubble.innerHTML = '';
    // delete  the border of the "bubble"  
    bubble.style.border = 'none';
    //make the background of explosion or something simiral like that
    bubble.style.backgroundImage = `url(${boom.src})`;
    //set the image to cover all bubble
    bubble.style.backgroundSize = 'cover';

}
// this function increments the "summoned" number by 1 and updates the "summonedScore" element to display the new value
function showSummoned() {
    summoned += 1;
    summonedScore.innerHTML = summoned;
}
//does the same as the function above but with killed bubbles or it is better to say the one you clicked on
function showCaught() {
    killed += 1;
    killedScore.innerHTML = killed;
}
// this function generates a new bubble element and appends it to the page
function generateBubble() {
    showSummoned()
    // create a new div element
    const bubble = document.createElement('div'),
        // select the ".bubble-maker__wrapper" element
        bubbleParent = document.querySelector('.bubble-maker__wrapper');
    let size = 0;
    let visibleWidth = window.innerWidth;

    let leftGap = 0;

    // generate a random size for the "bubble" element between 50 and 90 pixels
    while (size < 50) {
        size = Math.floor(Math.random() * 90);
    }
    // generate a random left gap for the "bubble" element between 0 and the visible width of the window, but not less than 10 pixels or greater than or equal to the visible width, so the bubbles will randomly appear in different horizontal space 
    while (leftGap < 10 || leftGap >= visibleWidth) {
        leftGap = (Math.random() * visibleWidth) - (size + 10);
    }
    // add the "bubble" styles to the "bubble" 
    bubble.classList.add('bubble');
    // set the width and height of the "bubble"  to the generated size
    bubble.style.width = bubble.style.height = size + 'px';
    // set the position style of the "bubble"  to absolute
    bubble.style.position = 'absolute';
    // set the z-index  of the "bubble" to be high so it will be above everything except the header
    bubble.style.zIndex = '100000000';
    //set the bottom style of the "bubble"  to 0 so it will spawn at the bottom of parent element
    bubble.style.bottom = '0';
    // set the left style of the "bubble" to the generated left gap
    bubble.style.left = leftGap + 'px';

    // call the "randomCatImg" function to generate a div  with a randomly selected cat image and set its transform style
    randomCatImg(size, bubble);

    // append the "bubble"  to the ".bubble-maker__wrapper" 
    bubbleParent.appendChild(bubble);

    //add a click event listener to the "bubble"  that calls the "removeBubbleStyles" function and removes the "bubble" element after 200 milliseconds
    bubble.addEventListener('click', () => {


        removeBubbleStyles(bubble);

        setTimeout(() => {
            // increment the "killed" variable by 1 and update the "killedScore" 
            showCaught()
            // remove the "bubble" element
            bubble.remove();
        }, 200);
    });

    // the code below sets random time for the life duration of "bubble" after which it will explode and disappear
    let timer = 0;
    while (timer < 24000) {
        timer = Math.random() * 30000;
    }
    setTimeout(() => {

        removeBubbleStyles(bubble);
        //left the limeout so you can see the explosion itself without popping bubble after its lifespan is finished
        setTimeout(() => {
            bubble.remove();
        }, 200);

    }, timer);

}
// this function generates a random number of bubbles, up to 17, and calls the "generateBubble" function for each bubble
function bubblesGeneration() {
    // generate a random integer between 0 and 17, inclusive
    const randomAmount = Math.floor(Math.random() * 17);
    // loop through the random amount of times
    for (let i = 0; i < randomAmount; i++) {

        generateBubble();


    }
}
// add a click event listener to the "spawnCatBtn" or the button spawn cats element that calls the "bubblesGeneration" function when clicked
spawnCatBtn.addEventListener('click', function () {
    bubblesGeneration()
});