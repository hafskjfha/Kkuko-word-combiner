/**
 * Map객체 정렬하는 함수 
 * 
 * 우선순위 : 
 * 
 * 1.value의 값(오름차순)
 * 
 * 2.key의 유니코드 값 (우름차순)
 * @param {Map<string, number>} map 정렬할 map 객체
 * @returns {Map<string, number>} 정렬된 map 객체
 */
function sortMap(map) {
    // Map을 배열로 변환하여 정렬한 후, 다시 Map 객체로 변환
    const sortedEntries = [...map.entries()]
      .sort(([keyA, valueA], [keyB, valueB]) => {
        // 값이 작을 순으로 정렬
        if (valueA !== valueB) {
          return valueA - valueB;
        }
        // 값이 같으면 키를 알파벳 순으로 정렬
        return keyA.localeCompare(keyB);
      });
  
    // 정렬된 배열을 Map으로 변환하여 반환
    return new Map(sortedEntries);
}

/**
 *  단어 조합 매니저 클래스
 */
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
            // 초기 상태일 경우 words 목록에서 가능성 있는 단어를 찾음
            for (const word of this.words) {
                if (this.exist(this.syllable, this.insert(word))) {
                    this
                        .possibleWords
                        .push(word);
                }
            }
        } else {
            // 이미 가능한 단어가 있는 경우, 빠르게 가능한 단어를 필터링
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
                count += this.letterCount[letter] || 0;  // 각 글자의 빈도 합산
            }
            this.wordCount[word] = count;
        }
    }

    countLetter() {
        this.letterCount = {};              // letterCount 초기화
        for (const word of this.words) {
            for (const letter of word) {
                // 각 글자의 빈도수 증가
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
        const result = [];
        for (const [syllable, count] of Object.entries(this.syllableCount)) {
            if (count > 0) {
                result.push(syllable.repeat(count));
            }
        }
        return result.sort().join('');
    }
}

export default CombinationManagerjs;
