/*
      foo://example.com:8042/over/there?name=ferret#nose
      \_/   \______________/\_________/ \_________/ \__/
      |           |            |            |        |
    scheme     authority      path        query   fragment
*/

/* 
   The final regex is created by passing the string containing the regex to RegExp.
   This necessitates the use of double escapes (\\) instead of the usual escapes (\)
*/

// Useful character classes 
import { unreserved, sub_delims, pct_encoded, hex, alnumhyp, alnum } from "./character.js";

// This is the http/https part of the URL
const scheme = "(?:(?:http)|(?:https)|(?:ftp))";

const ipv4 = "(?:(?:\\d{1,3}\\.){3}\\d{1,3})";

const ipv6_literal = `${hex}{1,4}`
const ipv6 = `(?:\\[(?:${ipv6_literal}:){7}${ipv6_literal}\\])`

/* 
   domain_part must start and end with alphanumeric characters.
   They may contain hyphen in the middle.
*/
const domain_part = `(?:${alnum}(?:${alnumhyp}*${alnum})?)`;

/*
   Each domain is a sequence of domain_part separated by dot
   eg: subdomain.domain.tld where subdomain, domain and tld are all domain_part
*/
const domain = `(?:${domain_part}\\.)+${domain_part}`;

// We also want to consider http://localhost as valid
const reg_name = `(?:localhost|${domain})`

/* 
   A host is either a reg_name or ipv4 address or ipv6 address. 
   If it is a ipv6 address, it must be enclosed within square brackets.
*/
const host = `(?:${ipv4}|${reg_name}|${ipv6})`;

const port = "[0-9]+";

const authority = `${host}(?::${port})?`;

// Path is the /about part of website.com/about
const pchar = `${unreserved}|${pct_encoded}|${sub_delims}|:|@`
const segment = `(?:${pchar})*`
const path = `(?:(?:\\/${segment})*)`;

// Query is the foo=bar part of google.com/search?foo=bar
const query = `(${pchar}|\\/|\\?)*`;

// Fragment is the part that comes after #
const fragment = query;

const URL = `${scheme}:\\/\\/${authority}${path}(?:\\?${query})?(?:#${fragment})?`;

export function createRegex() {
   console.log("Regex with non-capturing group", URL);
   console.log("Regex with capturing group", URL.replace(/\?:/g, ""));
   const r = new RegExp(URL, "gi");
   return r;
}