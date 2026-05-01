var textInputTimer = null;
var textDeleteTimer = null;

function textInputAnimation(text, target, delay, onComplete) {
    if (textInputTimer) {
        clearInterval(textInputTimer);
        textInputTimer = null;
    }
    if (textDeleteTimer) {
        clearInterval(textDeleteTimer);
        textDeleteTimer = null;
    }

    var index = 0;
    target.innerText = '_';
    var result = '';

    textInputTimer = setInterval(function() {
        if (index < text.length) {
            result += text[index];
            target.innerText = result + '_';
            index++;
        }
        if (index >= text.length) {
            clearInterval(textInputTimer);
            textInputTimer = null;
            target.innerText = result;
            if (onComplete) onComplete();
        }
    }, delay);
}

function textDeleteAnimation(text, target, delay, onComplete) {
    if (textInputTimer) {
        clearInterval(textInputTimer);
        textInputTimer = null;
    }
    if (textDeleteTimer) {
        clearInterval(textDeleteTimer);
        textDeleteTimer = null;
    }

    var index = text.length - 1;
    target.innerText = text;

    textDeleteTimer = setInterval(function() {
        if (index >= 0) {
            target.innerText = text.substring(0, index) + '_';
            index--;
        }
        if (index < 0) {
            clearInterval(textDeleteTimer);
            textDeleteTimer = null;
            target.innerText = '_';
            if (onComplete) onComplete();
        }
    }, delay);
}