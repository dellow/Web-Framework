(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


module.exports = {
  DEV_ID: 'i5iSjo'
};

},{}],2:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Imports sub-plugins.
require('./event-tracker');
require('./media-query-tracker');
require('./outbound-form-tracker');
require('./outbound-link-tracker');
require('./session-duration-tracker');
require('./social-tracker');
require('./url-change-tracker');


// Imports dependencies.
var provide = require('../provide');


/**
 *
 * Requires all sub-plugins via a single plugin.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function Autotrack(tracker, opts) {
  var ga = window[window.GoogleAnalyticsObject || 'ga'];
  var name = tracker.get('name');

  // Registers the plugin on the global gaplugins object.
  window.gaplugins = window.gaplugins || {};
  gaplugins.Autotrack = Autotrack;

  ga(name + '.require', 'eventTracker', opts);
  ga(name + '.require', 'mediaQueryTracker', opts);
  ga(name + '.require', 'outboundFormTracker', opts);
  ga(name + '.require', 'outboundLinkTracker', opts);
  ga(name + '.require', 'sessionDurationTracker', opts);
  ga(name + '.require', 'socialTracker', opts);
  ga(name + '.require', 'urlChangeTracker', opts);
}


provide('autotrack', Autotrack);

},{"../provide":10,"./event-tracker":3,"./media-query-tracker":4,"./outbound-form-tracker":5,"./outbound-link-tracker":6,"./session-duration-tracker":7,"./social-tracker":8,"./url-change-tracker":9}],3:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var delegate = require('delegate');
var defaults = require('../utilities').defaults;
var provide = require('../provide');


/**
 * Registers declarative event tracking.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function EventTracker(tracker, opts) {

  // Registers the plugin on the global gaplugins object.
  window.gaplugins = window.gaplugins || {};
  gaplugins.EventTracker = EventTracker;

  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.addEventListener) return;

  this.opts = defaults(opts, {
    attributePrefix: 'data-'
  });

  this.tracker = tracker;

  var prefix = this.opts.attributePrefix;
  var selector = '[' + prefix + 'event-category][' + prefix + 'event-action]';

  delegate(document, selector, 'click', this.handleEventClicks.bind(this));
}


/**
 * Handles all clicks on elements with event attributes.
 * @param {Event} event The DOM click event.
 */
EventTracker.prototype.handleEventClicks = function(event) {

  var link = event.delegateTarget;
  var prefix = this.opts.attributePrefix;

  this.tracker.send('event', {
    eventCategory: link.getAttribute(prefix + 'event-category'),
    eventAction: link.getAttribute(prefix + 'event-action'),
    eventLabel: link.getAttribute(prefix + 'event-label'),
    eventValue: link.getAttribute(prefix + 'event-value')
  });
};


provide('eventTracker', EventTracker);

},{"../provide":10,"../utilities":11,"delegate":16}],4:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var debounce = require('debounce');
var defaults = require('../utilities').defaults;
var isObject = require('../utilities').isObject;
var toArray = require('../utilities').toArray;
var provide = require('../provide');


/**
 * Sets the string to use when no custom dimension value is available.
 */
var NULL_DIMENSION = '(not set)';


/**
 * Declares the MediaQueryListener instance cache.
 */
var mediaMap = {};


/**
 * Registers media query tracking.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function MediaQueryTracker(tracker, opts) {

  // Registers the plugin on the global gaplugins object.
  window.gaplugins = window.gaplugins || {};
  gaplugins.MediaQueryTracker = MediaQueryTracker;

  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.matchMedia) return;

  this.opts = defaults(opts, {
    mediaQueryDefinitions: false,
    mediaQueryChangeTemplate: this.changeTemplate,
    mediaQueryChangeTimeout: 1000
  });

  // Exits early if media query data doesn't exist.
  if (!isObject(this.opts.mediaQueryDefinitions)) return;

  this.opts.mediaQueryDefinitions = toArray(this.opts.mediaQueryDefinitions);
  this.tracker = tracker;
  this.timeouts = {};

  this.processMediaQueries();
}


/**
 * Loops through each media query definition, sets the custom dimenion data,
 * and adds the change listeners.
 */
MediaQueryTracker.prototype.processMediaQueries = function() {
  this.opts.mediaQueryDefinitions.forEach(function(dimension) {

    if (!dimension.dimensionIndex) {
      throw new Error('Media query definitions must have a name.');
    }

    if (!dimension.dimensionIndex) {
      throw new Error('Media query definitions must have a dimension index.');
    }

    var name = this.getMatchName(dimension);
    this.tracker.set('dimension' + dimension.dimensionIndex, name);

    this.addChangeListeners(dimension);
  }.bind(this));
};


/**
 * Takes a dimension object and return the name of the matching media item.
 * If no match is found, the NULL_DIMENSION value is returned.
 * @param {Object} dimension A set of named media queries associated
 *     with a single custom dimension.
 * @return {string} The name of the matched media or NULL_DIMENSION.
 */
MediaQueryTracker.prototype.getMatchName = function(dimension) {
  var match;

  dimension.items.forEach(function(item) {
    if (getMediaListener(item.media).matches) {
      match = item;
    }
  });
  return match ? match.name : NULL_DIMENSION;
};


