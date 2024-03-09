async function getCurrentTab() {
    let queryOptions = {active: true, currentWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
} 

async function getUrl() {
    function setCurrentChoice(result) {
        return result.url || "http://127.0.0.1:6680/youtube/";
    }

    function onError(error) {
        console.error(`Error: ${error}`);
    }

    const getting = chrome.storage.sync.get("url");
    getting.then(setCurrentChoice, onError);
}

async function main()
{
    const url = await getUrl()
    console.log(url)
    const tab = await getCurrentTab();

    console.debug(`url: ${url}?url=${encodeURI(tab.url)}`);
    await fetch(`${url}?url=${encodeURI(tab.url)}`, {mode: "no-cors"});

    window.close();
}

main().catch(reason => {throw reason});