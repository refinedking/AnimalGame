/**
 * Content: json
 * User: gjh
 * Date: 12-5-31
 * CreateTime: a.m 11:27
 * UpdateTime:
 * UpdateContent:
 */
ig.module(
    "impact.json"
).defines(
    ig.Json=ig.Class.extend({
        rep:null,
        gap:'',
        escapable : /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        indent:'',
        cx : /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        staticInstantiate:function (i) {
            return !ig.Json.instance ? null : ig.Json.instance;
        },
        init:function () {
            if (typeof Date.prototype.toJSON !== 'function') {
                Date.prototype.toJSON = function (key) {
                    return isFinite(this.valueOf())
                        ? this.getUTCFullYear()     + '-' +
                        this.f(this.getUTCMonth() + 1) + '-' +
                        this.f(this.getUTCDate())      + 'T' +
                        this.f(this.getUTCHours())     + ':' +
                        this.f(this.getUTCMinutes())   + ':' +
                        this.f(this.getUTCSeconds())   + 'Z'
                        : null;
                };
                String.prototype.toJSON      = Number.prototype.toJSON  = Boolean.prototype.toJSON = function (key) {
                    return this.valueOf();
                };
            }
            ig.Json.instance = this;
        },
        f:function(n){
            return n < 10 ? '0' + n : n;
        },
        stringify : function(value,replacer,space){
            // The stringify method takes a value and an optional replacer, and an optional
            // space parameter, and returns a JSON text. The replacer can be a function
            // that can replace values, or an array of strings that will select the keys.
            // A default replacer method can be provided. Use of the space parameter can
            // produce text that is more easily readable.
            // If the space parameter is a number, make an indent string containing that many spaces.
            if (typeof space === 'number') {
                for (var i = 0; i < space; i += 1) {
                    this.indent += ' ';
                }
            // If the space parameter is a string, it will be used as the indent string.
            }
            else if (typeof space === 'string') {
                this.indent = space;
            }
            // If there is a replacer, it must be a function or an array.
            // Otherwise, throw an error.
            this.rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }
            // Make a fake root object containing our value under the key of ''.
            // Return the result of stringifying the value.
            return this.str('', {'': value});
        },
        str:function(key, holder){
            // Produce a string from holder[key].
            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = this.gap,
                partial,
                value = holder[key];
            // If the value has a toJSON method, call it to obtain a replacement value.
            if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }
            // If we were called with a replacer function, then call the replacer to
            // obtain a replacement value.
            if (typeof this.rep === 'function') {
                value = this.rep.call(holder, key, value);
            }
            // What happens next depends on the value's type.
            switch (typeof value) {
                case 'string':
                    return this.quote(value);
                case 'number':
                // JSON numbers must be finite. Encode non-finite numbers as null.
                    return isFinite(value) ? String(value) : 'null';
                case 'boolean':
                case 'null':
                     // If the value is a boolean or null, convert it to a string. Note:
                     // typeof null does not produce 'null'. The case is included here in
                     // the remote chance that this gets fixed someday.
                     return String(value);
                    // If the type is 'object', we might be dealing with an object or an array or  null.
                case 'object':
                    if (!value) {
                        return 'null';
                    }
                    this.gap += this.indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === '[object Array]') {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = this.str(i, value) || 'null';
                        }
                        v = partial.length === 0
                            ? '[]'
                            : this.gap
                            ? '[\n' + this.gap + partial.join(',\n' + this.gap) + '\n' + mind + ']'
                            : '[' + partial.join(',') + ']';
                        this.gap = mind;
                        return v;
                    }
                    if (this.rep && typeof this.rep === 'object') {
                        length = this.rep.length;
                        for (i = 0; i < length; i += 1) {
                            if (typeof this.rep[i] === 'string') {
                                k = this.rep[i];
                                v = this.str(k, value);
                                if (v) {
                                    partial.push(this.quote(k) + (this.gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }
                    else {
                        for (k in value) {
                            if (Object.prototype.hasOwnProperty.call(value, k)) {
                                v = this.str(k, value);
                                if (v) {
                                    partial.push(this.quote(k) + (this.gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }
                    v = partial.length === 0
                        ? '{}'
                        : this.gap
                        ? '{\n' + this.gap + partial.join(',\n' + this.gap) + '\n' + mind + '}'
                        : '{' + partial.join(',') + '}';
                    this.gap = mind;
                    return v;
            }
        },
        quote:function(string){
            var meta = {
                '\b': '\\b',
                    '\t': '\\t',
                    '\n': '\\n',
                    '\f': '\\f',
                    '\r': '\\r',
                    '"' : '\\"',
                    '\\': '\\\\'
            };
            this.escapable=new RegExp(this.escapable);
            this.escapable.lastIndex = 0;
            return this.escapable.test(string) ? '"' + string.replace(this.escapable, function (a) {
                var c =meta[a];
                return typeof c === 'string'
                    ? c
                    : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        },
        parse:function(text, reviver){
            var j;
            function walk(holder, key) {
                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }
            text = String(text);
            //ig.log(typeof this.cx);
            this.cx=new RegExp(this.cx);
            this.cx.lastIndex = 0;
            if (this.cx.test(text)) {
                text = text.replace(this.cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }
            if (/^[\],:{}\s]*$/
                .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
                j = eval('(' + text + ')');
                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }
            throw new SyntaxError('JSON.parse');
        }
    })
)