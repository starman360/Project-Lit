
function ani(item) {
    $(item).animate({
        left: "-20vw"
    }, 5000, function () {
        // Animation complete.
    });
}

function disp(time) {
    console.log(time);
}

var readJson = (path, cb) => {
    fs.readFile(require.resolve(path), (err, data) => {
        if (err)
            cb(err)
        else
            cb(null, JSON.parse(data))
    })
}

var audio = document.getElementById("playAudio");

$(document).ready(function () {
    audio.addEventListener("timeupdate", function () {
        // console.log(audio.currentTime);
    });

    var availableRows = [0, 1, 2, 3, 4, 5, 6, 7];

    $('button#play').click(function () {
        audio.play();
        $(this).fadeOut(1000);
        var id = setInterval(frame, 10);
        var pos = 30000;
        function frame() {
            if (pos == 4156000) {
                clearInterval(id);
            } else {
                if (typeof (json['' + pos]) != 'undefined') {
                    var i = Math.floor(Math.random() * availableRows.length);
                    console.log('pulled ' + i);
                    var index = availableRows.splice(i,1);
                    console.log(availableRows + '\t\t' + index);
                    setTimeout(function () {
                        console.log('pushing ' + index);
                        availableRows.push(index);
                    }, 1500);
                    $('#lanes').append('<p id="t' + pos + '" class="p' + index + '">' + json['' + pos] + '</p>');
                    $('#t' + pos).animate({
                        left: "-20vw"
                    }, 5000, "linear", function () {
                        $(this).remove();
                    });
                }
            } 
            pos += 10;
        };
    });
});