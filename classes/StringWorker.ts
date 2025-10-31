import Word from "../types/Word";
import WordStructure from "../types/WordStructure";
import * as fs from "fs";
import { Sort } from "../types/Sort";

export class StringWorker {
    allWordsArr: string[];

    vocals: string[] = [
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

    exept: string[] = [
        "φου",
        "χει",
        "ότε",
        "οπότε",
        "όποτε",
        "όχι",
        "ώπα",
        "υπό",
        "τος",
        "ουσ",
        "ναι",
        "κει",
        "εδώ",
        "ας",
        "αχ",
        "γι",
        "δε",
        "δάπ",
        "δω",
        "δώ",
        "εε",
        "εμ",
        "επί",
        "θα",
        "καν",
        "κι",
        "μεν",
        "μες",
        "μω",
        "να",
        "πάρ",
        "πιο",
        "πλετ",
        "πω",
        "ρε",
        "τόσο",
        "τότε",
        "τόσες",
        "τόσα",
        "χω",
        "ωχ",
        "όνο",
        "όπως",
        "αμ",
    ];

    articles: string[] = [
        "ο",
        "η",
        "το",
        "του",
        "της",
        "την",
        "τον",
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

    conjunc: string[] = [
        "αν",
        "ενώ",
        "αλλά",
        "και",
        "ακόμα",
        "όταν",
        "έτσι",
        "αλλιώς",
        "ωστόσο",
        "πάντως",
        "όμως",
        "που",
        "πού",
        "ότι",
        "πως",
        "πώς",
        "μην",
        "μήπως",
        "όταν",
        "μόλις",
        "πριν",
        "αφού",
        "καθώς",
        "μέχρι",
        "ώσπου",
        "γιατί",
        "επειδή",
        "άμα",
        "εάν",
        "μολονότι",
        "δηλαδή",
        "λοιπόν",
        "είτε",
        "ότι",
        "πωσ",
        "μην",
        "δεν",
        "όταν",
        "ώστε",
    ];

    prepos: string[] = [
        "με",
        "σε",
        "στα",
        "στη",
        "στο",
        "στην",
        "στους",
        "για",
        "ως",
        "πριν",
        "προς",
        "σαν",
        "αντί",
        "από",
        "δίχως",
        "έως",
        "κατά",
        "μετά",
        "μέχρι",
        "παρά",
        "χωρίς",
        "εναντίον",
        "εξαιτίας",
        "ίσαμε",
        "μεταξύ",
    ];

    pronom: string[] = [
        "εγώ",
        "εσύ",
        "αυτός",
        "αυτή",
        "αυτό",
        "εμείς",
        "εσείς",
        "αυτοί",
        "αυτές",
        "αυτά",
        "μου",
        "σου",
        "του",
        "της",
        "μας",
        "σας",
        "τους",
        "εκείνος",
        "ποιος",
        "ποιο",
        "ποιου",
        "ποιανού",
        "πολλά",
        "πολλές",
        "πολλοί",
        "ποιο",
        "τίνος",
        "ποιων",
        "ποιανών",
        "ποιον",
        "κανένας",
        "κανείς",
        "καμιά",
        "καμία",
        "κανένα",
        "κάποιος",
        "κάτι",
        "κάθε",
        "καθένας",
        "καθείς",
        "όλος",
        "ίδιος",
        "μόνος",
        "άλλος",
        "μερικοί",
        "όποιος",
        "όσος",
        "τι",
        "που",
        "οποίος",
        "εαυτό",
        "αυτόν",
        "αυτήν",
        "εαυτός",
        "εαυτού",
        "εαυτά",
        "όλα",
        "όλες",
        "όλη",
        "όλο",
    ];

    nounEndings: string[] = [
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
        "τά",
        "τα",
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
        "τος",
        "τος",
        "των",
        "των",
    ];

    adjectEndings: string[] = [
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
    ];

    proverbEndings: string[] = [
        "α",
        "ά",
        "ον",
        "όν",
        "ων",
        "ών",
        "ως",
        "ώς",
        "ε",
        "η",
    ];

    verbEndings: string[] = [
        "ω",
        "ώ",
        "άω",
        "εις",
        "είς",
        "άς",
        "ει",
        "εί",
        "άει",
        "με",
        "τε",
        "ουν",
        "νε",
        "ούν",
        "αν",
        "άν",
        "α",
        "ες",
        "ε",
        "μαι",
        "ται",
        "στε",
        "νται",
        "ται",
        "σω",
        "σουμε",
        "σετε",
        "σατε",
        "σαμε",
    ];

    constructor(string: string) {
        this.allWordsArr = this.cleanWords(string);
    }

    getList(
        dir: Sort = "desc",
        simple: boolean = true,
        mode: "txt" | "console" | "get" = "txt",
        wordCount?: number | undefined
    ): WordStructure[] {
        let unqArr = this.#sortArray(dir);
        let result = "";
        let simpleMode = simple ? "-simple" : "-full";

        if (wordCount) {
            wordCount = wordCount > unqArr.length ? unqArr.length : wordCount;
        } else {
            wordCount = unqArr.length;
        }

        result += "Total number of words: " + unqArr.length + ".\n\t";

        if (simple) {
            unqArr.forEach((item) => {
                let word = Object.keys(item.words)[0];
                let rank = item.rank;

                result += "\n\t" + word + ": " + rank + ";";
            });
        } else {
            for (let i = 0; i < unqArr.length; i++) {
                result += "\n\t" + unqArr[i].base + ": " + unqArr[i].rank + ";";

                let arr = Object.entries(unqArr[i].words);

                for (let u = 0; u < arr.length; u++) {
                    result += "\n\t-- " + arr[u][0] + ": " + arr[u][1] + ";";
                }
            }
        }

        if (mode === "txt") {
            fs.writeFile(`./file${simpleMode}.txt`, result, (err) =>
                console.error(err)
            );
        }

        if (mode === "console") {
            console.log(result);
        }

        return unqArr;
    }

    cleanWords(str: string): string[] | never {
        const arr = str.split(/[\s,.]/);
        const cleanArr: string[] = [];

        arr.forEach((word) => {
            let clWord = word.toLowerCase().trim();

            if (
                word.length > 1 &&
                word.match(/^[α-ωΑ-Ω]+/) &&
                this.#censorship(clWord)
            ) {
                cleanArr.push(clWord);
            }
        });

        if (cleanArr.length === 0) {
            throw new Error("There is no words in your sentence!");
        } else {
            return cleanArr;
        }
    }

    getUniqueWords(): Word {
        let newObj: Word = {};

        this.allWordsArr.forEach((item) => {
            if (item in newObj) {
                newObj[item] += 1;
            } else {
                newObj[item] = 1;
            }
        });

        return newObj;
    }

    #censorship(word: string): boolean {
        if (this.articles.includes(word.toLowerCase().trim())) {
            return false;
        }
        if (this.conjunc.includes(word.toLowerCase().trim())) {
            return false;
        }
        if (this.prepos.includes(word.toLowerCase().trim())) {
            return false;
        }
        if (this.pronom.includes(word.toLowerCase().trim())) {
            return false;
        }
        if (this.exept.includes(word.toLowerCase().trim())) {
            return false;
        }

        return true;
    }

    #sortArray(dir: Sort): WordStructure[] {
        let unqArr = this.#compactWords(Object.entries(this.getUniqueWords()));

        unqArr.sort((a, b) => {
            switch (dir) {
                case "desc":
                    return b.rank - a.rank;

                case "asc":
                    return a.rank - b.rank;

                case "name":
                    if (a.base.toLowerCase() < b.base.toLowerCase()) {
                        return -1;
                    } else if (a.base.toLowerCase() > b.base.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
            }
        });

        return unqArr;
    }

    #checkEnding(ending: string): boolean {
        let wordEnding = ending;

        if (this.nounEndings.includes(wordEnding)) {
            return true;
        }

        if (this.adjectEndings.includes(wordEnding)) {
            return true;
        }

        if (this.proverbEndings.includes(wordEnding)) {
            return true;
        }

        if (this.verbEndings.includes(wordEnding)) {
            return true;
        }

        return false;
    }

