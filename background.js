function getCookies(callback)
{
    chrome.cookies.get({"url":"https://vtop.vit.ac.in/vtop/initialProcess","name":"JSESSIONID"},callback)
}

function printCookie(cookie)
{
    console.log("COOKIE VALUE : "+cookie.value);
    
}

getCookies(printCookie)