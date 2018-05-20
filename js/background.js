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
chrome.browserAction.onClicked.addListener(function(tab){
  console.log('dddd');
  screenshot.tryGetUrl(function () {
    console.log('tryGetUrl', screenshot.thisTabId);
    codeinjector.executeOnTab( screenshot.thisTabId,
      screenshot.thisTab,
      true,
      function(){
        chrome.tabs.executeScript(screenshot.thisTabId, {code:'load_cropper_without_selection()'})
      })
    
  });
});
chrome.runtime.onMessage.addListener(function (data, sender, callback) {
  switch (data.data) {
    case 'isEnableShortCuts':
      if (localStorage['enableshortcuts']=='yes')	{
        callback();
      }
      break;
    case 'captureAll':        
      screenshot.captureAll($.extend({}, data, {
        callback: callback
      }));
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