    #compactWords(arr: Array<[string, number]>): Array<WordStructure> {
        const wordBases: string[] = [];
        const compactArr: Array<WordStructure> = [];

        arr.forEach((item) => {
            let word = item[0];
            let rank = item[1];
            const wordEnding = this.#wordEnding(word);
            const wordBase = this.#wordBase(word, wordEnding);

            const wordsObj: Word = {};
            wordsObj[word] = rank;

            if (!wordBases.includes(wordBase)) {
                wordBases.push(wordBase);

                let obj = {
                    base: wordBase,
                    words: wordsObj,
                    rank: rank,
                };
                compactArr.push(obj);
            } else {
                compactArr.forEach((item) => {
                    if (item.base === wordBase) {
                        item.words[word] = rank;
                        item.rank += rank;
                    }
                });
            }
        });

        return compactArr;
    }

    #wordEnding(word: string): string {
        let wordEnding = "";

        for (let i = word.length - 1; i > 1; i--) {
            //Если гласный: добавляем его
            if (this.vocals.includes(word[i])) {
                wordEnding += word[i];

                //Если не гласный: проверяем его
            } else {
                //Если согласный первый: добавим его.
                if (!wordEnding) {
                    wordEnding += word[i];

                    //Если согласный не первый: проверим на новое окончание
                } else {
                    let wordEndingCheck = wordEnding + word[i];
                    wordEndingCheck = wordEndingCheck
                        .split("")
                        .reverse()
                        .join("");

                    //Если новое окончание есть в окончаниях спряжений и склонений: добавим букву
                    if (this.#checkEnding(wordEndingCheck)) {
                        wordEnding += word[i];

                        //Если буквы нет в окончаниях спряжений и склонений: получаем окончание без согласного и прекращаем работу функции
                    } else {
                        wordEnding = wordEnding.split("").reverse().join("");
                        break;
                    }
                }
            }
        }

        return wordEnding;
    }

    #wordBase(word: string, wordEnding: string): string {
        let wordBaseNumber = wordEnding.length;
        let wordBase = word.slice(0, -wordBaseNumber);

        return wordBase;
    }
}
