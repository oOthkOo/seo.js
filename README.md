# Seo.js [![SlugBay Badge](https://www.slugbay.com/pictures/badges/slugbay-simple.svg)](https://www.slugbay.com)

The most simple, customizable and easy to use JavaScript SEO management library.

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

Usage
-----

```javascript
    // General page metas
    seo.use(seo.tag('title'))
    seo.use(seo.metaName([
        'description',
        'keywords'
    ]))

    // Open Graph page metas
    seo.use(seo.metaProperty([
        'og:type',
        'og:title',
        'og:url',
        'og:description',
        'og:image'
    ]))

    // Twitter page metas
    seo.use(seo.metaName([
        'twitter:card',
        'twitter:site',
        'twitter:creator',
        'twitter:domain',
        'twitter:url',
        'twitter:image',
        'twitter:title',
        'twitter:description'
    ]))

    // Slack page metas
    seo.use(seo.metaName([
        'slack-app-id'
    ]))

    // Set generic tokens for templating
    seo.setTerms({
        'title': "Seo - A beautiful example",
        'description': "SlugBay helps you centralise and better manage all your resources, and discover new interesting material more quickly",
        'domain': "slugbay.com",
        'website': "https://www.slugbay.com",
        'image': "https://www.slugbay.com/pictures/opengraph.png",
        'username': "@slugbay"
    })

    // Update all metas on current html page
    seo.update({
        'title': "{title}",
        'description': "{description}",
        'keywords': "example keyword seo js",

        'og:type': "website",
        'og:title': "{title}",
        'og:url': "{website}",
        'og:description': "{description}",
        'og:image': "{image}",

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

```

Configure
-----
Declare meta to use :

```javascript
    seo.use(seo.metaName('fb_app_id')
    
    seo.use(seo.metaName([
        'description',
        'keywords'
    ]))
```

Your plugin
-----
<h4>Create your plugin</h4>
To create your plugin, simply create a new instance of Plugin, configure it and use it !

