import { output, runWithPerfBenchmark } from "./dom.js";
import { Linkify } from "./linkify.js";

function test(text) {
    const obj = new Linkify(text);
    const res = runWithPerfBenchmark(obj.linkify.bind(obj), "Execution Time");
    output(res);
}

test("https://www.google.com must linkify");
test("https://www.g..oogle.com must not linkify");
test("https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjyu7DJ-LHwAhUQyzgGHcOKA70QFjAAegQIBBAD&url=https%3A%2F%2Fmatrix.org%2Fdocs%2Fprojects%2Fclient%2Felement%2F&usg=AOvVaw0xpENrPHv_R-ERkyacR2Bd must linkify");
test("http://localhost must linkify");
test("http://foobar must not linkify");
test("http://127.0.0.1:3000 must linkify");
test("http://255.255.255.255 must linkify");
test("http://2001:0db8:85a3:0000:0000:8a2e:0370:7334 must not linkify");
test("http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334] must linkify");
test("http://[2001:0db8:85a3:0000:0000:8a2e:0370:7334]:7000 must linkify");
test("ftp://cnn.example.com&story=breaking_news@10.0.0.1/top_story.htm must not linkify (PHISHING)");
test("https://tools.ietf.org/html/rfc3986. dot must not linkify (SPECIAL_CASE)");
test("http://www.foobar.com/^[] must not linkify (INVALID_CHAR)");
test(" Hello world! https://matrix.to must linkify");