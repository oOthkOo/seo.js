window.addEventListener('DOMContentLoaded', function () {
    var seo = new Seo({
        debug: true
    })

    // General page metas
    seo.use(seo.tag('title'))
    seo.use(seo.metaName([
        'description',
        'keywords'
    ]))

    seo.use(seo.link('canonical'))

    // Open Graph page metas
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

    // Twitter page metas
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

    // Slack page metas
    seo.use(seo.metaName([
        'slack-app-id'
    ]))

    seo.updateTerms({
        'name': "SlugBay",
        'title': "Seo - A beautiful example",
        'description': "SlugBay helps you centralise and better manage all your resources, and discover new interesting material more quickly",
        'domain': "slugbay.com",
        'website': "https://www.slugbay.com",
        'image': "https://www.slugbay.com/pictures/opengraph.png",
        'username': "@slugbay"
    })

    // Update all metas
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

    var head = seo.domFind('head')
    var results = seo.domFind('.results')
    results.textContent = head.innerHTML
})
