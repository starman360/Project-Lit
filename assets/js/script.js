
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

    $('button#play').click(function () {
        audio.play();
        $(this).fadeOut(1000);
        var id = setInterval(frame, 10);
        var pos = 30000;
        var availableRows = [0, 2, 3, 4, 5, 6, 7];
        function frame() {
            if (pos == 4156000) {
                clearInterval(id);
            } else {
                if (typeof (json['' + pos]) != 'undefined') {
                    var index = availableRows[Math.floor(Math.random() * availableRows.length)];
                    setTimeout(function () {
                        availableRows.append(index);
                    }, 2500);
                    $('#lanes').append('<p id="t' + pos + '" class="p'+index+'">' + json['' + pos] + '</p>');
                    $('#t' + pos).animate({
                        left: "-20vw"
                    }, 5000,"linear", function () {
                        $(this).remove();
                    });
                }
            }
            pos += 10;
        };
    });
});