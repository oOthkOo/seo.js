# Seo.js [![SlugBay Badge](https://www.slugbay.com/pictures/badges/slugbay-simple.svg)](https://www.slugbay.com) [(demo)](https://oothkoo.github.io/seo.js)

[![Stars](https://img.shields.io/github/stars/oothkoo/seo.js.svg?style=for-the-badge)](https://github.com/oothkoo/seo.js)
[![Latest Stable Version](https://img.shields.io/npm/v/@oothkoo/seo-js.svg?style=for-the-badge)](https://www.npmjs.com/package/@oothkoo/seo-js)
[![NPM Downloads](https://img.shields.io/npm/dt/@oothkoo/seo-js.svg?style=for-the-badge)](https://www.npmjs.com/package/@oothkoo/seo-js)
[![NPM Downloads](https://img.shields.io/npm/dm/@oothkoo/seo-js.svg?style=for-the-badge)](https://www.npmjs.com/package/@oothkoo/seo-js)

The most simple, framework agnostic and easy to use JavaScript SEO meta tag management library.

Features
-----
 * Built in pure vanilla JavaScript with no dependencies.
 * Blazing fast SEO tags update.
 * Support the **tag** meta elements.
 * Support the **link** meta elements.
 * Support the **meta** meta elements.
 * Support extending by custom tag configurations
 * Support tag generation white templates and tokens.

Getting Started
-----

<h4>NodeJS</h4>
To install `Seo.js` module from NPM repository :

```sh
  npm install @oothkoo/seo-js
```
<h4>Browser</h4>
To use `Seo.js` in browser, just insert this tag in your html :

```javascript
<script src="dist/seo-X.X.X.min.js" type="text/javascript"></script>
```

## Initialisation options

| name                | type      | default  | description                                        |
|---------------------|-----------|----------|----------------------------------------------------|
| debug               | `Boolean` | `false`  | Enable debug mode                                  |
| headSelector        | `String`  | `'head'` | Page <head> CSS selector                           |
| ignoreEmptyTagValue | `Boolean` | `true`   | Ignore all meta registered with no values provided |

#### Example :

```javascript
    import Seo from '@oothkoo/seo-js'

    var seo = new Seo({
        debug: true,
        headSelector: 'head',
        ignoreEmptyTagValue: true
    })
```

## Register (tag, link and meta) SEO tags

### Seo.use(config)

Register a meta configuration. You must register all metas before to use the library.

* `config` - **Object** - Configuration to use.

#### Example :

```javascript
    seo.use({
        name: 'name',       // meta configuration ame
        selector: 'name',   // dom selector (.class, #id etc..)
        template: '<template>{value}</template>' // html template
    })
```

### Seo.tag(name)

Generate a *tag* meta configuration. This configuration produces tags from this html template `<{name}>{value}</{name}>`.

* `name` - **String | Array** - Tag name(s)

#### Example :

```javascript
    // Register 'title' tag and produces <title>{value}</title>
    seo.use(seo.tag('title'))
    seo.use(seo.tag([
        'author',
        'section'
    ]))
```

### Seo.metaName(name)

Generate a *meta[name=""]* meta configuration. This configuration produces tags from this html template `<meta name="{name}" content="{value}" />`.

* `name` - **String | Array** - Tag name(s)

#### Example :

```javascript
    // Register 'title' tag and produces <meta name="title" content="{value}" />
    seo.use(seo.metaName('title'))
    seo.use(seo.metaName([
        'keywords',
        'description'
    ]))
```

### Seo.metaProperty(name)

Generate a *meta[property=""]* meta configuration. This configuration produces tags from this html template `<meta property="{name}" content="{value}" />`.

* `name` - **String | Array** - Tag name(s)

#### Example :

```javascript
    // Register 'og:title' tag and produces <meta name="og:title" content="{value}" />
    seo.use(seo.metaProperty('og:title'))
    seo.use(seo.metaProperty([
        'og:site_name',
        'og:description'
    ]))
```

### Seo.link(name)

Generate a *link[rel=""]* meta configuration. This configuration produces tags from this html template `<link rel="{name}" href="{value}" />`.

* `name` - **String | Array** - Tag name(s)

#### Example :

```javascript
    // Register 'favicon' tag and produces <link rel="favicon" href="{value}" />
    seo.use(seo.link('favicon'))
    seo.use(seo.link([
        'icon',
        'robots'
    ]))
```

### Seo.clearMetas()

Delete all registered SEO meta tags.

#### Example :

```javascript
    seo.clearMetas()
```

### Seo.clearTerms()

Delete all terms used for templating.

#### Example :

```javascript
    seo.clearTerms()
```

### Seo.updateTerms(terms)

Setting a couple of terms to be used for templating.

* `terms` - **Object** - Tokens name/value list ({name: value})

#### Example :

```javascript
    // Setting terms for templating
    seo.updateTerms({
        'title': "Seo.js - A beautiful example",
        'description': "Seo example page description",
        'website': "https://www.oothkoo.com"
    })
```

### Seo.clear()

Delete all registered meta tags in current html page.

#### Example :

```javascript
    seo.clear()
```

### Seo.update(metas, only)

Update all metas specified in current html page. Theses metas must be registered by `Seo.use(config)` before calling this function.

* `metas` - **Object** - Meta name/value list ({name: value})
* `only` - **Boolean** - Meta scope (default: `false`)
    - `true` : Update only metas specified in `metas` argument
    - `false`: Update all metas registered and overwrite if needed

#### Example :

```javascript
    // Setting terms for templating
    seo.update({
        'title': "{title}", // Using terms 'title' for value
        'description': "{description}", // Using terms 'description' for value
        'website': "https://www.oothkoo.com"
    })
```

## Complete example

```javascript
// When page content is loaded
window.addEventListener('DOMContentLoaded', function () {

    // Initialize Seo library
    var seo = new Seo({
        debug: true
    })

    // Register basic page metas
    seo.use(seo.tag('title'))
    seo.use(seo.metaName([
        'description',
        'keywords'
    ]))
    seo.use(seo.metaLink('canonical'))

    // Register Open Graph page metas
    seo.use(seo.metaProperty([
        'og:type',
        'og:site_name',
        'og:title',
        'og:url',
        'og:description',
        'og:image',
        'og:image:width',
        'og:image:height'
    ]))

    // Register Twitter page metas
    seo.use(seo.metaName([
        'twitter:card',
        'twitter:site',
        'twitter:creator',
        'twitter:domain',
        'twitter:url',
        'twitter:image',
        'twitter:title',
        'twitter:description',
        'twitter:label1',
        'twitter:data1',
        'twitter:label2',
        'twitter:data2'
    ]))

    // Register Slack page metas
    seo.use(seo.metaName([
        'slack-app-id'
    ]))

    // Setting terms for templating
    seo.updateTerms({
        'name': "SlugBay",
        'title': "Seo - A beautiful example",
        'description': "SlugBay helps you centralise and better manage all your resources, and discover new interesting material more quickly",
        'domain': "slugbay.com",
        'website': "https://www.slugbay.com",
        'image': "https://www.slugbay.com/pictures/opengraph.png",
        'username': "@slugbay"
    })

    // Update all current registered metas
    seo.update({
        'title': "{title}",
        'description': "{description}",
        'keywords': "example keyword seo js",

        'canonical': "{website}",

        'og:type': "website",
        'og:title': "{title}",
        'og:site_name': "{name}",
        'og:url': "{website}",
        'og:description': "{description}",
        'og:image': "{image}",
        'og:image:width': "640",
        'og:image:height': "280",

        'twitter:card': "summary_large_image",
        'twitter:site': "{username}",
        'twitter:creator': "{username}",
        'twitter:domain': "slugbay.com",
        'twitter:url': "{website}",
        'twitter:image': "{image}",
        'twitter:title': "{title}",
        'twitter:description': "{description}",

        'slack-app-id': "A2UTWA5PT"
    })
})
```

Donations
-----

:heart: Donations are always welcome :heart:.

Coins | Symbols | Addresses
--- | --- | ---
<img src="https://github.com/oOthkOo/hyper-manager/blob/main/pictures/btc.svg" alt="Bitcoin"/> | BTC | 3B52fbzNFQTaKZxWf5GrCUsASD2UP8na4A
<img src="https://github.com/oOthkOo/hyper-manager/blob/main/pictures/eth.svg" alt="Ethereum"/> | ETH | 0x1C389f1f85Cdb3C2996b83fAc87E496A80698B7C
