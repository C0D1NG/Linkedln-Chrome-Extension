let profileData = null

document.querySelector('#download').addEventListener('click', () => {
  if (!profileData) {
    document.querySelector('.class').innerText = "Failed to get profile"
    return
  }
  downloadObjectAsJson(profileData, "profile")
})

function sendMessage(msg) {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, msg, function (response) {
        if (chrome.runtime.lastError && chrome.runtime.lastError.message === "Could not establish connection. Receiving end does not exist.") {
          reloadTab()
          var daddy = window.self;
          daddy.opener = window.self;
          daddy.close();
        }
        else {
          resolve(response)
        }
      });
    });
  })
}
function reloadTab() {
  chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
    const currentTab = tabs[0].id
    chrome.tabs.reload(currentTab)
  })
}

console.log("check")
chrome.runtime.onMessage.addListener(function (data, sender, sendResponse) {

  console.log(data)
  return "ack"
})

async function init() {

  const result = await sendMessage({ type: "getProfile" })
  console.log(result)
  profileData = result

  let domNodes = `
    <div style="display:flex; justify-content:center">
     <img style="margin:10px;width:200px; height:200px; border-radius:50%" src=${result.profile} alt="profile picture of user" />
    </div>
      <div style="display:grid; grid-template-columns: 100px auto;">
        <h2>Name : </h2>
        <h2>${result.name}</h2>
      </div>

      <div style="display:grid; grid-template-columns: 100px auto;">
        <h3>About : </h3>
        <h3>${result.about}</h3>
      </div>

      <div style="display:grid; grid-template-columns: 110px auto;">
        <h3>Designation : </h3>
        <h3>${result.tag}</h3>
      </div>

       <div style="display:grid; grid-template-columns: 100px auto;">
        <h3>Link :</h3>
        <h3>${result.link}</h3>
      </div>

      <div style="display:grid; grid-template-columns: 100px auto;">
        <h3>Location : </h3>
        <h3>${result.location}</h3>
      </div>
     
      <div style="display:grid; grid-template-columns: 100px auto;">
        <h3>About : </h3>
        <h3>${result.about}</h3>
      </div>
    
      <div style="display:grid; grid-template-columns: 100px auto;">
        <h3>Contact : </h3>
        <h3>${result.contact}</h3>
      </div>
 
      <div style="display:grid; grid-template-columns: 100px auto;">
        <h3>Education : </h3>
        <ul>
  `
  result.education.forEach(edu => {
    domNodes += `<li> ${edu}</li>`
  })
  domNodes += `</ul>
    </div>`
  document.querySelector('#profileData').innerHTML = domNodes

}
init()

function downloadObjectAsJson(exportObj, exportName) {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

