// Alphanumeric
const alnum = "[a-zA-Z0-9]";

// Alphanumeric + hyphen
const alnumhyp = `[a-zA-Z0-9\\-]`

// Hexadecimal
const hex = "[0-9a-fA-F]"

// Character classes defined in URI spec
const pct_encoded = `%${hex}{2}`
const sub_delims = "[\\!\\$&'\\(\\)\\*\\+,;=]"
const unreserved = "[a-zA-Z0-9\\-\\._~]"

export { alnum, alnumhyp, hex, pct_encoded, sub_delims, unreserved };