class CombinationManagerjs {
    constructor(syllable = '', words = []) {
        this.syllable = syllable;
        this.words = words;
        this.possibleWords = [];
        this.letterCount = {};
        this.wordCount = {};
    }

    getBestAndRemove() {
        const best = this.getBest();
        this.deleteWord(best);
        return best;
    }

    deleteWord(word) {
        let deleted = this.syllable;
        for (const char of word) {
            deleted = deleted.replace(char, '');
        }
        this.syllable = deleted;
    }

    getBest() {
        return Object
            .keys(this.wordCount)
            .reduce(
                (a, b) => this.wordCount[a] < this.wordCount[b]
                    ? a
                    : b
            );
    }

    counts() {
        this.countLetter();
        this.countWord();
    }

    findPossibleWords() {
        if (this.possibleWords.length === 0) {
            for (const word of this.words) {
                if (this.exist(this.syllable, this.insert(word))) {
                    this
                        .possibleWords
                        .push(word);
                }
            }
        } else {
            this.fastFindPossibleWords();
        }
    }

    hasPossibleWord() {
        return this.possibleWords.length > 0;
    }

    countWord() {
        this.wordCount = {};
        for (const word of this.possibleWords) {
            let count = 0;
            for (const letter of word) {
                count += this.letterCount[letter] || 0;
            }
            this.wordCount[word] = count;
        }
    }

    countLetter() {
        this.letterCount = {};
        for (const word of this.words) {
            for (const letter of word) {
                this.letterCount[letter] = (this.letterCount[letter] || 0) + 1;
            }
        }
    }

    fastFindPossibleWords() {
        const temp = [];
        for (const word of this.possibleWords) {
            if (this.exist(this.syllable, this.insert(word))) {
                temp.push(word);
            }
        }
        this.possibleWords = temp;
    }

    insert(arr1) {
        const arr = arr1.split('');
        for (let i = 1; i < arr.length; i++) {
            const standard = arr[i];
            let aux = i - 1;
            while (aux >= 0 && standard < arr[aux]) {
                arr[aux + 1] = arr[aux];
                aux--;
            }
            arr[aux + 1] = standard;
        }
        return arr.join('');
    }

    exist(syllable, word) {
        let count = 0;
        for (const s of syllable) {
            if (s === word[count]) {
                count++;
            }
            if (count === word.length) {
                return true;
            }
        }
        return false;
    }

    remainstr() {
        return this.syllable;
    }
}

export default CombinationManagerjs;