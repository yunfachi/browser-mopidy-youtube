function saveOptions(e) {
    e.preventDefault();
    chrome.storage.sync.set({
      url: document.querySelector("#url").value,
    });
}

function restoreOptions() {
    function setCurrentChoice(result) {
        document.querySelector("#url").value = result.url || "http://127.0.0.1:6680/youtube/";
    }

    function onError(error) {
        console.error(`Error: ${error}`);
    }

    let getting = chrome.storage.sync.get("url");
    getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
