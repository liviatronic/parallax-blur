document.addEventListener('DOMContentLoaded', function () {


    // logotype
    // access the top and left values from the css
    let logo = document.getElementById("logotype");
    let logoStyles = window.getComputedStyle(logo);
    let logoTop = logoStyles.getPropertyValue('top');
    let logoRight = logoStyles.getPropertyValue('right');
    // get rid of the 'px' that the css returns
    let replaceLogoTop = logoTop.replace('px', '');
    let replaceLogoRight = logoRight.replace('px', '');
    // convert the string the css returns to a number
    let parseLogoTop = parseFloat(replaceLogoTop);
    let parseLogoRight = parseFloat(replaceLogoRight);

    // hand-left
    // access the top and left values from the css
    let hand1 = document.getElementById("hand-left");
    let hand1Styles = window.getComputedStyle(hand1);
    let hand1Bottom = hand1Styles.getPropertyValue('bottom');
    let hand1Left = hand1Styles.getPropertyValue('left');
    // get rid of the 'px' that the css returns
    let replaceHand1Bottom = hand1Bottom.replace('px', '');
    let replacehand1Left = hand1Left.replace('px', '');
    // convert the string the css returns to a number
    let parseHand1Bottom = parseFloat(replaceHand1Bottom);
    let parseHand1Left = parseFloat(replacehand1Left);

    // hand-right
    // access the top and left values from the css
    let hand2 = document.getElementById("hand-right");
    let hand2Styles = window.getComputedStyle(hand2);
    let hand2Top = hand2Styles.getPropertyValue('top');
    let hand2Right = hand2Styles.getPropertyValue('right');
    // get rid of the 'px' that the css returns
    let replaceHand2Top = hand2Top.replace('px', '');
    let replacehand2Right = hand2Right.replace('px', '');
    // convert the string the css returns to a number
    let parseHand2Top = parseFloat(replaceHand2Top);
    let parseHand2Right = parseFloat(replacehand2Right);


    function findScreenCoords(mouseEvent) {
        let xpos;
        let ypos;

        //find x and y positions
        if (mouseEvent) {
            //FireFox
            xpos = mouseEvent.screenX;
            ypos = mouseEvent.screenY;
        } else {
            //IE
            xpos = window.event.screenX;
            ypos = window.event.screenY;
        }

        // find inverse x and y positions
        let canvas = document.getElementById('container');
        // get element position
        let rect = canvas.getBoundingClientRect();

        // get inversed coordinates
        let ix = rect.width - (event.clientX - rect.left);
        let iy = rect.height - (event.clientY - rect.top);

        //call functions to map the x and y values into a range
        XMap(xpos);
        YMap(ypos);
        XMapRev(ix);
        YMapRev(iy);

        // call functions and pass them mapped values
        XYMove(NewX, NewY);
        handBlur(NewXRev, NewYRev);
        logoBlur(NewX, NewY);
        handOpacity(NewX, NewY);
        logoOpacity(NewXRev, NewYRev);
    }
    document.getElementById("container").onmousemove = findScreenCoords;


    function XYMove(tempX, tempY) {
        document.getElementById("logotype").style.setProperty('top', parseLogoTop - (tempY * .5));
        document.getElementById("logotype").style.setProperty('right', parseLogoRight + (tempX * .5));

        document.getElementById("hand-left").style.setProperty('bottom', parseHand1Bottom - tempY);
        document.getElementById("hand-left").style.setProperty('left', parseHand1Left + tempX);

        document.getElementById("hand-right").style.setProperty('top', parseHand2Top + tempY);
        document.getElementById("hand-right").style.setProperty('right', parseHand2Right - tempX);
    }

    function handBlur(tempX, tempY) {
        document.getElementById("hand-right").style.setProperty('filter', 'blur(' + ((tempX + tempY) * .2) + 'px)');
        document.getElementById("hand-left").style.setProperty('filter', 'blur(' + ((tempX + tempY) * .2) + 'px)');
    }

    function logoBlur(tempX, tempY) {
        document.getElementById("logotype").style.setProperty('filter', 'blur(' + ((tempX + tempY) * .2) + 'px)');
    }

    function handOpacity(tempX, tempY) {
        document.getElementById("hand-right").style.setProperty('opacity', (tempX + tempY) * .1);
        document.getElementById("hand-left").style.setProperty('opacity', (tempX + tempY) * .1);
    }

    function logoOpacity(tempX, tempY) {
        console.log('opacity: ' + (tempX + tempY) * .2);
        document.getElementById("logotype").style.setProperty('opacity', (tempX + tempY) * .2);
    }


    function XMap(OldValue) {
        OldMax = window.innerWidth;
        OldMin = 0;
        NewMax = 10;
        NewMin = 0;
        OldRange = (OldMax - OldMin);
        if (OldRange == 0) {
            NewValue = NewMin;
        } else {
            NewRange = (NewMax - NewMin);
            NewX = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin;
            return NewX;
        }
    }

    function YMap(OldValue) {
        OldMax = window.innerHeight;
        OldMin = 0;
        NewMax = 10;
        NewMin = 0;
        OldRange = (OldMax - OldMin);
        if (OldRange == 0) {
            NewValue = NewMin;
        } else {
            NewRange = (NewMax - NewMin);
            NewY = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin;
            return NewY;
        }
    }

    function XMapRev(OldValue) {
        OldMax = window.innerWidth;
        OldMin = 0;
        NewMax = 10;
        NewMin = 0;
        OldRange = (OldMax - OldMin);
        if (OldRange == 0) {
            NewValue = NewMin;
        } else {
            NewRange = (NewMax - NewMin);
            NewXRev = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin;
            return NewXRev;
        }
    }

    function YMapRev(OldValue) {
        OldMax = window.innerHeight;
        OldMin = 0;
        NewMax = 10;
        NewMin = 0;
        OldRange = (OldMax - OldMin);
        if (OldRange == 0) {
            NewValue = NewMin;
        } else {
            NewRange = (NewMax - NewMin);
            NewYRev = (((OldValue - OldMin) * NewRange) / OldRange) + NewMin;
            return NewYRev;
        }
    }

});