/**
 * Adds change listeners to each media query in the dimension list.
 * Debounces the changes to prevent unnecessary hits from being sent.
 * @param {Object} dimension A set of named media queries associated
 *     with a single custom dimension
 */
MediaQueryTracker.prototype.addChangeListeners = function(dimension) {
  dimension.items.forEach(function(item) {
    var mql = getMediaListener(item.media);
    mql.addListener(debounce(function() {
      this.handleChanges(dimension);
    }.bind(this), this.opts.mediaQueryChangeTimeout));
  }.bind(this));
};


/**
 * Handles changes to the matched media. When the new value differs from
 * the old value, a change event is sent.
 * @param {Object} dimension A set of named media queries associated
 *     with a single custom dimension
 */
MediaQueryTracker.prototype.handleChanges = function(dimension) {
  var newValue = this.getMatchName(dimension);
  var oldValue = this.tracker.get('dimension' + dimension.dimensionIndex);

  if (newValue !== oldValue) {
    this.tracker.set('dimension' + dimension.dimensionIndex, newValue);
    this.tracker.send('event', dimension.name, 'change',
        this.opts.mediaQueryChangeTemplate(oldValue, newValue));
  }
};


/**
 * Sets the default formatting of the change event label.
 * This can be overridden by setting the `mediaQueryChangeTemplate` option.
 * @param {string} oldValue
 * @param {string} newValue
 * @return {string} The formatted event label.
 */
MediaQueryTracker.prototype.changeTemplate = function(oldValue, newValue) {
  return oldValue + ' => ' + newValue;
};



/**
 * Accepts a media query and returns a MediaQueryListener object.
 * Caches the values to avoid multiple unnecessary instances.
 * @param {string} media A media query value.
 * @return {MediaQueryListener}
 */
function getMediaListener(media) {
  // Returns early if the media is cached.
  if (mediaMap[media]) return mediaMap[media];

  mediaMap[media] = window.matchMedia(media);
  return mediaMap[media];
}


provide('mediaQueryTracker', MediaQueryTracker);

},{"../provide":10,"../utilities":11,"debounce":12}],5:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var defaults = require('../utilities').defaults;
var delegate = require('delegate');
var provide = require('../provide');
var utilities = require('../utilities');


/**
 * Registers outbound form tracking.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function OutboundFormTracker(tracker, opts) {

  // Registers the plugin on the global gaplugins object.
  window.gaplugins = window.gaplugins || {};
  gaplugins.OutboundFormTracker = OutboundFormTracker;

  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.addEventListener) return;

  this.opts = defaults(opts, {
    shouldTrackOutboundForm: this.shouldTrackOutboundForm
  });

  this.tracker = tracker;

  delegate(document, 'form', 'submit', this.handleFormSubmits.bind(this));
}


/**
 * Handles all submits on form elements. A form submit is considered outbound
 * if its action attribute starts with http and does not contain
 * location.hostname.
 * When the beacon transport method is not available, the event's default
 * action is prevented and re-emitted after the hit is sent.
 * @param {Event} event The DOM submit event.
 */
OutboundFormTracker.prototype.handleFormSubmits = function(event) {

  var form = event.delegateTarget;
  var action = form.getAttribute('action');
  var fieldsObj = {transport: 'beacon'};

  if (this.opts.shouldTrackOutboundForm(form)) {

    if (!navigator.sendBeacon) {
      // Stops the submit and waits until the hit is complete (with timeout)
      // for browsers that don't support beacon.
      event.preventDefault();
      fieldsObj.hitCallback = utilities.withTimeout(function() {
        form.submit();
      });
    }

    this.tracker.send('event', 'Outbound Form', 'submit', action, fieldsObj);
  }
};


/**
 * Determines whether or not the tracker should send a hit when a form is
 * submitted. By default, forms with an action attribute that starts with
 * "http" and doesn't contain the current hostname are tracked.
 * @param {Element} form The form that was submitted.
 * @return {boolean} Whether or not the form should be tracked.
 */
OutboundFormTracker.prototype.shouldTrackOutboundForm = function(form) {
  var action = form.getAttribute('action');
  return action.indexOf('http') === 0 && action.indexOf(location.hostname) < 0;
};


provide('outboundFormTracker', OutboundFormTracker);

},{"../provide":10,"../utilities":11,"delegate":16}],6:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var defaults = require('../utilities').defaults;
var delegate = require('delegate');
var provide = require('../provide');


/**
 * Registers outbound link tracking on a tracker object.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function OutboundLinkTracker(tracker, opts) {

  // Registers the plugin on the global gaplugins object.
  window.gaplugins = window.gaplugins || {};
  gaplugins.OutboundLinkTracker = OutboundLinkTracker;

  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.addEventListener) return;

  this.opts = defaults(opts, {
    shouldTrackOutboundLink: this.shouldTrackOutboundLink
  });

  this.tracker = tracker;

  delegate(document, 'a', 'click', this.handleLinkClicks.bind(this));
}


/**
 * Handles all clicks on link elements. A link is considered an outbound link
 * its hostname property does not match location.hostname. When the beacon
 * transport method is not available, the links target is set to "_blank" to
 * ensure the hit can be sent.
 * @param {Event} event The DOM click event.
 */
