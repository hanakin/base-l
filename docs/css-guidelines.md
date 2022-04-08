## Introduction

CSS is not a pretty language. While it is simple to learn and get started with, it soon becomes problematic at any reasonable scale. There isn’t much we can do to change how CSS works, but we can make changes to the way we author and structure it.

There are a variety of techniques we must employ in order to satisfy these goals, and CSS Guidelines is a document of recommendations and approaches that will help us to do so.

The first part of this will deal with syntax, formatting, and CSS anatomy. The second part will deal with approach, mindframe, and attitude toward writing/architecting CSS.


## Syntax and Formatting

One of the simplest forms of a styleguide is a set of rules regarding syntax and formatting. Having a standard way of writing (literally writing) CSS means that code will always look and feel familiar to all members of the team.

Further, code that looks clean feels clean. It is a much nicer environment to work in, and prompts other team members to maintain the standard of cleanliness that they found. Ugly code sets a bad precedent.

The chosen code format must ensure that code is: easy to read, easy to clearly comment, minimizes the chance of accidentally introducing errors, and results in useful diffs and blames.

At a very high-level, we want

- Tab (4 space width) indents
- 80 character wide columns
- multi-line CSS
- a meaningful use of comments & whitespace


### Anatomy of a Ruleset

Before we discuss how we write out our rulesets, let’s first familiarize ourselves with the relevant terminology:

The following is a `[ruleset]`

```css
[selector],
[selector] {
	[property]: [value]; |
	[property]: [value]; | <- [declaration-block]
	[property]: [value]; |
	[<--declaration--->]
}
```


### Formating

