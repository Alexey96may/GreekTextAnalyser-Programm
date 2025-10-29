export class StringWorker {
    allWordsArr: string[];
    vocals = [
        "α",
        "ά",
        "ε",
        "έ",
        "η",
        "ή",
        "ι",
        "ί",
        "υ",
        "ύ",
        "ο",
        "ό",
        "ω",
        "ώ",
    ];

    articles = [
        "ο",
        "η",
        "το",
        "του",
        "της",
        "τη",
        "ένας",
        "ένα",
        "μία",
        "μια",
        "οι",
        "τα",
        "των",
        "τους",
        "τις",
        "ενός",
        "μιας",
    ];

    nounEndings = [
        "η",
        "ή",
        "α",
        "ά",
        "ι",
        "ί",
        "υ",
        "ύ",
        "ο",
        "ό",
        "ος",
        "ός",
        "ης",
        "ής",
        "ας",
        "άς",
        "ες",
        "ές",
        "ως",
        "ώς",
        "μα",
        "μά",
        "ον",
        "όν",
        "εν",
        "έν",
        "αν",
        "άν",
        "ων",
        "ών",
        "ια",
        "ιά",
        "ου",
        "ού",
        "οι",
        "οί",
        "ους",
        "ούς",
        "εας",
        "έας",
        "ιών",
        "ιού",
        "ους",
        "ούς",
        "ιμο",
        "ίμο",
        "ματος",
        "μάτος",
        "μάτων",
    ];

    adjectEndings = [
        "α",
        "ά",
        "η",
        "ή",
        "ο",
        "ό",
        "υ",
        "ύ",
        "ος",
        "ός",
        "ης",
        "ής",
        "υς",
        "ύς",
        "ες",
        "ές",
        "οι",
        "οί",
        "ια",
        "ιά",
        "ων",
        "ών",
        "ους",
        "ούς",
        "ικο",
        "ίκο",
        "ικου",
        "ίκου",
    ];

    proverbEndings = ["α", "ά", "ον", "όν", "ων", "ών", "ως", "ώς", "ε", "η"];

    verbEndings = [
        "ω",
        "ώ",
        "άω",
        "εις",
        "είς",
        "άς",
        "ει",
        "εί",
        "άει",
        "ουμε",
        "ούμε",
        "άμε",
        "έτε",
        "είτε",
        "ετε",
        "άτε",
        "ατε",
        "ουν",
        "ουνε",
        "ούν",
        "ούνε",
        "αν",
        "άν",
        "ανε",
        "άνε",
        "α",
        "ες",
        "ε",
        "αμε",
        "άμε",
        "ομαι",
        "όμαι",
        "εσαι",
        "έσαι",
        "εται",
        "έται",
        "αστε",
        "άστε",
        "εστε",
        "έστε",
        "ονται",
        "όνται",
    ];

    constructor(string: string) {
        this.allWordsArr = string.split(/[\s,.]/);
    }

    getUniqueWords() {
        return new Set(this.allWordsArr);
    }

    checkWord(word: string): string {
        let message = word + " may be ";

        let wordEnding = this.#wordEnding(word);
        console.log("wordEnding: " + wordEnding);

        if (this.nounEndings.includes(wordEnding)) {
            message += "or a noun (" + wordEnding + ") ";
        }

        if (this.adjectEndings.includes(wordEnding)) {
            message += "or an adjective (" + wordEnding + ") ";
        }

        if (this.proverbEndings.includes(wordEnding)) {
            message += "or a proverb (" + wordEnding + ") ";
        }

        if (this.verbEndings.includes(wordEnding)) {
            message += "or a verb (" + wordEnding + ") ";
        }

        return message;
    }

    #wordEnding(word: string): string {
        let wordEnding = "";
        let flagEnding = false;

        for (let i = word.length - 1; i > 0; i--) {
            if (this.vocals.includes(word[i])) {
                wordEnding += word[i];
                flagEnding = true;
            } else {
                if (!flagEnding) {
                    wordEnding += word[i];
                } else {
                    wordEnding = wordEnding.split("").reverse().join("");
                    break;
                }
            }
        }

        return wordEnding;
    }
}
