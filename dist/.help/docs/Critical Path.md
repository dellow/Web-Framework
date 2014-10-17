# HTML Framework Critical Path
### By Stew Dellow | [hellostew.com](http://hellostew.com/ "Creative Web Developer")

## Introduction
The critical path is the necessary journey to rendering the visual side (HTML markup and CSS) of a page to the user. In most cases this should be done as quickly as possible. None presentational markup, script files and other resources are not part of the critical path as they do not make up the visual rendering of the page. This guide will help you understand how to build an optimal path for rendering your page.

## Considerations

### Paralleised downloads and concurrent blocks
Most browsers can download up to 6 external resources per hostname in parallel.

However `scripts` load singularly and will block other resources from loading as the browser waits for them to be downloaded, parsed and executed. However if other files are already being downloaded when a `script` file is being downloaded the script will be downloaded in parallel.

Consider this document:

	<head>
		<link type="text/css" rel="stylesheet" href="stylesheet1.css" />
		<script type="text/javascript" src="script1.js" />
		<script type="text/javascript" src="script2.js" />
		<link type="text/css" rel="stylesheet" href="stylesheet2.css" />
		<link type="text/css" rel="stylesheet" href="stylesheet3.css" />
	</head>

Assuming each resource takes 100ms to download and the browser can maintain up to 6 connections in parallel this download profile would take 300ms.

As `stylesheet1.css` and `script1.js` will download as a concurrent block (because `stylesheet1.css` has already begun), `script2.js` will then download blocking the next resources, finally `stylesheet2.css` and `stylesheet3.css` will download as a third concurrent block.

In comparison consider this:

	<head>
		<link type="text/css" rel="stylesheet" href="stylesheet1.css" />
		<link type="text/css" rel="stylesheet" href="stylesheet2.css" />
		<link type="text/css" rel="stylesheet" href="stylesheet3.css" />
		<script type="text/javascript" src="script1.js" />
		<script type="text/javascript" src="script2.js" />
	</head>

Assuming each resource takes 100ms to download and the browser can maintain up to 6 connections in parallel this download profile would take 200ms.

`stylesheet1.css`, `stylesheet2.css`, `stylesheet3.css` and `script1.js` will download in a concurrent block taking 100ms and `script2.js` will follow also taking 100ms.

Inline scripts

	<head>
		<link type="text/css" rel="stylesheet" href="stylesheet1.css" />
		<script type="text/javascript">
			alert("Hello world!");
		</script>
		<link type="text/css" rel="stylesheet" href="stylesheet2.css" />
		<link type="text/css" rel="stylesheet" href="stylesheet3.css" />
		<script type="text/javascript" src="script1.js" />
		<script type="text/javascript" src="script2.js" />
	</head>

In this case the reverse happens, the first stylesheet actually blocks the execution of inline scripts which will in turn block all other resources from downloading.

Where possible stylesheets should always be referenced in the head of a page. Consequently external script files or inline scripts that are required to be referenced in the head of a page should follow stylesheets to prevent blocking. Otherwise external scripts should always be referenced from the foot of a page.

From a cold cache, DNS lookup for CSS slows down site display because DNS lookup takes longer and CSS is render blocking, so nothing will be shown until ALL CSS has been retrieved. All CSS will be downloaded, even ones specific to a media such as breakpoints or print. Because of this fact it's better to concatenate all CSS into one file simply because it WILL be downloaded anyway.

#### Increasing the parallel download limit
You can circumvent browser limitations by serving assets from multiple hostnames. For example if a page references 100 external resources and the browser limitation was (for example) 2 concurrent downloads per hostname, this would result in 1 RTT (Round Trip Times) for every 2 resources and a total download time of 50 RTTs. By requesting external assets from different hostnames you can increase the concurrent download limit forcing the browser to make better use of the available bandwidth.

- However, using more concurrent connections will increase CPR usage and introduce additional DNS lookups and TCP connection initialisations. Therefore above a certain limit this technique can degrade overall performance.
- In general the optimal number of hostnames is between 2 and 5.
- For pages that request no more than 10 external assets this technique would be overkill.
- Script files should not be served over multiple hosts as most browsers will still not download them in parallel.
- Ensure all pages references the same asset using the same URL to benefit from browser and proxy caching.

#### DNS configuration
To configure additional hostnames, sub-domains can be created as CNAME records that point to a single A record and configure the web server to respond from multiple hosts (e.g. Apache/Nginx VirtualHosts).

All hostnames should be cookie-less: e.g.

	images.exampledomain.com
	videos.exampledomain.com
	css.exampledomain.com

#### CDN (Content Delivery Network)
CDNs generally deliver content over TCP and UDP connections. TCP throughput over a network is impacted by both latency and packet loss. In order to reduce both of these parameters, CDNs traditionally place servers as close to the edge of networks that users are on as possible. Theoretically the closer the content, the faster will be its delivery, although network distance may not be the factor that leads to best performance. End Users will likely experience less jitter, fewer network peaks and surges, and improved stream quality - especially in remote areas.

CDNs can have automatic server availability sensing with instant user redirection. A CDN can offer 100% availability, even with large power, network or hardware outages.

- Use a CDN when target users are in highly dispersed location
- Use a CDN when target users are using low bandwidth network, and your CDN operator has servers near the location of your end users.
- Implement a CDN on static content like media (images, videos, flash and other binary files), CSS and JavaScript files.
- Use a CDN on your site, if you expect your site to have peak activity, for example during marketing campaigns.
- Consider implementing the CDN for your dynamic pages only if you experience performance issues or if you plan large marketing campaign that may lead to peak loads.
- Beware of page redirections based on user input or user data, these pages should not be cached by the CDN if the redirection target page depends on user interaction.
- Beware of dynamic content depending on user context like Session or Cookies, this content should be cached using Akamai Advanced Cache Control.

#### JavaScript blocking
Many browsers will block other assets from downloading while currently downloading a JavaScript file to minimise the blocking risk consider the following:

- Minimise the number of external JavaScript asset requests. Consider using an asynchronous loader such as RequireJS. Or a compiler like Browserify.
- Reference them in the correct order so they do not block the critical path.
- Where possible reference JavaScript assets in the foot of a page.

#### Image Optimisation
Finding the correct balance between quality and filesize is paramount. Optimisation tips are as follows:

- Crop unnecessary space from images.
- Reduce colour depth the lowest acceptable level.
- Save image to appropriate format. Generally:
	- PNG: Graphics
	- GIF: Simple, small graphics (less than 10x10) or a colour palette less than 3 colours
	- JPEG: Photography
- Apply lossless compression on JPEG and PNG files.
- Use CSS Sprites where appropriate. Remove as much whitespace as possible.
- Base64 encoding should only be used on small images that are critical to the presentation. This should be rare.

#### Image Reflow & Dimensions
When the browser lays out the page, it needs to be able to flow around replaceable elements such as images. It can begin to render a page even before images are downloaded, provided that it knows the dimensions to wrap non-replaceable elements around. If no dimensions are specified in the containing document, or if the dimensions specified don't match those of the actual images, the browser will require a reflow and repaint once the images are downloaded.

Don't use width and height specifications to scale images on the fly. If an image file is actually 60 x 60 pixels, don't set the dimensions to 30 x 30 in the HTML or CSS. If the image needs to be smaller, scale it in an image editor and set its dimensions to match (see Optimise images for details.)

Be sure to set the dimensions on the `<img>` element itself, or a block-level parent. If the parent is not block-level, the dimensions will be ignored. Do not set dimensions on an ancestor that is not an immediate parent.