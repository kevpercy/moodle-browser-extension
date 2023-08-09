browser.omnibox.onInputChanged.addListener((text, suggest) => {
    fetch('https://tracker.moodle.org/rest/api/latest/issue/MDL-' + text)
    .then((response) => response.json())
    .then((data) => {
    	if (!data.length) {
            suggest([{
                'description': 'Failed',
                'content': 'https://tracker.moodle.org/browse/MDL-12345'
            }]);
        } else {
            suggest([{
                'description' : data[0].fields.summary,
                'content': "https://tracker.moodle.org/browse/MDL-" + data[0].key
            }]);
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
  description: "Search for a tracker number",
});

