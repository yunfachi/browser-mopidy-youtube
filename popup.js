async function getCurrentTab() {
    let queryOptions = {active: true, currentWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
} 

async function main() {
    const tab = await getCurrentTab();
    await chrome.runtime.sendMessage({key: "add-to-mopidy-queue", video_url: tab.url});

    window.close();
}

main().catch(reason => {throw reason});
