import { createRegex } from "./regex.js";
import { getNewlineTextNode } from "./dom.js";

const regex = createRegex();

export class Linkify {

    /**
     * @param {String} text Text to linkify
     */
    constructor(text) {
        this._text = text;
        this._curr = 0;
        this._root = new DocumentFragment();
    }

    _appendNode(node) {
        if (node)
            this._root.appendChild(node);
    }

    _handleTextTillMatch(match) {
        const m_index = match.index;
        const m_len = match[0].length;
        const text = this._text.slice(this._curr, m_index);
        const node = getNewlineTextNode(text);
        this._appendNode(node);
        this._curr = m_index + m_len;
    }


    _handleRemainingText() {
        const text = getNewlineTextNode(this._text.slice(this._curr));
        this._appendNode(text);
    }

    _handleTrailingDot(match) {
        match[0] = match[0].slice(0, -1);
        return match;
    }

    _appendAnchorTag(link) {
        const node = document.createElement("a");
        node.setAttribute("href", link);
        node.appendChild(document.createTextNode(link));
        this._root.appendChild(node);
    }

    /**
     * Convert links in text into anchor tags
     * @returns {DocumentFragment} Embeddable document fragment 
     */
    linkify() {
        const matches = this._text.matchAll(regex);
        for (let match of matches) {
            const url = match[0];

            // Don't match a period at the end of the URL
            if (url.endsWith(".")) {
                match = this._handleTrailingDot(match);
            }

            // Capture all text till this URL match and insert as TextNode
            this._handleTextTillMatch(match);

            // Insert the matched URL as <a> tag 
            this._appendAnchorTag(url);

        }
        // Add all the remaining text from the end of the last match as TextNode
        this._handleRemainingText();
        return this._root;
    }
}