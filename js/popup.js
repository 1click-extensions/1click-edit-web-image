document.getElementById('title').innerText = chrome.i18n.getMessage('popup_title');

chrome.runtime.sendMessage({data: "start_choose_img"});