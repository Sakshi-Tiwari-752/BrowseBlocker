// Alert the user that the tab is blocked then sends a messages to close the tab.

function CloseTab() {
    alert("This URL is completely blocked for today. This tab will close after you press OK")
    chrome.runtime.sendMessage({ CloseMe: true })
}

//Listen for a startTimer message from the popup. creates a countdown timer UI,
//  and closes the tab when the timer  reaches zero.
chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.from === "popup" && message.subject === "startTimer") {

        var hour = 0;
        var min = 0;
        var sec = 5;

        var div = document.createElement("div")
        div.innerHTML = `
            <div class="topItem">
                <h1>Stay Productive</h1>
                <div class="topItemMain">
                    <div class="Info">
                        <p>You are currently on :</p>
                        <h4 id="url">${window.location.hostname}</h4>
                    </div>
                </div>
            </div>
    
            <div class="bottomItem">
                <div class="timeCont">
                    <p>Time Remaining</p>
                    
                    <div class="time">
                        <div class="number">
                            <p id="hour">${("0" + hour).slice(-2)}</p>
                        </div>
                        <span>:</span>
        
                        <div class="number">
                            <p id="min">${("0" + min).slice(-2)}</p>
                        </div>
                        <span>:</span>
        
                        <div class="number">
                            <p id="sec">${("0" + sec).slice(-2)}</p>
                        </div>
                    </div>
                </div>
            </div>`;
        document.body.prepend(div);

        setInterval(() => {
            if (sec >= 1) {
                sec = sec - 1
                document.getElementById("sec").innerText = ("0" + sec).slice(-2)
            }
            else {
                CloseTab()
            }
        }, 1000);

    }
})

//checks if the current URL is blocked and closes the tab if necessary.
chrome.storage.local.get("BlockedUrls", (data) => {
    if (data.BlockedUrls !== undefined) {
        if (data.BlockedUrls.some((e) => e.url === window.location.hostname && e.status === "BLOCKED")) {
            CloseTab()
        }
    }
})