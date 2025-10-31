import { StringWorker } from "../classes/StringWorker";
import WordStructure from "../types/WordStructure";

const text = new StringWorker(
    "Η καριέρα μου στο Water Park Simulator ήρθε η ώρα να εκτοξευτεί."
);

test("Get word Base", () => {
    expect(text.wordBase("ήρθε", "ε")).toBe("ήρθ");
    expect(text.wordBase("καριέρα", "α")).toBe("καριέρ");
    expect(text.wordBase("εκτοξευτεί", "εί")).not.toBe("εκτοξ");
});

test("Get word ending", () => {
    expect(text.wordEnding("καριέρα")).toBe("α");
    expect(text.wordEnding("εκτοξευτεί")).toBe("εί");
    expect(text.wordEnding("ήρθε")).not.toBe("θε");
});

test("Get first word base from the simple list", () => {
    let simpleText = text.getList("desc", false)[0] as WordStructure;
    expect(simpleText.base).toBe("καριέρ");
});

test("Get first word base from the Full list", () => {
    let simpleText = text.getList("desc", true)[1] as [string, number];
    expect(simpleText[0]).toBe("εκτοξευτεί");
});

test("Get first word base rank from the Full list", () => {
    let simpleText = text.getList("desc", true)[0] as [string, number];
    expect(simpleText[1]).toEqual(1);
});
