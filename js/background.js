function getBase64Image(src, callback) {
  // Create an empty canvas element
  var img = new Image,
      canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d")

  //img.crossOrigin = "Anonymous";

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

      callback( {data:dataURL, width:img.width,height:img.height});
  }
  //document.body.appendChild(img);
  img.src = src;


  
}


chrome.runtime.setUninstallURL("https://1ce.org");

if (!localStorage.created) {
  chrome.tabs.create({ url: "https://1ce.org" });
  var manifest = chrome.runtime.getManifest();
  localStorage.ver = manifest.version;
  localStorage.created = 1;
}

chrome.runtime.onMessage.addListener(function (data, sender, callback) {
  switch (data.data) {
      case 'start_choose_img':
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var filename = chrome.runtime.getURL('js/injected.js'),
            files=  {file:'js/injected.js'};
        console.log(files);
        
        chrome.tabs.executeScript(tabs[0].id,files);

      });
        break;
      case 'img_choosed':
        console.log(data);
        getBase64Image(data.imgData, function(imgData){
          screenshot.createBySimpleImg(imgData.data, imgData.width, imgData.height);
        });
        break;
      default:
        console.warn('Invalid message', data);
    }
});