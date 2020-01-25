var url = "";
var all_cookies = "";
var campus = "";

window.onload = function()
{
    
    createForm();
    
}
                      

                      
function createForm()
{
    
    
    
    chrome.storage.local.get('cookies', function (items) {
        all_cookies = items.cookies;
        chrome.storage.local.remove('cookies');
        
        chrome.storage.local.get('campus', function (items) {
        campus = items.campus;
        chrome.storage.local.remove('campus');
            
        var regno = prompt("Enter your register number");
            
    
        
  
        
        var form = document.createElement("form");
        form.setAttribute("method", "post");
        form.setAttribute("action", "http://127.0.0.1:8000/signup/authenticate_vtop/");

        var cookieField = document.createElement("input");
        cookieField.setAttribute("type", "hidden");
        cookieField.setAttribute("name", "authentication_params");
        cookieField.setAttribute("value", all_cookies);
        form.appendChild(cookieField);
        
        var campusField = document.createElement("input");
        campusField.setAttribute("type", "hidden");
        campusField.setAttribute("name", "campus");
        campusField.setAttribute("value", campus);
        form.appendChild(campusField);
            
        var regField = document.createElement("input");
        regField.setAttribute("type", "hidden");
        regField.setAttribute("name", "reg");
        regField.setAttribute("value", regno);
        form.appendChild(regField);
    
        
        document.body.appendChild(form);
        form.submit();
            
        
        });
        
    });
    
    
    
        
    

}




    
    
