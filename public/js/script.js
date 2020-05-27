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

        //call XMap and YMap functions to map the x and y values into a range
        XMap(xpos);
        YMap(ypos);

        // call XYMove and give it the NewX and NewY values from XMap and YMap
        XYMove(NewX, NewY);
        XYBlur(NewX, NewY);
    }
    document.getElementById("container").onmousemove = findScreenCoords;


    function XMap(OldValue) {
        OldMax = window.innerWidth;
        OldMin = 0;
        NewMax = 12;
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
        NewMax = 12;
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

    function XYMove(tempX, tempY) {
        document.getElementById("logotype").style.setProperty('top', parseLogoTop - (tempY * .5));
        document.getElementById("logotype").style.setProperty('right', parseLogoRight + (tempX * .5));

        document.getElementById("hand-left").style.setProperty('bottom', parseHand1Bottom - tempY);
        document.getElementById("hand-left").style.setProperty('left', parseHand1Left + tempX);

        document.getElementById("hand-right").style.setProperty('top', parseHand2Top + tempY);
        document.getElementById("hand-right").style.setProperty('right', parseHand2Right - tempX);
    }

    function XYBlur(tempX, tempY) {
        document.getElementById("hand-right").style.setProperty('filter', 'blur(' + ((tempX + tempY) * .3) + 'px)');
        document.getElementById("hand-left").style.setProperty('filter', 'blur(' + ((tempX + tempY) * .15) + 'px)');
        document.getElementById("logotype").style.setProperty('filter', 'blur(' + ((tempX + tempY) * .05) + 'px)');

        document.getElementById("hand-right").style.setProperty('opacity', ((tempX + tempY) / 20) + .6);
        document.getElementById("hand-left").style.setProperty('opacity', ((tempX + tempY) / 20) + .6);
        document.getElementById("logotype").style.setProperty('opacity', ((tempX + tempY) / 20) + .6);
    }

});