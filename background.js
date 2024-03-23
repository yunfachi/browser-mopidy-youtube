async function getUrl() {
    const result = await chrome.storage.sync.get("url");
    return result.url || "http://127.0.0.1:6680/youtube/";
}

async function addToQueue(video_url) {
    const url = await getUrl();

    console.debug(`url: ${url}?url=${video_url}`);
    console.debug(await fetch(`${url}?url=${video_url}`, {mode: "no-cors"}));
}

chrome.action.setIcon({path: "icons/inactive.png"});

/*
 Messaging
*/

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (!(request.key === "add-to-mopidy-queue" && request.video_url)) return;

    chrome.action.setIcon({path: "icons/active.png"});
    await addToQueue(request.video_url);
    setTimeout(() => {
        chrome.action.setIcon({path: "icons/inactive.png"})
    }, 250)
});  

/*
 Context Menu
*/

chrome.runtime.onInstalled.addListener(() => {
    let contexts = [
        "link"
    ];
    chrome.contextMenus.create({
        title: "Add to the Mopidy Queue",
        contexts: contexts,
        id: "add-to-mopidy-queue"
    });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
    if(info.menuItemId != "add-to-mopidy-queue") return;
    console.debug("contentMenu:", info)
    await addToQueue(info.linkUrl)
});
