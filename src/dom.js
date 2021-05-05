export function output(DOM) {
    const e = document.createElement("div");
    e.appendChild(DOM);
    document.querySelector("#out").appendChild(e);
}

/**
 * Execute a given function and log the time it took. 
 * @param {function} f A function to execute
 * @param {Array} args Arguments to function f
 * @param {String} identifier String to identify this benchmark
 * @returns Whatever function f returns
 */
export function runWithPerfBenchmark(f, args, identifier) {
    let t = -performance.now();
    const r = f(...args);
    t += performance.now();
    console.log(`Benchmark | ${identifier} | ${t}ms`);
    return r;
}

/**
 * Convert text to TextNode and newline to br. 
 * @param {String} text Text content to insert into TextNode 
 * @returns {DocumentFragment}
 */
export function getNewlineTextNode(text) {
    if (text === "")
        return;
    const container = new DocumentFragment();
    const components = text.split("\n");
    components.slice(0, -1).forEach(t => {
        const textNode = document.createTextNode(t);
        container.append(textNode);
        const br = document.createElement("br");
        container.append(br);
    });
    const [last] = components.slice(-1);
    container.append(document.createTextNode(last))
    return container;
}