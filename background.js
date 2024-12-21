//Listen for a message from content.js or popup.js. Close the sender's tab if "CloseMe" is true.

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.CloseMe) {
        chrome.tabs.remove(sender.tab.id)
    }
})