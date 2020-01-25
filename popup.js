
var all_cookies = "";
var click_count=0;
var url= "";
var campus = "";

function getCookies(callback)
{
    chrome.cookies.getAll({"url":url},callback)
}

function printCookie(cookies)
{   
    for(var i=0;i<cookies.length;i++)
        {
            all_cookies = all_cookies + cookies[i].name + ":" + cookies[i].value+";";
        }
    
    //document.getElementById("authentication_params").value = all_cookies;
    
        
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


function authenticate_vtop()
{
    document.write(all_cookies);
}




window.onload = function()
{
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        
        url = tabs[0].url;

        campus = checkVTOP(url);
        if(campus!="")
            {
                getCookies(printCookie);
                
            }
    });
    
    
    document.getElementById("authenticate-btn").onclick = function()
    {
        chrome.tabs.create({url:chrome.runtime.getURL("send_post_req.html")});
    }
    
}



function getCookies(callback)
{
    
    chrome.cookies.getAll({"url":url},callback);
}

function printCookie(cookies)
{   
    
    for(var i=0;i<cookies.length;i++)
        {
            all_cookies = all_cookies + '"' + cookies[i].name + '"' + ":" + '"' + cookies[i].value+ '"' + ",";
        }
    
    //document.getElementById("authentication_params").value = all_cookies;
    
        
    //document.getElementById("disp").textContent = all_cookies;
    

    
    chrome.storage.local.set({
            cookies: all_cookies,
            campus : campus
        }, function () {
            chrome.tabs.executeScript({
                file: "post.js"
            });
        });
    
}


function checkVTOP(url)
{
    if(url.search("vtopcc.vit.ac.in:8080/vtop/initialProcess")!=-1)
        campus = "chennai";
    else if(url.search("vtop.vit.ac.in/vtop/initialProcess")!=-1)
        campus = "vellore";
    else if(url.search("vtop2.vitap.ac.in:8070/vtop/initialProcess")!=-1)
        campus = "ap";
    
    return campus;
    
}








    