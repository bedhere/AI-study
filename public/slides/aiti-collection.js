/* Local tiger collection. Card-code format is compatible with the reference site.
   Codes carry a public personality ID and random salt, never quiz answers or identity. */
(function (root) {
  'use strict';
  const storageKey = 'fangpian_aiti_collection_v1';
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const codePattern = /^AITI-(\d{2})-([A-HJ-NP-Z2-9]{4})-([A-HJ-NP-Z2-9])$/;
  const invalidCode = '这个卡片码好像不完整，再检查一下字母和数字。';

  function validProfileId(value) { return typeof value === 'string' && /^(?:0[1-9]|1[0-6])$/.test(value); }
  function emptyState() { return { ownProfileId: null, cardCode: null, unlocked: [], redeemedCodes: [] }; }
  function normalizeCode(value) {
    return typeof value === 'string' ? value.normalize('NFKC').trim().toUpperCase().replace(/[‐‑‒–—―−]/g, '-').replace(/\s+/g, '') : '';
  }
  function checksum(value) {
    let hash = 7;
    for (const char of value) hash = (hash * 31 + char.charCodeAt(0)) % alphabet.length;
    return alphabet[hash];
  }
  function decodeCode(value) {
    const code = normalizeCode(value), match = code.match(codePattern);
    if (!match || !validProfileId(match[1]) || checksum(match[1] + match[2]) !== match[3]) throw new Error(invalidCode);
    return { code, profileId: match[1] };
  }
  function createCode(profileId) {
    if (!validProfileId(profileId)) throw new Error('这只小老虎还不存在，请重新查看测试结果。');
    if (typeof root.crypto?.getRandomValues !== 'function') throw new Error('当前浏览器暂时无法生成卡片码，请使用支持安全随机数的浏览器。');
    const bytes = new Uint8Array(4);
    root.crypto.getRandomValues(bytes);
    const salt = Array.from(bytes, value => alphabet[value % alphabet.length]).join('');
    return 'AITI-' + profileId + '-' + salt + '-' + checksum(profileId + salt);
  }
  function cleanState(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) return emptyState();
    if (Object.hasOwn(value, 'version')) {
      if (value.version !== 1 || !value.state || typeof value.state !== 'object' || Array.isArray(value.state)) return emptyState();
      value = value.state;
    }
    const ownProfileId = validProfileId(value.ownProfileId) ? value.ownProfileId : null;
    const unlocked = [...new Set(Array.isArray(value.unlocked) ? value.unlocked.filter(validProfileId) : [])];
    let cardCode = null;
    if (ownProfileId) {
      if (!unlocked.includes(ownProfileId)) unlocked.push(ownProfileId);
      try {
        const decoded = decodeCode(value.cardCode);
        if (decoded.profileId === ownProfileId) cardCode = decoded.code;
      } catch { /* A damaged code must not be replaced by a newly invented one. */ }
    }
    const redeemedCodes = [], redeemedProfiles = new Set();
    for (const raw of Array.isArray(value.redeemedCodes) ? value.redeemedCodes : []) {
      try {
        const decoded = decodeCode(raw);
        if (redeemedProfiles.has(decoded.profileId)) continue;
        redeemedProfiles.add(decoded.profileId); redeemedCodes.push(decoded.code);
        if (!unlocked.includes(decoded.profileId)) unlocked.push(decoded.profileId);
      } catch { /* Keep the valid collection when an individual old entry is malformed. */ }
      if (redeemedProfiles.size === 16) break;
    }
    return { ownProfileId, cardCode, unlocked, redeemedCodes };
  }
  function createStore(storage, onFailure) {
    let persistent = true, memory = emptyState();
    function fail() {
      if (!persistent) return;
      persistent = false;
      if (typeof onFailure === 'function') onFailure();
    }
    function load() {
      if (persistent) {
        let raw;
        try { raw = storage.getItem(storageKey); } catch { fail(); }
        if (persistent) {
          try {
            const saved = JSON.parse(raw || 'null');
            memory = saved && saved.version === 1 ? cleanState(saved) : emptyState();
          } catch { memory = emptyState(); }
        }
      }
      return cleanState(memory);
    }
    function save(state) {
      memory = cleanState(state);
      if (persistent) {
        try { storage.setItem(storageKey, JSON.stringify({ version: 1, state: memory })); } catch { fail(); }
      }
      return cleanState(memory);
    }
    function rememberResult(profileId) {
      if (!validProfileId(profileId)) throw new Error('这只小老虎还不存在，请重新查看测试结果。');
      const state = load();
      if (state.ownProfileId !== profileId || !state.cardCode) state.cardCode = createCode(profileId);
      state.ownProfileId = profileId;
      if (!state.unlocked.includes(profileId)) state.unlocked.push(profileId);
      return save(state);
    }
    function redeem(value) {
      // Validate before reading or writing collection state: invalid input has no side effects.
      const decoded = decodeCode(value), state = load();
      if (state.unlocked.includes(decoded.profileId)) return { changed: false, profileId: decoded.profileId };
      state.unlocked.push(decoded.profileId); state.redeemedCodes.push(decoded.code); save(state);
      return { changed: true, profileId: decoded.profileId };
    }
    load();
    return { load, rememberResult, redeem, get persistent() { return persistent; } };
  }
  root.FangpianAITICollection = { storageKey, normalizeCode, decodeCode, createCode, cleanState, createStore };
})(typeof window === 'undefined' ? globalThis : window);