OutboundLinkTracker.prototype.handleLinkClicks = function(event) {
  var link = event.delegateTarget;
  if (this.opts.shouldTrackOutboundLink(link)) {
    // Opens outbound links in a new tab if the browser doesn't support
    // the beacon transport method.
    if (!navigator.sendBeacon) {
      link.target = '_blank';
    }
    this.tracker.send('event', 'Outbound Link', 'click', link.href, {
      transport: 'beacon'
    });
  }
};


/**
 * Determines whether or not the tracker should send a hit when a link is
 * clicked. By default links with a hostname property not equal to the current
 * hostname are tracked.
 * @param {Element} link The link that was clicked on.
 * @return {boolean} Whether or not the link should be tracked.
 */
OutboundLinkTracker.prototype.shouldTrackOutboundLink = function(link) {
  return link.hostname != location.hostname;
};


provide('outboundLinkTracker', OutboundLinkTracker);

},{"../provide":10,"../utilities":11,"delegate":16}],7:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var defaults = require('../utilities').defaults;
var provide = require('../provide');


/**
 * Registers outbound link tracking on tracker object.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function SessionDurationTracker(tracker, opts) {

  // Registers the plugin on the global gaplugins object.
  window.gaplugins = window.gaplugins || {};
  gaplugins.SessionDurationTracker = SessionDurationTracker;

  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.addEventListener) return;

  this.opts = defaults(opts);
  this.tracker = tracker;

  window.addEventListener('unload', this.handleWindowUnload.bind(this));
}


/**
 * Handles the window unload event.
 */
SessionDurationTracker.prototype.handleWindowUnload = function() {
  var fieldsObj = {
    nonInteraction: true,
    transport: 'beacon'
  };

  // Adds time since navigation start if supported.
  if (window.performance && performance.timing) {
    fieldsObj.eventValue = +new Date - performance.timing.navigationStart;
  }

  // Note: This will fail in many cases when Beacon isn't supported,
  // but at least it's better than nothing.
  this.tracker.send('event', 'Window', 'unload', fieldsObj);
};


provide('sessionDurationTracker', SessionDurationTracker);

},{"../provide":10,"../utilities":11}],8:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var defaults = require('../utilities').defaults;
var delegate = require('delegate');
var provide = require('../provide');


/**
 * Registers social tracking on tracker object.
 * Supports both declarative social tracking via HTML attributes as well as
 * tracking for social events when using official Twitter or Facebook widgets.
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function SocialTracker(tracker, opts) {

  // Registers the plugin on the global gaplugins object.
  window.gaplugins = window.gaplugins || {};
  gaplugins.SocialTracker = SocialTracker;

  // Feature detects to prevent errors in unsupporting browsers.
  if (!window.addEventListener) return;

  this.opts = defaults(opts, {
    attributePrefix: 'data-'
  });

  this.tracker = tracker;

  var prefix = this.opts.attributePrefix;
  var selector = '[' + prefix + 'social-network]' +
                 '[' + prefix + 'social-action]' +
                 '[' + prefix + 'social-target]';

  delegate(document, selector, 'click', this.handleSocialClicks.bind(this));

  this.detectLibraryLoad('FB', 'facebook-jssdk',
      this.addFacebookEventHandlers.bind(this));

  this.detectLibraryLoad('twttr', 'twitter-wjs',
      this.addTwitterEventHandlers.bind(this));
}


/**
 * Handles all clicks on elements with social tracking attributes.
 * @param {Event} event The DOM click event.
 */
SocialTracker.prototype.handleSocialClicks = function(event) {

  var link = event.delegateTarget;
  var prefix = this.opts.attributePrefix;

  this.tracker.send('social', {
    socialNetwork: link.getAttribute(prefix + 'social-network'),
    socialAction: link.getAttribute(prefix + 'social-action'),
    socialTarget: link.getAttribute(prefix + 'social-target')
  });
};


/**
 * A utility method that determines when a social library is finished loading.
 * @param {string} namespace The global property name added to window.
 * @param {string} domId The ID of a script element in the DOM.
 * @param {Function} done A callback to be invoked when done.
 */
SocialTracker.prototype.detectLibraryLoad = function(namespace, domId, done) {
  if (window[namespace]) {
    done();
  }
  else {
    var script = document.getElementById(domId);
    if (script) {
      script.onload = done;
    }
  }
};


/**
 * Adds event handlers for the "tweet" and "follow" events emitted by the
 * official tweet and follow buttons. Note: this does not capture tweet or
 * follow events emitted by other Twitter widgets (tweet, timeline, etc.).
 */
