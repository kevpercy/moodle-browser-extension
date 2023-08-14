browser.omnibox.onInputChanged.addListener((text, suggest) => {
    fetch('https://moodle.kevinpercy.com/tracker_proxy.php?search=' + text)
    .then((response) => response.json())
    .then((data) => {
        let suggestions = [];
        
        data.forEach((element) => {
            suggestions.push({
                'description' : element.summary,
                'content': "https://tracker.moodle.org/browse/" + element.key
            });
        });
        
        if (!suggestions.length) {
            suggest([{
                'description': 'No results for ' + text,
                'content': 'https://tracker.moodle.org/secure/QuickSearch.jspa?searchString=' + text
            }]);
        } else {
            suggest(suggestions);
        }
    });
});

browser.omnibox.onInputEntered.addListener((url, disposition) => {
  if (url.match(/^[0-9]+$/)) {
    url = "MDL-" + url;
  }
  
  if (url.substr(0, 4) !== 'http') {
    url = "https://tracker.moodle.org/secure/QuickSearch.jspa?searchString=" + url;
  }

  switch (disposition) {
    case "currentTab":
      browser.tabs.update({ url });
      break;
    case "newForegroundTab":
      browser.tabs.create({ url });
      break;
    case "newBackgroundTab":
      browser.tabs.create({ url, active: false });
      break;
  }
});

browser.omnibox.setDefaultSuggestion({
  description: "Search Moodle Tracker",
});

