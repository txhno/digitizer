var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Set up the canvas drawing
var drawing = false;
var mouseX = 0;
var mouseY = 0;

canvas.addEventListener('mousedown', function(e) {
    drawing = true;
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
});

canvas.addEventListener('mousemove', function(e) {
    if(drawing){
        draw(canvas, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }
});

canvas.addEventListener('mouseup', function(e) {
    if(drawing){
        draw(canvas, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        drawing = false;
    }
});

function draw(canvas, x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Submit the canvas content
function submit() {
    var canvas = document.getElementById('canvas');
    canvas.toBlob(function(blob) {
        var formData = new FormData();
        formData.append('image', blob, 'digit.png');

        $.ajax({
            type: "POST",
            url: "/predict",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                $('#prediction').text('Predicted Digit: ' + response.digit);
            },
            error: function(error) {
                console.log("Error:", error);
            }
        });
    }, 'image/png');
}

function makeBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], {type: contentType});
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
}
