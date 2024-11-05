class CombinationManager {
    constructor(syllable = '', words = []) {
        this.syllable = syllable;
        this.words = words;
        this.possibleWords = [];
        this.letterCount = {};
        this.wordCount = {};
        this.wordLetterCounts = this.words.map(word => this.countLetters(word));
    }

    getBestAndRemove() {
        const best = this.getBest();
        if (best) {
            this.deleteWord(best);
        }
        return best;
    }

    deleteWord(word) {
        for (const char of word) {
            this.syllable = this.syllable.replace(char, '');
        }
    }

    getBest() {
        // 가장 높은 점수를 가진 단어를 반환
        return Object.keys(this.wordCount).reduce((a, b) => this.wordCount[a] > this.wordCount[b] ? a : b, null);
    }

    counts() {
        this.countLetter();
        this.countWord();
    }

    findPossibleWords() {
        this.possibleWords = [];
        for (const word of this.words) {
            if (this.canFormWord(this.syllable, word)) {
                this.possibleWords.push(word);
            }
        }
    }

    canFormWord(syllable, word) {
        let tempSyllable = syllable;
        for (const char of word) {
            if (!tempSyllable.includes(char)) {
                return false;
            }
            tempSyllable = tempSyllable.replace(char, '');
        }
        return true;
    }

    hasPossibleWord() {
        return this.possibleWords.length > 0;
    }

    countWord() {
        this.wordCount = {};
        for (const word of this.possibleWords) {
            const letterCounts = this.wordLetterCounts[this.words.indexOf(word)];
            let score = 0;
            for (const [letter, count] of Object.entries(letterCounts)) {
                score += (this.letterCount[letter] || 0) * count; // 빈도에 따른 가중치
            }
            this.wordCount[word] = score;
        }
    }

    countLetter() {
        this.letterCount = {};
        for (const letter of this.syllable) {
            this.letterCount[letter] = (this.letterCount[letter] || 0) + 1;
        }
    }

    countLetters(word) {
        const letterCount = {};
        for (const letter of word) {
            letterCount[letter] = (letterCount[letter] || 0) + 1;
        }
        return letterCount;
    }

    remainstr() {
        return this.syllable;
    }
}



let dictionary6 = [];
async function fetchTextFile6(url) {
    try {
        const response = await fetch(url);
        //console.log(response)
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const text = await response.text();
        dictionary6 = text
            .split('\n')
            .map(word => word.trim())
            .filter(word => word.length > 0);
        return dictionary6;
    } catch (error) {
        console.error('Fetch operation failed:', error);
        return [];
    }
}
const url6 = 'https://raw.githubusercontent.com/hafskjfha/Kkuko-word-combiner/main/len6_words_listA.txt';
const syllable = "가객객객객것게게격겹고곡곡곤곶관관교구구굴기기기끌끔나나나나나나나난낭넘네녀년느는니다단단단담대대댕댕더독동동두둑둑득디딘딱뛰라락래랙램렌령루르름리리리리리립릿마마마멍며면면면명묘묘문바바바박배배뱀버범범법보복봄봇불불브브빛뻑사사사사사샅생선섯성세션션쇼수수수순슛스스스스스스슴시식싱아아아아악암압앙약업에오요육을을을의의이이이인잇잔잡쟌정정제족족종좋죄죄주준쥭즘즙지지짚찜차차차찬촉츠층층층층층치칙친친컬코코코크크클키킨킵타타타탈탕터토톤톤톤트트트틀틀틴파파판팬펠포폰푸풀품프프프한한합핸험험호화화화화";

async function initializeManager() {
    await fetchTextFile6(url6); // fetch 완료까지 대기

    const manager = new CombinationManager(syllable, dictionary6);

    console.log(manager.hasPossibleWord());
    console.log(dictionary6.length);

    manager.findPossibleWords();

    if (manager.hasPossibleWord()) {
        manager.countWord();
        console.log(manager.getBestAndRemove());
        console.log(manager.remainstr());
        manager.findPossibleWords();
    }
}

// 함수 실행
initializeManager();

