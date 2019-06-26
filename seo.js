function Seo (options) {
    this.options = Object.assign(this.getDefaultOptions(), options)
    this.clearMetas()
    this.clearTerms()
}
Seo.prototype.getDefaultOptions = function () {
    return {
        debug: false,
        headSelector: 'head',
        ignoreEmptyTagValue: true
    }
}
Seo.prototype.use = function (metas) {
    if (Array.isArray(metas)) {
        metas.forEach(function (meta) {
            this.metas[meta.name] = meta
        }.bind(this))
    }
    else if (typeof metas === 'object') {
        this.metas[metas.name] = metas
    }
}
Seo.prototype.getMessageText = function (message) {
    return '[Seo.js] - ' + message + '.'
}
Seo.prototype.log = function (message) {
    console.log(this.getMessageText(message))
}
Seo.prototype.clearMetas = function () {
    this.metas = {}
}
Seo.prototype.getMetaTypeTag = function (name) {
    return {
        name: name,
        selector: name,
        template: '<' + name + '>{value}</' + name + '>'
    }
}
Seo.prototype.tag = function (names) {
    if (Array.isArray(names)) {
        return names.map(function (name) {
            return this.getMetaTypeTag(name)
        }.bind(this))
    }
    else if (typeof names === 'string') {
        return this.getMetaTypeTag(names)
    }
}
Seo.prototype.getMetaTypeName = function (name) {
    return {
        name: name,
        selector: 'meta[name="' + name + '"]',
        template: '<meta name="' + name + '" content="{value}" />'
    }
}
Seo.prototype.metaName = function (names) {
    if (Array.isArray(names)) {
        return names.map(function (name) {
            return this.getMetaTypeName(name)
        }.bind(this))
    }
    else if (typeof names === 'string') {
        return this.getMetaTypeName(names)
    }
}
Seo.prototype.getMetaTypeProperty = function (name) {
    return {
        name: name,
        selector: 'meta[property="' + name + '"]',
        template: '<meta property="' + name + '" content="{value}" />'
    }
}
Seo.prototype.metaProperty = function (names) {
    if (Array.isArray(names)) {
        return names.map(function (name) {
            return this.getMetaTypeProperty(name)
        }.bind(this))
    }
    else if (typeof names === 'string') {
        return this.getMetaTypeProperty(names)
    }
}
Seo.prototype.getMetaTypeLink = function (name) {
    return {
        name: name,
        selector: 'link[rel="' + name + '"]',
        template: '<link rel="' + name + '" href="{value}" />'
    }
}
Seo.prototype.link = function (names) {
    if (Array.isArray(names)) {
        return names.map(function (name) {
            return this.getMetaTypeLink(name)
        }.bind(this))
    }
    else if (typeof names === 'string') {
        return this.getMetaTypeLink(names)
    }
}
Seo.prototype.throwError = function (message) {
    throw new Error(this.getMessageText(message))
}
Seo.prototype.domRemove = function (el) {
    this.domFind(this.options.headSelector).removeChild(el)
}
Seo.prototype.domFind = function (selector) {
    return document.querySelector(selector)
}
Seo.prototype.domCreate = function (html) {
    var node = document.implementation.createHTMLDocument()
    node.body.innerHTML = html
    return node.body.firstChild;
}
Seo.prototype.domAppend = function (el1, el2) {
    return el1.appendChild(el2)
}
Seo.prototype.clear = function () {
    Object.keys(this.metas).forEach(function (name) {
        var meta = this.metas[name]
        var metaNode = this.domFind(meta.selector)
        if (metaNode) {
            this.domRemove(metaNode)
        }
    }.bind(this))
}
Seo.prototype.update = function (metas, only) {

    var finalMetas = {}
    if (only) {
        finalMetas = metas
    }
    else {
        var defMetas = {}
        Object.keys(this.metas).forEach(function (name) {
            defMetas[name] = ''
        })
        finalMetas = Object.assign(defMetas, metas)
    }

    Object.keys(finalMetas).forEach(function (name) {
        var meta = this.metas[name]
        if (!meta) {
            this.throwError('meta (' + name + ') not registered')
            return
        }
        var headSelector = this.options.headSelector
        var headNode = this.domFind(headSelector)
        if (!headNode) {
            this.throwError('head (' + headSelector + ') element not found')
        }

        var value = metas[name] || null

        if (value || !this.options.ignoreEmptyTagValue) {
            Object.keys(this.terms).forEach(function (term) {
                var regex = new RegExp('\{' + term + '\}', 'gi')
                value = value.replace(regex, this.terms[term])
            }.bind(this))

            var html = meta.template.replace(/\{value\}/g, value)
            this.options.debug && this.log(html)

            var metaNode = this.domFind(meta.selector)
            if (metaNode) {
                this.domRemove(metaNode)
                this.options.debug && this.log('meta (' + name + ') removed')
            }
            this.domAppend(headNode, this.domCreate(html))
        }
        this.options.debug && this.log('meta name[' + name + '] value[' + value + ']')
    }.bind(this))
}
Seo.prototype.clearTerms = function () {
    this.terms = {}
}
Seo.prototype.setTerms = function (terms) {
    this.terms = Object.assign(this.terms, terms)
}
