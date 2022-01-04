let myLeads = [];
const inputEl = document.querySelector("#input-el");
const inputBtn = document.querySelector("#input-btn");
const ulEl = document.querySelector("#ul-el");
const deleteBtn = document.querySelector("#delete-btn");
const tabBtn = document.querySelector("#tab-btn");
const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));


if (leadFromLocalStorage) {
    myLeads = leadFromLocalStorage;
    render(myLeads);
}

function render(leads) {
    let listItems = "";
    for ( let i = 0; i < leads.length; i++) {
        //listItems += "<li> <a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] +"</a> </li>";
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            <li>
        `
    }
   ulEl.innerHTML = listItems;
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    })
    

});

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear();       //clear local storage
    myLeads = [];               //clear myLeads array
    render(myLeads);              //clear the DOM by rendering null array

})
inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
    
});