SocialTracker.prototype.addTwitterEventHandlers = function() {
  try {
    twttr.ready(function() {

      twttr.events.bind('tweet', function(event) {
        // Ignore tweets from widgets that aren't the tweet button.
        if (event.region != 'tweet') return;

        var url = event.data.url || event.target.getAttribute('data-url') ||
            location.href;

        this.tracker.send('social', 'Twitter', 'tweet', url);
      }.bind(this));

      twttr.events.bind('follow', function(event) {
        // Ignore follows from widgets that aren't the follow button.
        if (event.region != 'follow') return;

        var screenName = event.data.screen_name ||
            event.target.getAttribute('data-screen-name');

        this.tracker.send('social', 'Twitter', 'follow', screenName);
      }.bind(this));
    }.bind(this));
  } catch(err) {}
};


/**
 * Adds event handlers for the "like" and "unlike" events emitted by the
 * official Facebook like button.
 */
SocialTracker.prototype.addFacebookEventHandlers = function() {
  try {
    FB.Event.subscribe('edge.create', function(url) {
      this.tracker.send('social', 'Facebook', 'like', url);
    }.bind(this));

    FB.Event.subscribe('edge.remove', function(url) {
      this.tracker.send('social', 'Facebook', 'unlike', url);
    }.bind(this));
  } catch(err) {}
};


provide('socialTracker', SocialTracker);

},{"../provide":10,"../utilities":11,"delegate":16}],9:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var defaults = require('../utilities').defaults;
var isObject = require('../utilities').isObject;
var provide = require('../provide');


/**
 * Adds handler for the history API methods
 * @constructor
 * @param {Object} tracker Passed internally by analytics.js
 * @param {?Object} opts Passed by the require command.
 */
function UrlChangeTracker(tracker, opts) {

  // Registers the plugin on the global gaplugins object.
  window.gaplugins = window.gaplugins || {};
  gaplugins.UrlChangeTracker = UrlChangeTracker;

  // Feature detects to prevent errors in unsupporting browsers.
    if (!history.pushState || !window.addEventListener) return;

  this.opts = defaults(opts, {
    shouldTrackUrlChange: this.shouldTrackUrlChange
  });

  this.tracker = tracker;

  // Sets the initial page field.
  // Don't set this on the tracker yet so campaign data can be retreived
  // from the location field.
  this.path = getPath();

  // Overrides history.pushState.
  var originalPushState = history.pushState;
  history.pushState = function(state, title, url) {
    // Sets the document title for reference later.
    // TODO(philipwalton): consider using WeakMap for this to not conflict
    // with any user-defined property also called "title".
    if (isObject(state) && title) state.title = title;

    originalPushState.call(history, state, title, url);
    this.updateTrackerData();
  }.bind(this);

  // Overrides history.repaceState.
  var originalReplaceState = history.replaceState;
  history.replaceState = function(state, title, url) {
    // Sets the document title for reference later.
    // TODO(philipwalton): consider using WeakMap for this to not conflict
    // with any user-defined property also called "title".
    if (isObject(state) && title) state.title = title;

    originalReplaceState.call(history, state, title, url);
    this.updateTrackerData(false);
  }.bind(this);

  // Handles URL changes via user interaction.
  window.addEventListener('popstate', this.updateTrackerData.bind(this));
}


/**
 * Updates the page and title fields on the tracker if necessary and
 * optionally sends a pageview.
 */
UrlChangeTracker.prototype.updateTrackerData = function(shouldSendPageview) {

  // Sets the default.
  shouldSendPageview = shouldSendPageview === false ? false : true;

  // Calls the update logic asychronously to help ensure user callbacks
  // happen first.
  setTimeout(function() {

    var oldPath = this.path;
    var newPath = getPath();

    if (oldPath != newPath &&
        this.opts.shouldTrackUrlChange.call(this, newPath, oldPath)) {

      this.path = newPath;
      this.tracker.set({
        page: newPath,
        title: isObject(history.state) && history.state.title || document.title
      });

      if (shouldSendPageview) this.tracker.send('pageview');
    }
  }.bind(this), 0);
};


/**
 * Determines whether or not the tracker should send a hit with the new page
 * data. This default implementation can be overrided in the config options.
 * @param {string} newPath
 * @param {string} oldPath
 * @return {boolean}
 */
UrlChangeTracker.prototype.shouldTrackUrlChange = function(newPath, oldPath) {
  return true;
};


/**
 * Returns the path value of the current URL.
 * @return {string}
 */
function getPath() {
  return location.pathname + location.search;
}


provide('urlChangeTracker', UrlChangeTracker);

},{"../provide":10,"../utilities":11}],10:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var constants = require('./constants');


// Adds the dev ID to the list of dev IDs if any plugin is used.
(window.gaDevIds = window.gaDevIds || []).push(constants.DEV_ID);


/**
 * Provides a plugin for use with analytics.js, accounting for the possibility
 * that the global command queue has been renamed.
 * @param {string} pluginName The plugin name identifier.
 * @param {Function} pluginConstructor The plugin constructor function.
 */
