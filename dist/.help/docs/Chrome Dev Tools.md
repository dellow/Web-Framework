# Google Chrome Dev Tools
### By Stew Dellow | [hellostew.com](http://hellostew.com/ "Creative Web Developer")

## Network Tab
### Colour Coding
- Solid Line: Downloading for length of solid line.
- Faded Line: Latency wait.

### Using HARs:
- HAR's are the data behind the Network Waterfall visual. Right click the timeline and select "Save as HAR with content"

### Size/Content
- Size   : Natural size of the resource.
- Content: Interpreted size (if smaller probably compressed).

### Time/Latency
- Time   : Total time to download resource.
- Latency: Wait time from despatch of request until the first byte is downloaded.

### Latency
- Resort the timeline by clicking "Latency". Hover over the resource graph bar to find the total download time of a resource.

## Sources
### Snippets
Snippets of debugging code, stored in Chrome Dev Tools independent of any given page. `CTRL + Enter` to run a snippet.

### File modification
- Changes to CSS / HTML / JS made in "Elements" tab will be applied here.
- Right clicking a file and selecting "Local Modifications" will create a diff in the output panel of all changes.

## Tips
### Console: Get load times for the page:
	chrome.loadTimes()
### Find first time something was painted to the screen:
	chrome.loadTimes().firstPaintTime - chrome.loadTimes().startLoadTime
