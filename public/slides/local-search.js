(function () {
  'use strict';
  var pending = Object.create(null);
  function normalize(value) { return String(value || '').normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim(); }
  function load(language) {
    var lang = ['zh','en','ko','tw','hk'].includes(language) ? language : 'zh';
    if (!pending[lang]) {
      pending[lang] = fetch('/slides/search-index.' + lang + '.json')
        .then(function (response) { if (!response.ok) throw new Error('Search index HTTP ' + response.status); return response.json(); })
        .then(function (data) { if (data.version !== 1 || !Array.isArray(data.documents)) throw new Error('Invalid local search index'); return data.documents; })
        .catch(function (error) { delete pending[lang]; throw error; });
    }
    return pending[lang];
  }
  window.FangpianSearch = {
    find:function (query, language) {
      var terms = normalize(query).split(' ').filter(Boolean);
      if (!terms.length) return Promise.resolve([]);
      return load(language).then(function (documents) {
        return documents.filter(function (doc) { return terms.every(function (term) { return doc.text.includes(term); }); }).map(function (doc) { return doc.file; });
      });
    }
  };
})();
