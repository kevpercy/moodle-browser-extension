document.getElementById('trackerform').onsubmit = function(event) {
    event.preventDefault();
    let trackerid = document.getElementById('tracker').value;
    
    if (trackerid.match(/^[0-9]+$/)) {
        trackerid = "MDL-" + trackerid;
    }
    
    browser.tabs.create({url: "https://tracker.moodle.org/secure/QuickSearch.jspa?searchString=" + trackerid});
        
    window.close();
};
