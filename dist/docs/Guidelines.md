# HTML Framework Markup Guidelines
### By Stew Dellow | [hellostew.com](http://hellostew.com/ "Creative Web Developer")

## Contents
1. [HTML](#html)
	1. [Syntax](#html--syntax)
	2. [HTML5 doctype](#html--html5_doctype)
	3. [Character encoding](#html--character_encoding)
	4. [CSS and JavaScript includes](#html--css_and_js_includes)
	5. [Attribute order](#html--attribute_order)
	6. [Boolean attributes](#html--boolean_attributes)
	7. [Reducing markup](#html--reducing_markup)
2. [CSS](#css)
	1. [Syntax](#css--syntax)
	2. [Class names](#css--class_names)
		1. [BEM syntax](#css--class_names--bem_syntax)
	3. [Declaration order](#css--declaration_order)
	4. [Media query placement](#css--media_query_placement)
	5. [Prefixed properties](#css--prefixed_properties)
	6. [Shorthand notation](#css--shorthand_notation)
	7. [Comments](#css--comments)
	8. [Editor preferences](#css--editor_preferences)

<a name="html"></a>
## HTML

<a name="html--syntax"></a>
### Syntax
- Use tabs with four spaces.
- Nested elements should be indented once.
- Always use double quotes, never single quotes, on attributes.
- Don't include a trailing slash in self-closing elements—the HTML5 spec says they're optional.
- Don't omit optional closing tags (e.g. `</li>` or `</body>`).

<a name="html--html5_doctype"></a>
### HTML5 doctype
Enforce standards mode and more consistent rendering in every browser possible with this simple doctype at the beginning of every HTML page.

	<!DOCTYPE html>
	<html>
		<head>
		</head>
	</html>

<a name="html--character_encoding"></a>
### Character encoding
Quickly and easily ensure proper rendering of your content by declaring an explicit character encoding.

	<head>
	<meta charset="UTF-8">
	</head>

<a name="html--css_and_js_includes"></a>
### CSS and JavaScript includes
Per HTML5 spec, typically there is no need to specify a type when including CSS and JavaScript files as text/css and text/javascript are their respective defaults.

<a name="html--attribute_order"></a>
### Attribute order
HTML attributes should come in this particular order for easier reading of code.

- rel
- href, src
- type
- for
- name
- id
- class
- value
- content
- data-*
- alt
- title
- lang
- aria-*, role

<a name="html--boolean_attributes"></a>
### Boolean attributes
A boolean attribute is one that needs no declared value. XHTML required you to declare a value, but HTML5 has no such requirement.

The presence of a boolean attribute on an element represents the true value, and the absence of the attribute represents the false value. If you must include the attribute's value, and you don't need to, follow this WhatWG guideline:

If the attribute is present, its value must either be the empty string or [...] the attribute's canonical name, with no leading or trailing whitespace. In short, don't add a value.

<a name="html--reducing_markup"></a>
### Reducing markup
Whenever possible, avoid superfluous parent elements when writing HTML. Many times this requires iteration and refactoring, but produces less HTML. Take the following example:

	<!-- Not so great -->
	<span class="avatar">
		<img src="...">
	</span>

	<!-- Better -->
	<img class="avatar" src="...">

<a name="css"></a>
## CSS

<a name="css--syntax"></a>
### Syntax
- Use tabs with four spaces.
- When grouping selectors, keep individual selectors to a single line.
- Include one space before the opening brace of declaration blocks for legibility.
- Place closing braces of declaration blocks on a new line.
- Include one space after : for each declaration.
- Each declaration should appear on its own line for more accurate error reporting.
- End all declarations with a semi-colon even the last one.
- Comma-separated property values should include a space after each comma (e.g.`, box-shadow`).
- Don't include spaces after commas within `rgb()`, `rgba()`, `hsl()`, `hsla()`, or `rect()` values. This helps differentiate multiple color values (comma, no space) from - multiple property values (comma with space). Do prefix values with a leading zero (e.g. 0.5 instead of .5).
- Uppercase all hex values: e.g. `#FFFFFF`.
- Don't use shorthand hex values where available: e.g. `#fff` instead of `#ffffff`.
- Quote attribute values in selectors: e.g. `input[type="text"]`. They're only optional in some cases, and it's a good practice for consistency.
- Avoid specifying units for zero values: e.g. `margin: 0;` instead of `margin: 0px;`.
- Do not use quotes when declaring a URL image. This is not required and equates to unneccessary bytes: e.g. `background: url(image/url/here.jpg);`
- Related properties can be grouped on one line:

		.class {
			position: absolute;
			top: 0; left: 10px;
		}

<a name="css--class_names"></a>
### Class names
- Consider use of BEM syntax. Refer to [CSS Wizardry's MindBEMding](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) article for more information
- Keep classes lowercase and use dashes. Dashes serve as natural breaks in related class (e.g., .btn and .btn-danger).
- Avoid excessive and arbitrary shorthand notation. .btn is useful for button, but .s doesn't mean anything.
- Keep classes as short and succinct as possible.
- Use meaningful names; use structural or purposeful names over presentational.
- Prefix classes based on the closest parent or base class.
- Use .js-* classes to denote behavior (as opposed to style), but keep these classes out of your CSS. Or alternatively use `data-attributes` for JS events.

<a name="css--class_names--bem_syntax"></a>
#### BEM Syntax
Use the BEM (block, element, modifier) syntax as a naming methodology.

	/* -- Represents the higher level of an abstraction or component. -- */
	.block {
	}
	/* -- Represents a descendent of .block that helps form .block as a whole. -- */
	.block__element {
	}
	/* -- Represents a different state or version of .block -- */
	.block--modifier {
	}

Examples in practice:

	.site-search{}
	.site-search__field{}
	.site-search--full{}

	.person{}
	.person__hand{}
	.person--female{}
	.person--female__hand{}
	.person__hand--left{}

	<form class="site-search  site-search--full">
	    <input type="text" class="site-search__field">
	    <input type="Submit" value ="Search" class="site-search__button">
	</form>

From the following example we can see that .media is the block, `.media__img--rev` is an element of .media that has a modifier applied and `.media__body` is an unmodified element of `.media`.

	<div class="media">
	    <img src="logo.png" alt="Foo Corp logo" class="img-rev">
	    <div class="body">
	        <h3 class="alpha">Welcome to Foo Corp</h3>
	        <p class="lede">Foo Corp is the best, seriously!</p>
	    </div>
	</div>
	<div class="media">
	    <img src="logo.png" alt="Foo Corp logo" class="media__img--rev">
	    <div class="media__body">
	        <h3 class="alpha">Welcome to Foo Corp</h3>
	        <p class="lede">Foo Corp is the best, seriously!</p>
	    </div>
	</div>

<a name="css--declaration_order"></a>
### Declaration order
Related property declarations should be grouped together following the order:

- Box model
- Positioning
- Typographic
- Cosmetics
- Misc

The box model comes first as it dictates a component's dimensions and placement. Positioning comes second because it can remove an element from the normal flow of the document.

Everything else takes place inside the component or without impacting the previous two sections, and thus they come last.

	.declaration-order {
		/* Box-model */
		width: 100px;
		height: 100px;
		padding: 10px;
		margin: 10px;
		border: 1px solid #e5e5e5;
		display: block;
		float: right;

		/* Positioning */
		position: absolute;
		top: 0; right: 0; bottom: 0; left: 0;
		z-index: 100;

		/* Typography */
		font: normal 13px "Helvetica Neue", sans-serif;
		line-height: 1.5;
		color: #333;
		text-align: center;

		/* Cosmetics */
		border-radius: 3px;
		background: #f5f5f5;

		/* Misc */
		opacity: 1;
		transition: background 500ms ease;
	}

<a name="css--media_query_placement"></a>
### Media query placement
Place media queries as close to their relevant rule sets whenever possible. Don't bundle them all in a separate stylesheet or at the end of the document. Doing so only makes it easier for folks to miss them in the future. Here's a typical setup.

	.element { ... }
	.element-avatar { ... }
	.element-selected { ... }

	@media (min-width: 480px) {
		.element { ...}
		.element-avatar { ... }
		.element-selected { ... }
	}

<a name="css--prefixed_properties"></a>
### Prefixed properties
When using vendor prefixed properties, indent each property such that the declaration's value lines up vertically for easy multi-line editing.

	/* Prefixed properties */
	.selector {
		-webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.15);
		   -moz-box-shadow: 0 1px 2px rgba(0,0,0,0.15);
	  	     -o-box-shadow: 0 1px 2px rgba(0,0,0,0.15);
	          	box-shadow: 0 1px 2px rgba(0,0,0,0.15);
	}

<a name="css--shorthand_notation"></a>
### Shorthand notation
Strive to limit use of shorthand declarations to instances where you must explicitly set all the available values. Common overused shorthand properties include:

- padding
- margin
- font
- background
- border
- border-radius

Often times we don't need to set all the values a shorthand property represents. For example, HTML headings only set top and bottom margin, so when necessary, only override those two values. Excessive use of shorthand properties often leads to sloppier code with unnecessary overrides and unintended side effects.

	/* Bad example */
	.element {
		margin: 0 0 10px;
	}

	/* Good example */
	.element {
		margin-bottom: 10px;
	}

<a name="css--comments"></a>
### Comments
Code is written and maintained by people. Ensure your code is descriptive, well commented, and approachable by others. Great code comments convey context or purpose. Do not simply reiterate a component or class name.

Be sure to write in complete sentences for larger comments and succinct phrases for general notes.

	/* Bad example */
	/* Modal header */
	.modal-header {
		...
	}

	/* Good example */
	/* Wrapping element for .modal-title and .modal-close */
	.modal-header {
		...
	}

<a name="css--editor_preferences"></a>
### Editor preferences
Set your editor to the following settings to avoid common code inconsistencies and dirty diffs:

- Use four space tabs.
- Trim trailing white space on save.
- Set encoding to UTF-8.
- Add new line at end of files.