- Use one discrete selector per line in multi-selector rulesets
- The opening brace (``{``) should be on the same line as our last selector
- Include a single space before the opening brace (``{``)
- Include properties and values on the same line
- Include one declaration per line in a declaration block
- Use one level of indentation for each declaration
- Include a single space after the colon (``:``) of a declaration
- Use lowercase hex values, e.g. #abc123
- Use quotes consistently. **Preference double quotes**, e.g. ``content: ""``
- Always quote attribute values in selectors, e.g. ``input[type="checkbox"]``
- Avoid specifying units for zero-values, e.g. ``margin: 0``
- Always use leading zeros, e.g ``font-size: 0.875rem``
- Include a space after each comma (``,``) in comma-separated property or function values
- Include a semi-colon (``;``) at the end of every declaration including the last in a declaration block
- Place the closing brace (``}``) of a ruleset in the same column as the first character of the ruleset, on its own line
- Separate each ruleset by a blank line

Example:

```css
.selector-1,
.selector-2,
.selector-3[type="text"] {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    display: block;
	padding: 0;
    font-family: helvetica, arial, sans-serif;
    color: #333333;
    background: #ffffff;
    background: linear-gradient(#ffffff, rgba(0, 0, 0, 0.8));
}

.selector-a,
.selector-b {
    padding: 10px;
}
```

This format seems to be the largely universal standard (except for variations in
indentation).

As such, the following would be incorrect:

```css
.foo, .foo-bar, .baz
{
  display:block;
  background-color:green;
  color:red }
```

Problems here include

- 2 spaces instead of tabs (4 space width)
- selectors on the same line
- the opening brace (``{``) on its own line
- the closing brace (``}``) does not sit on its own line
- the last semi-colon (``;``) is missing
- no spaces after colons (``:``)


### Multi-line CSS

CSS should be written across multiple lines, except in very specific circumstances. There are a number of benefits to this:

-  A reduced chance of merge conflicts, because each piece of functionality exists on its own line.
- More ‘truthful’ and reliable ``diffs``, because one line only ever carries one change.

Exceptions to this rule should be fairly apparent, such as similar rulesets that only carry one declaration each, for example:

```css
.icon {
	display: inline-block;
	width: 16px;
	height: 16px;
	background-image: url(/img/sprite.svg);
}

.icon-home     { background-position: 0 0; }
.icon-person   { background-position: -16px 0; }
.icon-files    { background-position: 0 -16px; }
.icon-settings { background-position: -16px -16px; }
```

These types of ruleset benefit from being single-lined because

-  they still conform to the one-reason-to-change-per-line rule
-  they share enough similarities that they don’t need to be read as thoroughly as other rulesets - there is more benefit in being able to scan their selectors, which are of more interest to us in these cases


### Declaration order

declarations are to be consistently ordered by related property declarations
following the order

1. Typographic
2. Visual
3. Positioning
4. Box model
5. Misc

Example:

```css
.declaration-order {
	/* Typography */
	font: normal 13px "Helvetica Neue", sans-serif;
	line-height: 1.5;
	text-align: center;

	/* Visual */
	background-color: #f5f5f5;
	border: 1px solid #e5e5e5;
	border-radius: 3px;
	color: #333333;

	/* Positioning */
	position: absolute;
	z-index: 100;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	/* Box-model */
	display: block;
	float: right;
	width: 100px;
	height: 100px;
	margin: 0;
	padding: 8px;

	/* Misc */
	content: "-";
}
```


### Proper Use of units

CSS allows for the use of several different unit types. As such it can get confusing when using more than one type of unit throughout, it's for that reason its beneficial to stick to a strict set of rules for what unit types are to be used for certain selectors.

Furthermore there are certain reasons to use or avoid using specific units in certain places.

#### EM

The ‘em’ unit. This is a very problematic unit which wreaks havoc on countless projects due to the way its calculated. As such this unit type must be avoid except for very very minimal use cases. We prevent the use of ``em`` except for ``letter-spacing`` & ``word-spacing``. It is also used for icon sizing but that is an edge case.

#### Line-heights

All line-heights are to be specified as ``unitless`` in order to prevent improper inheritance. By nature when using units with line-heights the children inherit by default. This can lead to unwanted effects and bloated code. A ``sass`` function called ``unit-less`` is provided which will convert px values for convenience, but for clarity the math is simply

```css
	line-height: (desired px value) / (current elements font-size)
```

#### Font-size

All ``font-size`` should be specified either in ``px`` or ``%`` in small cases. All px values will be converted to ``rem`` during the build process as ``rem`` provide for control in responsive situations.

#### Margins & Paddings

All ``margin`` & ``padding`` should be specified in ``px`` values or ``%``. All ``px`` values will be converted to ``rem`` during the build process as ``rem`` provide for control in responsive situations.

#### PX

All ``px`` will be whole numbers. Browsers do not render ``px`` in fractional values despite what your browser may say it is. Only calculated values will display as fractional ``px``. For clarification a calculated value would be units like ``rem``, ``em``, ``%``, & even ``unitless`` as is the case with line-heights.

#### Dimensions

All dimensional values ``width``, ``min-width``, ``height``, & ``min-height`` should be specified in ``px`` or ``%``. A case can be made for ``vw`` & ``vh``, but they are still on the fringe of browser acceptance, as such fallbacks in ``px`` or ``%`` are required. These values will remain as px if specified. This is done as ``height`` is more effectively and appropriately controlled via the ``line-height`` property, and ``width`` is better specified using the objects box-model via ``padding`` unless its fluid in which ``100%`` can be specified or you can also use ``left: 0; right: 0;``



#### Indenting Sass

Sass provides nesting functionality. That is to say, by writing this:

```css
.foo {
	color: red;

	.bar {
	    color: blue;
	}
}
```

…we will be left with this compiled CSS:

```css
.foo { color: red; }
.foo .bar { color: blue; }
```

When indenting Sass, we stick to the same four space tab indentation, and we also leave a blank line before and after the nested ruleset.

**N.B.** Nesting in Sass should be avoided in most cases. See [the Specificity section](#/codeing-guidelines?id=specificity) for more data.


### Enforcing standardization

Our project makes use of several tools to lint and to keep us to the standards.

#### 1. [stylelint.io](http://www.stylelint.io)
?> This is used to provide detailed linting for our standards via the `.stlyelintrc` file in the root of the project.

#### 2. [postcss-sorting](https://github.com/hudochenkov/postcss-sorting)
?> This is used to provide automatic sorting to our declaration order via the `.postcss-sorting.json` file in the root of the project.

#### 3. [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)
?> This is used to ensure the proper units are consistently used throughout the project during the build process via the ``gulp`` as well as on save in your editor.

#### 4. [stylefmt](https://github.com/morishitter/stylefmt)
?> This is used to help automatically re-format your code to the standards on the fly during the build process via ``gulp`` as well as on save in your editor.

!> As a **NOTE** our editor of choice is [ATOM](http://www.atom.io) which provides usefull plugins to make use of these tools. Checkout the [Editor Setup](/editor-setup) section of the docs for more information
