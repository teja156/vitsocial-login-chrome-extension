
var all_cookies = "";
var click_count=0;
function getCookies(callback)
{
    chrome.cookies.getAll({"url":"https://vtop.vit.ac.in/vtop/initialProcess"},callback)
}

function printCookie(cookies)
{   
    for(var i=0;i<cookies.length;i++)
        {
            all_cookies = all_cookies + cookies[i].name + ":" + cookies[i].value+";";
        }
    
    //document.getElementById("disp").textContent = all_cookies;
    
}



function generateQR()
{
    if(click_count==0)
        {
            if(all_cookies!="")
                {
                    new QRCode(document.getElementById("qrcode"), all_cookies);
                    click_count++;
                }
                
            else
                alert("Cookies are empty, please try again");
        }
    
}


const confirmvtop = info => {
    //alert("REcvd from content: "+info.url);
    
    
  if(info.url=="https://vtop.vit.ac.in/vtop/initialProcess" || info.url=="https://vtop.vitap.ac.in/vtop/initialProcess")
      {
          document.getElementById("msg").textContent = "You are on VTOP! Make sure you login to your account first before generating the QR code."
          document.getElementById("msg").style.color = "green"
          document.getElementById("genqr").disabled = false;
          
      }
    
};



window.onload= function()
{
    getCookies(printCookie);
    document.getElementById("genqr").addEventListener("click",generateQR);
}

window.addEventListener('DOMContentLoaded', () => {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    // ...and send a request for the login info...
    chrome.tabs.sendMessage(
        tabs[0].id,
        {from: 'popup', subject: 'LoginInfo'},
        // ...also specifying a callback to be called 
        //    from the receiving end (content script).
        confirmvtop);
  });
});



    