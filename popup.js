// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var addonEnable = document.getElementById('toggle');
var enabled;
var avgText = document.getElementById('avg');
var text = document.getElementById('word');

if(addonEnable != null && avgText != null) {

chrome.storage.local.get(['enabled'], function(result) {
    addonEnable.checked = result.enabled;
    if(addonEnable.checked) {
        text.innerHTML = "ON"
    } else {
        text.innerHTML = "OFF"
    }
});


function toggle() {    
    chrome.storage.local.set({enabled: addonEnable.checked}, function() {}); 
    if(addonEnable.checked) {
        text.innerHTML = "ON"
    } else {
        text.innerHTML = "OFF"
    }
}
//Loop through elements to find these!!!!!!!!!!
/*var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

chrome.storage.sync.get(['decimals'], function(result) {
    slider.value = result.decimals;
    output.innerHTML = result.decimals;
});

slider.oninput = function() {
  output.innerHTML = this.value;
  chrome.storage.sync.set({decimals: this.value}, function() {});
}*/

var color;
chrome.storage.sync.get(['lastAvg'], function(result) {
    if(result.lastAvg <= 50) {
        color = "red";
    } else if (result.lastAvg >= 50 && result.lastAvg < 80) {
        color = "cyan";
    } else {
        color = "green";
    }

    avgText.style.color = color;

    avgText.innerHTML = result.lastAvg + "%";
});

addonEnable.onclick = toggle;
}






