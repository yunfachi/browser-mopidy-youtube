async function getUrl() {
    const result = await chrome.storage.sync.get("url");
    return result.url || "http://127.0.0.1:6680/youtube/";
}

chrome.contextMenus.onClicked.addListener(async (info) => {
    if(info.menuItemId != "add-to-mopidy-queue") return;
    console.debug("contentMenu", info)

    const url = await getUrl();
    const videoUrl = info.linkUrl;

    console.debug(`url: ${url}?url=${videoUrl}`);
    console.debug(await fetch(`${url}?url=${videoUrl}`, {mode: "no-cors"}));
});

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