# Google Analytics
### By Stew Dellow | [hellostew.com](http://hellostew.com/ "Creative Web Developer")

## Profiles
You should always create at least two profiles for a Google Analytics account. One for raw data without any filters, goals or other customisations and another profile for all customised data.

In some cases it would also be beneficial to have a "staging" profile to test any customisations before applying the main account.

You could also consider creating a different profile for Mobile users as they tend to interact differently from desktop users.

## Dashboards
The following are useful custom dashboards:

- [Basic Dashboard](https://www.google.com/analytics/web/template?uid=GLAG1WXOR22QTVh4SWxSkA)
- [Content Marketing Metrics](https://www.google.com/analytics/web/template?uid=BUbw98ffTXS6aN20jICrYg)
- [Conversion Tracking](https://www.google.com/analytics/web/template?uid=5GHBjdP5TWWG_xpEjrIEdg)
- [Email Marketing](https://www.google.com/analytics/web/template?uid=MCzTPyJpSgC1H3KN_nrD7w)
- [Error Tracking](https://www.google.com/analytics/web/template?uid=j1NbrHKHQGqeApJG3Gnj3A)
- [Mobile eCommerce](https://www.google.com/analytics/web/template?uid=Y-ivRPiWSoiNwxvcg5au5Q)
- [Personal Blogger](https://www.google.com/analytics/web/template?uid=V_lSr5r5TSScCHB6dq2mqw)
- [PPC](https://www.google.com/analytics/web/template?uid=kE4SvwfOQGaIlwUFrnciZw)
- [Realtime Overview](https://www.google.com/analytics/web/template?uid=h6YipVxdRJG1NQDRuXSDYg)
- [Revenue](https://www.google.com/analytics/web/template?uid=6OozUpFeRS-6VZoVyPsiUg)
- [SEO](https://www.google.com/analytics/web/template?uid=YSi9Lde4T-KFyjnekSp8DQ)
- [Site Performance](https://www.google.com/analytics/web/template?uid=MMril_-OQKuvPIdYBjAHNQ)
- [Social Media](https://www.google.com/analytics/web/template?uid=XARs4XueSBOvJXAo1eH7Qg)
- [Traffic Overview](https://www.google.com/analytics/web/template?uid=O5i91wxCTsOK_MPFwGuExQ)
- [Visitor Behaviour](https://www.google.com/analytics/web/template?uid=WSz50MPCS3uf37kXleBWTw)
- [Visitor Facts](https://www.google.com/analytics/web/template?uid=syOxYE4KRqm8G-APruI7JA)

## Filters
### Exclude traffic from IP
Simply excludes all traffic from a pre-defined

- __Filter Type:__ Pre-defined filter
- __Options:__ Exclude | traffic from the IP addresses | that are equal to
- Enter IP address

### Exclude traffic with URL parameter
Excludes traffic using a parameter on the URL. Useful for one off cases or where a static IP can not be provided. The below example would exclude traffic from anyone using the following domain: `http://www.domain.com/?utm_source=internal`

- __Filter Type:__ Custom filter
- __Option:__ Exclude
- __Filter Field:__ Campaign Source
- __Filter Pattern:__ internal
- __Case-sensitive:__ No

### Lowercase URL
Prevents different case URL requestes from registering as multiple pages.

- __Filter Type:__ Custom filter
- __Option:__ Lowercase
- __Filter Field:__ Request URI

### Show full URL
Shows the full URL in reports rather than just the requested segment.

- __Filter Type:__ Custom filter
- __Option:__ Advanced
- __Field A > Extract A:__ Hostname | (.*)
- __Field B > Extract B:__ Request URI | (.*)
- __Output To > Constructor A:__ Request URI | $A1$B1
- __Field A Required:__ Yes
- __Field B Required:__ No
- __Override Output Field:__ Yes
- __Case-sensitive:__ No

### Filter directory
Useful if you only want to track traffic from a particular directory. For example for country specific sites.

- __Filter Type:__ Pre-defined filter
- __Options:__ Include only | traffic to subdirectories | that begin with
- __Subdirectory:__ /directory-name/
- __Case-sensitive:__ No

### Filter mobile users
Useful to track just mobile users as they tend to interact differently to desktop users.

- __Filter Type:__ Custom filter
- __Option:__ Include
- __Filter Field:__ Visitor Mobile?
- __Filter Pattern:__ yes
- __Case-sensitive:__ No

### Making sense of the search keyword (Not Provided)
Since Google started rolling out its SSL encryption for search queries of logged-in users, a lot of valuable data has gone missing in Google analytics. Within the Google Analytics organic keyword report you will find reference to the query (not provided). The following filter however will append the landing page to the keyword for all (not provided) visits. Based on the landing page content, it could give an idea as to the types of phrases that are being included.

- __Filter Type:__ Custom filter
- __Option:__ Advanced
- __Field A > Extract A:__ Campaign Term | (.not provided.)
- __Field B > Extract B:__ Request URI | (.*)
- __Output To > Constructor A:__ Campaign Term | np - $B1
- __Field A Required:__ Yes
- __Field B Required:__ Yes
- __Override Output Field:__ Yes
- __Case-sensitive:__ No

### See search rankings for keywords in Google Analytics
Have you ever wanted to see what the ranking of a keyword was and how much traffic it drives in that position? How is this helpful? With this data you can:

- Analyse the keywords that drive conversions to your site and see how well they rank on the search results.
- Analyse over time how different positions on the search results will affect your traffic/conversions. It is pretty normal for organic rankings to fluctuate slightly. So assume that you’re normally #X for certain keywords, analyse how a drop or an increase in organic rankings affect your traffic/conversions.
- Analyse over time your portfolio of keywords. How many keywords are on the first page? Your aim is to get your percentage of keywords on the first page as close to 100% as possible.

> __Please Note:__ This requires 2 separate filters and in a specific order.

#### Filter #1
- __Filter Name:__ Extract Ranking
- __Filter Type:__ Custom filter
- __Option:__ Advanced
- __Field A > Extract A:__ Referral | (\?|&)(cd)=([^&]*)
- __Field B > Extract B:__ - |
- __Output To > Constructor A:__ Custom Field 1 | $A3
- __Field A Required:__ Yes
- __Field B Required:__ No
- __Override Output Field:__ Yes
- __Case-sensitive:__ No

#### Filter #2
- __Filter Name:__ Display Ranking
- __Filter Type:__ Custom filter
- __Option:__ Advanced
- __Field A > Extract A:__ Custom Field 1 | (.*)
- __Field B > Extract B:__ Campaign Term | (.*)
- __Output To > Constructor A:__ Campaign Term | $B1 ($A1)
- __Field A Required:__ Yes
- __Field B Required:__ Yes
- __Override Output Field:__ Yes
- __Case-sensitive:__ No

Ensure Filter #1 is above Filter #2 in the order.

After a few hours you will start to see the results. Numbers will start to appear next to your keywords showing their organic positions (including universal results).

With this data you could easily create a custom dashboard report to separate the _Top 1_ keywords, or _Top 5_, _Top 10_ and so on.