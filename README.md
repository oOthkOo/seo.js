# Seo.js [![SlugBay Badge](https://www.slugbay.com/pictures/badges/slugbay-simple.svg)](https://www.slugbay.com)

The most simple, framework agnostic and easy to use JavaScript SEO meta tag management library.

Features
-----
 * Support the **new** operator.
 * Support the **instanceof** operator.
 * Support the standard OO **inheritance**
 * Support super constructor **automatic** call
 * Support extending a class **C** via **C.prototype**
 * Support **automatic** 'getters', 'setters' methods generation
 * Support **surcharged** methods, call a specific method from arguments count
 * Support **static** methods, call from object as MyClass.method()
 * Support custom class definition **format** (configure all plugins)
 * Support customs **plugins** (create your own plugin or use defaults)
 * Support plugins **management** (whitelist, blacklist plugin from your class definition)

Installation
-----
To use Embryo in browser, just insert this tag in your html :

```javascript
<script src="dist/seo-0.0.1.min.js" type="text/javascript"></script>
```

Getting Started
-----

## Initialisation

```javascript
    var seo = new Seo({
        debug: true,
        headSelector: 'head'
    })
```

## Register <tag>, <link> and <meta> SEO tags

### Seo.use(config)

Register a meta configuration. You must register all metas you want to manage.

* `config` - **Object** - Configuration to use.

#### Exemple :

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

#### Exemple :

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

#### Exemple :

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

#### Exemple :

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

#### Exemple :

```javascript
    // Register 'favicon' tag and produces <link rel="favicon" href="{value}" />
    seo.use(seo.link('favicon'))
    seo.use(seo.link([
        'icon',
        'robots'
    ]))
```

### Seo.setTerms(terms)

Setting a couple of terms to be used for templating.

* `terms` - **Object** - Tokens name/value list ({name: value})

#### Exemple :

```javascript
    // Setting terms for templating
    seo.setTerms({
        'title': "Seo.js - A beautiful example",
        'description': "Seo example page description",
        'website': "https://www.oothkoo.com"
    })
```

### Seo.clear()

Remove all registered metas in current html page.

#### Exemple :

```javascript
    seo.clear()
```

### Seo.update(metas)

Update all metas specified in current html page. Theses metas must be registered by `Seo.use(config)` before calling this function.

* `metas` - **Object** - Meta name/value list ({name: value})

#### Exemple :

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
    seo.setTerms({
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
