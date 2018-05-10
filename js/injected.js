function getBase64Image(imgOld, callback) {
    // Create an empty canvas element
    var img = new Image,
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        src = imgOld.src;

    img.crossOrigin = "Anonymous";

    img.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        var dataURL = canvas.toDataURL("image/png");

        callback( dataURL/*.replace(/^data:image\/(png|jpg);base64,/, "")*/);
    }
    img.src = src;


    
}

allImages = document.getElementsByTagName('img');
console.log(allImages);
for(var i = 0; i < allImages.length; i++){
    var curImg = allImages[i]; // element
    curImg.addEventListener('click', function(e){
        var _this = this;
        getBase64Image(_this, function(data) {
            chrome.runtime.sendMessage({data: "img_choosed", imgData:{
                data:data,
                width:_this.width,
                height:_this.height,
            }});
        });
        e.stopPropagation();
    });
    console.log(curImg);

    // do stuff
}