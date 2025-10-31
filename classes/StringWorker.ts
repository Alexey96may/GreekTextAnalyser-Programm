import Word from "../types/Word";
import WordStructure from "../types/WordStructure";
import * as fs from "fs";
import { Sort } from "../types/Sort";

export class StringWorker {
    /** Array container for all the wors  */
    allWordsArr: string[];

    /** Greek vocals */
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

    /** Greek word exeptions that will not go to the final list */
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

    /** Greek articles*/
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

    /** Greek conjunctions*/
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

    /** Greek prepositions*/
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

    /** Greek pronoms*/
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

    /** Greek noun endings for checking*/
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

    /** Greek adjective endings for checking*/
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

    /** Greek proverb endings for checking*/
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

    /** Greek verb endings for checking*/
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

    /**
     * StringWorker constructor
     * @constructor
     * @param {string} string - The sentence in Greek
     */
    constructor(string: string) {
        this.allWordsArr = this.cleanWords(string);
    }

    /**
     * Get word list from the text.
     * @param {"desc" | "asc" | "name"} dir - Sort direction
     * @param {boolean} simple - Full word list or a simple one (only one word with the same word base), may work incorrect!
     * @param {"txt" | "console" | "get"} mode - The ways to get the word list.
     * @param {"number | undefined"} wordCount - Count of words in the final word list.
     * @returns {Array} Array with objects where "base: string; words: object; rank: number" OR if Simple mode: Array with arrays, where [0] = word, [1] = number;
     }
     */
    getList(
        dir: Sort = "desc",
        simple: boolean = true,
        mode: "txt" | "console" | "get" = "txt",
        wordCount?: number | undefined
    ): WordStructure[] | Array<[string, number]> {
        let unqArr = this.#sortArray(dir);
        let result = "";
        let simpleArr: Array<[string, number]> = [];
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

                simpleArr.push([word, rank]);

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
            fs.writeFileSync(`./dist/file${simpleMode}.txt`, result);
        }

        if (mode === "console") {
            console.log(result);
        }

        if (simple) {
            return simpleArr;
        } else {
            return unqArr;
        }
    }

    /**
     * Clean Words in your text. Get rid of nonGreek words, symbols and unick letters.
     * @param {string} str - Your sentence
     * @returns {Array | Error} Array with clean words in Lower case or Error if there is no proper words in the text
     }
     */
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

    /**
     * Get unique words from the text. Get rid of nonGreek words, symbols and unick letters.
     * @returns {Object} object where the key is a word and the value is a number with word frequency in the text
     }
     */
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

    /**
     * Define a word ending.
     * @param {string} word - A Greek word
     * @returns {string} The word ending
     }
     */
    wordEnding(word: string): string {
        let wordEnding = "";

        for (let i = word.length - 1; i > 1; i--) {
            //If it`s a vowel: add it
            if (this.vocals.includes(word[i])) {
                wordEnding += word[i];

                //If it`s a consonant: check it
            } else {
                //If a consonant is going first: add it
                if (!wordEnding) {
                    wordEnding += word[i];

                    //If a consonant is NOT going first: check the new ending
                } else {
                    let wordEndingCheck = wordEnding + word[i];
                    wordEndingCheck = wordEndingCheck
                        .split("")
                        .reverse()
                        .join("");

                    //If the new ending is in the conjuction endigs: add the consonant
                    if (this.#checkEnding(wordEndingCheck)) {
                        wordEnding += word[i];

                        //If the new ending is NOT in the conjuction endigs: get the old inding and stop the function
                    } else {
                        wordEnding = wordEnding.split("").reverse().join("");
                        break;
                    }
                }
            }
        }

        return wordEnding;
    }

    /**
     * Define a word base.
     * @param {string} word - A Greek word
     * @param {string} wordEnding - The word ending
     * @returns {string} The word base
     }
     */
    wordBase(word: string, wordEnding: string): string {
        let wordBaseNumber = wordEnding.length;
        let wordBase = word.slice(0, -wordBaseNumber);

        return wordBase;
    }

    /**
     * Word censorship.
     * @param {string} word - The word
     * @returns {bollean} bollean depends on the word have passed the censorship
     }
     */
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

    /**
     * Sort Array.
     * @param {"desc" | "asc" | "name"} dir - Sor direction
     * @returns {Array} Array with objects where "base: string; words: object; rank: number"
     }
     */
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

    /**
     * Check the word ending.
     * @param {string} ending - Word ending
     * @returns {bollean} bollean depends on the ending is in the greek ending arrays.
     }
     */
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

    /**
     * Create compact full array with word bases and ranks.
     * @param {Array} arr - Array of word arrays where "[string, number]"
     * @returns {Array} Array with objects where "base: string; words: object; rank: number"
     }
     */
    #compactWords(arr: Array<[string, number]>): Array<WordStructure> {
        const wordBases: string[] = [];
        const compactArr: Array<WordStructure> = [];

        arr.forEach((item) => {
            let word = item[0];
            let rank = item[1];
            const wordEnding = this.wordEnding(word);
            const wordBase = this.wordBase(word, wordEnding);

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
}
