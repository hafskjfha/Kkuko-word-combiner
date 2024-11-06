/**
 * 단어 조합 매니저
 * 
 * @param {string} syllable 글자
 * @param {string[]} words 사용가능한 단어 목록
 */
class CombinationManagerjs {
    constructor(syllable = '', words = []) {
        // 초기화
        this.syllable = syllable;           // 음절(문자열)을 저장
        this.words = words;                 // 전체 단어 리스트를 저장
        this.possibleWords = [];            // 가능한 단어 목록을 저장
        this.letterCount = {};              // 각 글자의 빈도수를 저장
        this.wordCount = {};                // 각 단어의 점수를 저장
    }

    // 가장 적합한 단어를 찾아 반환하고, syllable에서 해당 단어를 삭제
    getBestAndRemove() {
        const best = this.getBest();
        this.deleteWord(best);              
        return best;                        
    }

    // syllable에서 주어진 단어의 문자를 삭제
    deleteWord(word) {
        let deleted = this.syllable;        
        for (const char of word) {
            deleted = deleted.replace(char, '');  
        }
        this.syllable = deleted;            
    }

    // 가장 높은 점수를 가진 단어 반환
    getBest() {
        return Object
            .keys(this.wordCount)           
            .reduce(
                (a, b) => this.wordCount[a] < this.wordCount[b] // 점수가 낮을수록 우선
                    ? a
                    : b
            );
    }

    // 각 글자와 단어의 빈도수 카운팅
    counts() {
        this.countLetter();                 
        this.countWord();                   
    }

    // syllable을 포함할 수 있는 가능한 단어 찾기
    findPossibleWords() {
        if (this.possibleWords.length === 0) {
            // 초기 상태일 경우 words 목록에서 가능성 있는 단어를 찾음
            for (const word of this.words) {
                if (this.exist(this.syllable, this.insert(word))) {
                    this.possibleWords.push(word); // 가능한 단어 추가
                }
            }
        } else {
            // 이미 가능한 단어가 있는 경우, 빠르게 가능한 단어를 필터링
            this.fastFindPossibleWords();
        }
    }

    // 가능한 단어가 존재하는지 확인
    hasPossibleWord() {
        return this.possibleWords.length > 0;
    }

    // 가능한 단어의 점수 계산
    countWord() {
        this.wordCount = {};                // wordCount 초기화
        for (const word of this.possibleWords) {
            let count = 0;
            for (const letter of word) {
                count += this.letterCount[letter] || 0;  // 각 글자의 빈도 합산
            }
            this.wordCount[word] = count;    // 단어별 점수 저장
        }
    }

    // 각 글자의 빈도수 계산
    countLetter() {
        this.letterCount = {};              // letterCount 초기화
        for (const word of this.words) {
            for (const letter of word) {
                // 각 글자의 빈도수 증가
                this.letterCount[letter] = (this.letterCount[letter] || 0) + 1;
            }
        }
    }

    // 가능한 단어 리스트에서 syllable에 존재하는 단어만 유지
    fastFindPossibleWords() {
        const temp = [];
        for (const word of this.possibleWords) {
            if (this.exist(this.syllable, this.insert(word))) {
                temp.push(word);             // syllable에 존재하는 단어만 추가
            }
        }
        this.possibleWords = temp;           // 필터링된 리스트로 갱신
    }

    // 문자열을 알파벳 순으로 정렬하여 반환
    insert(arr1) {
        return arr1.split('').sort().join('');
    }

    // syllable에 특정 word가 순서대로 존재하는지 확인
    exist(syllable, word) {
        let count = 0;
        for (const s of syllable) {
            if (s === word[count]) {         // syllable의 문자와 word의 문자가 일치하는 경우
                count++;
            }
            if (count === word.length) {     // word의 모든 문자가 매칭되는 경우
                return true;
            }
        }
        return false;                        // 일치하지 않으면 false 반환
    }

    // 현재 남아있는 syllable을 반환
    remainstr() {
        return this.syllable;
    }
}

export default CombinationManagerjs;