module.exports = function providePlugin(pluginName, pluginConstructor) {
  var ga = window[window.GoogleAnalyticsObject || 'ga'];
  if (typeof ga == 'function') {
    ga('provide', pluginName, pluginConstructor);
  }
};

},{"./constants":1}],11:[function(require,module,exports){
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var utilities = {

  /**
   * Accepts a function and returns a wrapped version of the function that is
   * expected to be called elsewhere in the system. If it's not called
   * elsewhere after the timeout period, it's called regardless. The wrapper
   * function also prevents the callback from being called more than once.
   * @param {Function} callback The function to call.
   * @param {number} wait How many milliseconds to wait before invoking
   *     the callback.
   */
  withTimeout: function(callback, wait) {
    var called = false;
    setTimeout(callback, wait || 2000);
    return function() {
      if (!called) {
        called = true;
        callback();
      }
    };
  },


  /**
   * Accepts an object of overrides and defaults and returns a new object
   * with the values merged. For each key in defaults, if there's a
   * corresponding value in overrides, it gets used.
   * @param {Object} overrides.
   * @param {?Object} defaults.
   */
  defaults: function(overrides, defaults) {
    var result = {};

    if (typeof overrides != 'object') {
      overrides = {};
    }

    if (typeof defaults != 'object') {
      defaults = {};
    }

    for (var key in defaults) {
      if (defaults.hasOwnProperty(key)) {
        result[key] = overrides.hasOwnProperty(key) ?
            overrides[key] : defaults[key];
      }
    }
    return result;
  },


  isObject: function(obj) {
    return typeof obj == 'object' && obj !== null;
  },


  isArray: Array.isArray || function(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  },


  toArray: function(obj) {
    return utilities.isArray(obj) ? obj : [obj];
  }
};

module.exports = utilities;

},{}],12:[function(require,module,exports){

/**
 * Module dependencies.
 */

var now = require('date-now');

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function debounced() {
    context = this;
    args = arguments;
    timestamp = now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

},{"date-now":13}],13:[function(require,module,exports){
module.exports = Date.now || now

function now() {
    return new Date().getTime()
}

},{}],14:[function(require,module,exports){
var matches = require('matches-selector')

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}

},{"matches-selector":15}],15:[function(require,module,exports){

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}
},{}],16:[function(require,module,exports){
var closest = require('closest');

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector, true);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;

},{"closest":14}],17:[function(require,module,exports){
/**
 *
 * App
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function(App, window, undefined){
	'use strict';

    /**
     * App
     * Constructor for App.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
	App = function(){
		// Require :: Modules
		// We do not need to declare with vars but it allows us to call internal methods externally.
    }

	/**
	 * init
	 * Init method.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	App.prototype.init = function(){
	}

	// Export
	module.exports = new App();

}(window.App = window.App || function(){}, window));

},{}],18:[function(require,module,exports){
/**
 *
 * Application or Website name
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

window.mobile_breakpoint = 768;
window.wiselinks_enabled = true;
window.helper_log        = (Helpers.isEmpty(window.gulp_env) || window.gulp_env == 'development') ? true : false;
window.ga_active         = (Helpers.isEmpty(window.ga)) ? false : true;
},{}],19:[function(require,module,exports){
/**
 *
 * Helpers
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function(Helpers, window, undefined){
	'use strict';

	/**
	 * log
	 * Customised and cross browser console.log.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helpers.log = function(message, type, alertlog){
		if(window.helper_log){
			alertlog = (typeof alertlog === 'undefined') ? true : false;
			if(typeof console === 'undefined' || typeof console.log === 'undefined'){
				if(alertlog){
					alert(message);
				}
			}
			else {
				var color = (type == 'positive') ? '#097809' : (type == 'negative') ? '#c5211d' : (typeof type !== 'undefined') ? type : '#240ad0';
				console.log('%c DEBUG: -----------------------------------------------', 'color: ' + color);
				if(message instanceof Array || message instanceof Object){
					console.log(' DEBUG:', message);
				}
				else{
					console.log('%c DEBUG: ' + message, 'color: ' + color);
				}
				console.log('%c DEBUG: -----------------------------------------------', 'color: ' + color);
				console.log('');
			}
		}
	}

	/**
	 * throw
	 * Throws a custom error.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helpers.throw = function(msg){
        throw new Error(msg);
    }

	/**
	 * breakpoint
	 * Checks the window against a certain breakpoint.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helpers.breakpoint = function(breakpoint){
		return (window.innerWidth <= breakpoint) ? true : false;
	}

	/**
	 * mhi
	 * Measures a hidden element.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helpers.mhi = function(el){
		// Clone element.
		var clone = el.clone();
		// Add to DOM in place and measure height.
		var height = clone.css({'position': 'absolute', 'top': '-100%', 'display': 'block', 'max-height': 'none', 'height': 'auto'}).prependTo(el.parent()).outerHeight();
		// Destroy the clone.
		clone.remove();

		return height;
	}

	/**
	 * isEmpty
	 * Checks if a value is empty, undefined or false.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
    Helpers.isEmpty = function(value){
        return (value == undefined || value == null || value === '' || value.length === 0);
    }

	/**
	 * debounce
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 * $(window).on('resize', Module.test);
	 *
	 * Module.test = Helpers.debounce(function(){
	 *     console.log('This has been debounced');
	 * }, 250);
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helpers.debounce = function(func, wait, immediate){
		var timeout;

		return function(){
			var _this = this,
				args  = arguments;

			var later = function(){
				timeout = null;
				if(!immediate){
					func.apply(_this, args);
				}
			};
			var call_now = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if(call_now){
				func.apply(_this, args);
			}
		};
	}

	/**
	 * preloader
	 * Generates a preloader.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helpers.preloader = function(el, destroy){
		destroy = (typeof destroy === 'undefined') ? false : true;
		el      = (typeof el === 'undefined') ? $('body') : el;
		var loader = $('<div class="spinner-wrapper"><svg class="spinner" width="35px" height="35px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"><circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle></svg></div>');

		if(!destroy){
			if(!$('.spinner-wrapper', el).length){
				el.css({'position': 'relative'}).prepend(loader);
			}
		}
		else{
			$('.spinner-wrapper', el).fadeOut(500, function(){
				el.css({'position': ''}).prepend(loader);
				$(this).remove();
			});
		}
	}

    /**
     * ajax
     * Returns a simple Ajax request. Should use the result with a promise.
     * Will automatically parse any URL parameters and place them in the JSON
     * body instead.
     *
     * @since 1.0.0
     * @version 1.0.0
     */
    Helpers.ajax = function(url, request, type, dataType, preloader_el){
    	// Default data.
    	var default_params = {
			ajaxrequest: true
    	};
		var request_params = (!Helpers.isEmpty(request)) ? request : {};
    	// Get params (if any).
    	var optional_params = Helpers.parse_url_params(url);
    	// Merge params to get data.
    	var data = $.extend({}, default_params, optional_params, request_params);
		// Request.
        return $.ajax({
            url     : (url.indexOf('?') != -1) ? url.split('?')[0] : url,
            type    : (!Helpers.isEmpty(type)) ? type : 'POST',
            dataType: (!Helpers.isEmpty(dataType)) ? dataType : 'JSON',
            data    : data,
            beforeSend: function(jqXHR, settings){
            	// Log full URL.
            	Helpers.log(settings.url + '?' + settings.data);
                // Add preloader.
                Helpers.preloader((Helpers.isEmpty(preloader_el)) ? $('body') : preloader_el);
            },
            complete: function(jqXHR){
                // Destroy preloader.
                Helpers.preloader((Helpers.isEmpty(preloader_el)) ? $('body') : preloader_el, true);
            }
        });
    }

	/**
	 * parse_url_params
	 * Converts the URL parameters into an object.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Helpers.parse_url_params = function(url){
		// Check if URL contains a ?.
		if(url.indexOf('?') != -1){
			// Split URL at ?
			var url_parsed = url.split('?')[1],
				url_params = (!Helpers.isEmpty(url_parsed)) ? url_parsed : false;

			return (url_params) ? JSON.parse('{"' + decodeURI(url_params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}') : false;
		}
		else{
			return {};
		}
	}

    /**
     * decode_entities
     * Decodes HTML entities.
     *
     * @since 1.0.0
     * @version 1.0.0
     */
    Helpers.decode_entities = function(string){
    	// Create pseudo element.
	    var pseudo = document.createElement('textarea');
	    // Decode.
	    pseudo.innerHTML = string;

	    return pseudo.value;
	}

    // Export
    module.exports = Helpers;

}({}, window));

},{}],20:[function(require,module,exports){
/**
 *
 * Module
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function(Module, window, undefined){
	'use strict';

    /**
     * Module
     * Constructor for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module = function(){
    	var _this = this;

        // Document ready.
        $(function(){
			// Set active flag.
			_this.menu_active = false;
			_this.sub_menu_active = false;

			// Vars.
			_this.$button    = $('.js-mobile-button');
			_this.$menu      = $('.js-mobile-menu');
			_this.$content   = $('.js-mobile-content');
			_this.$close     = $('.js-close-mobile-menu');
			_this.$sub_close = $('.js-sub-menu-close');

			// Start binds on window load / resize.
			$(window).on('load resize', $.proxy(_this.init, _this));
        });
    }

	/**
	 * init
	 * Init method for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.init = function(){
    	// Check screen is below mobile breakpoint.
		if(Helpers.breakpoint(window.mobile_breakpoint)){
        	return this.binds();
        }
        else{
			// Reset flag.
			this.set_menu_flag(false);
        	// Reset any menus.
        	return this.hide_primary_menu();
        }
	}

	/**
	 * binds
	 * jQuery event binds for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.binds = function(){
		var _this = this;

		// Click on the mobile menu.
		this.$button.on('click', function(){
			var _self = $(this);

			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hide_sub_menu();
				// Set flag.
				_this.sub_menu_active = false;
			}
			// Run hide operations.
			else if(_this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu(_self);
				// Set flag.
				_this.set_menu_flag(false);
			}
			// Run show operations.
			else{
				// Show mobile menu.
				_this.show_primary_menu(_self);
				// Set flag.
				_this.set_menu_flag(true);
			}
		});

		// Sub Menu Click.
		$(_this.$menu).on('click', 'a', function(e){
			var _self = $(this);

			if(_self.next('ul').length){
				e.preventDefault();
				// Init sub menu.
				_this.show_sub_menu(_self.next('ul'));
			}
		});

		// Escape key pressed.
		$(document).on('keyup', function(e){
			// Check key type & menu is active.
			if(e.keyCode == 27){
				// Hide mobile menu.
				_this.$close.trigger('click');
			}
		});

		// Sub Menu Close.
		this.$sub_close.on('click', function(){
			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hide_sub_menu();
				// Set flag.
				_this.sub_menu_active = false;
			}
		});

		// Close menu.
		this.$close.on('click', function(){
			// Check sub menu is active first.
			if(_this.sub_menu_active){
				// Hide mobile menu.
				_this.hide_sub_menu();
				// Set flag.
				_this.sub_menu_active = false;
			}
			// Check menu is active.
			else if(_this.menu_active){
				// Hide mobile menu.
				_this.hide_primary_menu();
				// Set flag.
				_this.set_menu_flag(false);
			}
		});
	}

	/**
	 * show_primary_menu
	 * Show menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.show_primary_menu = function(){
		// Vars.
		var doc_width  = $(document).width(),
			doc_height = $(document).height(),
			doc_85     = (doc_width / 100) * 85;

		// Add 85% width to menu.
		this.$menu.css({'width': doc_85});
		// Move page content 85% left.
		this.$content.addClass('active-menu').css({'left': doc_85});
		// Add active class to menu button.
		this.$button.addClass('active-menu');
		// Restrict body height.
		$('body').css({'height': doc_height, 'overflow': 'hidden'});
	}

	/**
	 * hide_primary_menu
	 * Hide menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.hide_primary_menu = function(){
		var _this = this;

		// Remove the active class.
		this.$content.removeClass('active-menu');
		// Remove active class from menu button.
		this.$button.removeClass('active-menu');
		// Remove the active class.
		this.$content.css({'left': ''});

		// Wait 10ms.
		setTimeout(function(){
			// Remove 90% width to menu.
			_this.$menu.css({'width': ''});
			// Restrict body height.
			$('body').css({'height': '', 'overflow': ''});
		}, 500); // Needs to be the same as the animation speed in the CSS.
	}

	/**
	 * show_sub_menu
	 * Show sub menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.show_sub_menu = function(el){
		var _this = this;

		// Vars.
		var menu_width = _this.$menu.width(),
			menu_95    = (menu_width / 100) * 95;

		// Add 95% width to sub menu.
		el.addClass('active-sub-menu').css({'width': menu_95});
		// Wait 10ms.
		setTimeout(function(){
			_this.$menu.addClass('sub-menu-active');
			_this.sub_menu_active = true;
		}, 100);
	}

	/**
	 * hide_sub_menu
	 * Hides sub menu.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.hide_sub_menu = function(el){
		var _this = this;

		// Set close button text.
		this.$close.html('X');
		// Remove 80% width from sub menus.
		$('.active-sub-menu').css({'width': ''});
		// Wait 10ms.
		setTimeout(function(){
			_this.sub_menu_active = false;
		}, 100);
		// Wait 20ms.
		setTimeout(function(){
			_this.$menu.removeClass('sub-menu-active');
			// Remove active class from sub menus.
			$('.active-sub-menu').removeClass('active-sub-menu');
		}, 200);
	}

	/**
	 * set_menu_flag
	 * Set flag after 10ms
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Module.prototype.set_menu_flag = function(state){
		var _this = this;

		// Wait 10ms.
		setTimeout(function(){
			// Set flag.
			_this.menu_active = state;
		}, 100);
	}

	// Export
	module.exports = new Module();

}(function(){}, window));

},{}],21:[function(require,module,exports){
/**
 *
 * Module
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function(Module, window, undefined){
    'use strict';

    /**
     * Module
     * Constructor for this module.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module = function(){
        var _this = this;

        // Require :: NPM
        // require('fancybox');
        // Require :: Plugins
        // require('../plugins/jquery.equal-heights');
        // require('../plugins/jquery.googlemap');
        // require('../plugins/jquery.modals');
        // require('../plugins/jquery.validation');
        // Require :: Vendor
        // require('../plugins/vendor/jquery.slider');
        // require('../plugins/vendor/jquery.tooltipster');

        // Document ready.
        $(function(){
            // Call methods here.
        });
        // Window ready (images loaded).
        $(window).on('load', function(){
            // Call methods here.
        });
    }

    /**
     * equal_heights
     * Equal height elements.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.equal_heights = function(){
        // DOM check.
        if($('.js-eh').length){
            // Init plugin.
            $('.js-eh').equalHeights();
        };
    }

    /**
     * google_map
     * Map events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.google_map = function(){
        // DOM check.
        if($('.js-google-map').length){
            // Init plugin.
            $('.js-google-map').googlemap({
                locations: [
                    'United Kingdom'
                ]
            });
        };
    }

    /**
     * lightboxes
     * Lightbox events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.lightboxes = function(){
        // DOM check.
        if($('.js-lightbox').length){
            // Init plugin.
            $('.js-lightbox').fancybox({
                autoWidth    : true,
                autoHeight   : true,
                autoScale    : true,
                transitionIn : 'fade'
            });
        };
    }

    /**
     * modals
     * Modal events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.modals = function(){
        // DOM check.
        if($('.js-modal').length){
            // Init plugin.
            $('.js-modal').modal();
            // Init plugin on load (or function call).
            $(window).modal({
                type   : 'modal-slide-left',
                content: 'Some content here.'
            });
            // // Destroy created modal.
            $(window).destroyModal();
        };
    }

    /**
     * reveal_dom_element
     * Reveals a DOM element.
     *
     * Usage: <button class="js-reveal" data-reveal-target=".target" data-reveal-alt="Alternative Text" data-reveal-status="hidden">Click Me</button>
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.reveal_dom_element = function(){
        // Button click.
        $(document).on('click', '.js-reveal', function(){
            var _self   = $(this),
                target  = _self.data('reveal-target'),
                modify1 = _self.text(),
                modify2 = _self.data('reveal-alt'),
                status  = _self.data('reveal-status');

            // Check we have a target & status.
            if(target && status){
                if(status == 'visible'){
                    // Check for modifier.
                    if(modify2){
                        // Change text.
                        _self.text(modify2);
                        // Update modifier.
                        _self.data('reveal-alt', modify1);
                    }
                    // Hide element.
                    $(target).addClass('u-hidden').removeClass('u-show');
                    // Update all elements status.
                    $('[data-reveal-target="' + target + '"]').data('reveal-status', 'hidden');
                }
                else{
                    // Check for modifier.
                    if(modify2){
                        // Change text.
                        _self.text(modify2);
                        // Update modifier.
                        _self.data('reveal-alt', modify1);
                    }
                    // Show element.
                    $(target).addClass('u-show').removeClass('u-hidden');
                    // Update all elements status.
                    $('[data-reveal-target="' + target + '"]').data('reveal-status', 'visible');
                }
            }
        });
    }

    /**
     * sliders
     * Slider events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.sliders = function(){
        // DOM check.
        if($('.js-slider').length){
            // Init plugin.
            $('.js-slider').bxSlider({
                auto        : true,
                controls    : true,
                pager       : false,
                autoReload  : true,
                infiniteLoop: true,
                moveSlides  : 1,
                breaks      : [
                    {screen: 0, slides: 1, pager: false},
                    {screen: 460, slides: 2},
                    {screen: 768, slides: 3}
                ]
            });
        };
    }

    /**
     * tooltips
     * Tooltip events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.tooltips = function(){
        // DOM check.
        if($('.js-tooltip').length){
            // Init plugin.
            $('.js-tooltip').tooltipster({
                delay    : 100,
                animation: 'fade',
                trigger  : 'hover'
            });
            // Prevent click. This is for tooltips used in forms where
            // we might use an anchor instead of a button. We do this
            // so the button doesn't submit the form and trigger the
            // validation script.
            $('.js-tooltip').on('click', function(e){
                e.preventDefault();
            })
        };
    }

    /**
     * validation
     * Form validation events.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
    Module.prototype.validation = function(){
        // Check captcha.
        if($('#c_a_p_t_c_h_a').length){
            // Set the captcha field value and check the box.
            $('#c_a_p_t_c_h_a').prop('checked', true).val('c_a_p_t_c_h_a');
        }

        // DOM check.
        if($('.js-validate').length){
            // Init plugin.
            $('.js-validate').validation({
                serverValidation        : false,
                appendErrorToPlaceholder: true,
                successCallback: function(){
                    // Check for Google Analytics.
                    if(window.ga_active){
                        // Set a virtual page for GA.
                        ga('send', 'pageview', '/contact-success.virtual');
                    }
                }
            });
        };
    }

    // Export
    module.exports = new Module();

}(function(){}, window));

},{}],22:[function(require,module,exports){
/**
 *
 * Public
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

;(function(Public, window, undefined){
	'use strict';

    /**
     * Public
     * Constructor for Public.
     *
     * @since 1.0.0
     * @version 1.0.0
    **/
	Public = function(){
		// Require :: Modules
		// We do not need to declare with vars but it allows us to call internal methods externally.
		this.Plugins    = require('./module.plugins');
		this.MobileMenu = require('./module.mobile-menu-side');
    }

	/**
	 * init
	 * Init method.
     *
     * @since 1.0.0
     * @version 1.0.0
	**/
	Public.prototype.init = function(){
	}

	// Export
	module.exports = new Public();

}(window.Public = window.Public || function(){}, window));

},{"./module.mobile-menu-side":20,"./module.plugins":21}],23:[function(require,module,exports){
(function (global){
/**
 *
 * Application or Website name
 *
 * Copyright 2016, Author Name
 * Some information on the license.
 *
**/

// Google Analytics Autotrack.
require('autotrack');

// Require helpers globally.
global.Helpers = require('./helpers');

// Get config.
require('./config');

// Require App.
global.App = require('./app/app');
// Init App.
App.init();
// Log it.
Helpers.log(App);

// Require Public.
global.Public = require('./public/public');
// Init App.
Public.init();
// Log it.
Helpers.log(Public);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./app/app":17,"./config":18,"./helpers":19,"./public/public":22,"autotrack":2}]},{},[23]);
