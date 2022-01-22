function give_data() {
    const data = {}
    data.name = document.querySelector("div.mt2.relative > div:nth-child(1) > div:nth-child(1) > h1")?.innerText || ""
    data.link = document.querySelector("div.text-body-small.mt1 > a")?.href || document.querySelector("div.pvs-list__outer-container > ul > li > div > div:nth-child(1) > a")?.href || ""
    data.location = document.querySelector("div.ph5.pb5 > div.mt2.relative > div.pb2.pv-text-details__left-panel > span.text-body-small.inline.t-black--light.break-words")?.innerText || document.querySelector(" div.ph5 > div.mt2.relative > div.pb2.pv-text-details__left-panel > span.text-body-small.inline.t-black--light.break-words")?.innerText || ""
    data.about = document.querySelector("div.display-flex.ph5.pv3 > div > div > div > span:nth-child(1)")?.innerText || ""
    data.tag = document.querySelector(" div.mt2.relative > div:nth-child(1) > div.text-body-medium.break-words")?.innerText || ""
    data.profile = document.querySelector("div.pv-top-card--photo.text-align-left.pv-top-card--photo-resize > div > button> img")?.src || document.querySelector("div.pv-top-card--photo.text-align-left.pv-top-card--photo-resize > div > div > button>img")?.src || ""
    data.contact = document.querySelector("#top-card-text-details-contact-info")?.href || ""
    
    let education = []
    document.querySelector("#education").parentNode.querySelectorAll(".pvs-list .pvs-entity>div:nth-child(2)").forEach(node => {
        let text = node.querySelector('a>div>span>span')?.innerText
        education.push(text)
    })
    data.education = education
    return data
}
chrome.runtime.onMessage.addListener(messageListener)


function messageListener({ type, result }, sender, sendResponse) {
    console.log("Request Listened : ", type, result);
    if (type === "getProfile") {
        const data = give_data()
        sendResponse(data)
    }

    return true
}
