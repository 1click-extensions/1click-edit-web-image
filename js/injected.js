
allImages = document.getElementsByTagName('img');
console.log(allImages);
for(var i = 0; i < allImages.length; i++){
    var curImg = allImages[i]; // element
    curImg.addEventListener('click', function(e){
        e.stopPropagation();
        var _this = this;
        console.log(_this);
        // getBase64Image(_this, function(data) {
        //     chrome.runtime.sendMessage({data: "img_choosed", imgData:{
        //         data:data,
        //         width:_this.width,
        //         height:_this.height,
        //     }});
        // });
        chrome.runtime.sendMessage({data: "img_choosed", imgData: this.src});
        e.stopPropagation();
    });
    console.log(curImg);

    // do stuff
}