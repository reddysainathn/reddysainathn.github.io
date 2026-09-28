// Zero-width fingerprint codec: hides a short payload invisibly inside text.
// 0 -> U+200B, 1 -> U+200C, terminated by U+200D. Survives copy/paste and
// most mail transport. Decode with tools/decode-fingerprint.mjs (owner only).
const ZW0 = '​';
const ZW1 = '‌';
const ZW_END = '‍';

export const encodeFingerprint = (text) => {
  const bytes = new TextEncoder().encode(text);
  let bits = '';
  bytes.forEach((byte) => {
    bits += byte.toString(2).padStart(8, '0');
  });
  return (
    bits
      .split('')
      .map((bit) => (bit === '1' ? ZW1 : ZW0))
      .join('') + ZW_END
  );
};

export const decodeFingerprint = (text) => {
  const runs = text.match(/[​‌]+/g) || [];
  const out = [];
  runs.forEach((run) => {
    const bits = run
      .split('')
      .map((ch) => (ch === ZW1 ? '1' : '0'))
      .join('');
    const bytes = [];
    for (let i = 0; i + 8 <= bits.length; i += 8) {
      bytes.push(parseInt(bits.slice(i, i + 8), 2));
    }
    out.push(new TextDecoder().decode(new Uint8Array(bytes)));
  });
  return out;
};
