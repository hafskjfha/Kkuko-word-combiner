let dictionary6=[];
let dictionary5=[];
async function fetchTextFile6(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        text = await response.text();
        dictionary6 = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        return dictionary6;
    } catch (error) {
        console.error('Fetch operation failed:', error);
        return [];
    }
}
async function fetchTextFile5(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        text = await response.text();
        dictionary5 = text.split('\n').map(word => word.trim()).filter(word => word.length > 0);
        return dictionary5;
    } catch (error) {
        console.error('Fetch operation failed:', error);
        return [];
    }
}
// 사용 예시
const url6 = 'https://raw.githubusercontent.com/hafskjfha/Kkuko-word-combiner/main/len6_words_listA.txt';
fetchTextFile6(url6).then(() => {
    console.log('a6'); // 가져온 단어 리스트를 출력
});

const url5 = 'https://raw.githubusercontent.com/hafskjfha/Kkuko-word-combiner/main/len5_words_list2.txt';
fetchTextFile5(url5).then(() => {
    console.log('a5'); // 가져온 단어 리스트를 출력
});
//let dictionary6 = ["가가가가가나", "가나다가나다", "가가가가가나", "가나다가나다"]; // 샘플 단어 리스트
//let dictionary5 = ["가가가가가", "가나다가나", "가가가가가", "가나다가나"]; // 샘플 단어 리스트

function processHtml() {
    var htmlString = document.getElementById('htmls-input').value;
    const outputDiv1 = document.getElementById('jokak-normal');
    const outputDiv2 = document.getElementById('jokak-gogp');
    const outputDiv3 = document.getElementById('jokak-rare');
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    let jswq = ""; // 일반
    let jjswq = ""; // 고급
    let jjjswq = ""; // 희귀

    const dressItems = doc.querySelectorAll('div.dress-item.expl-mother');

    dressItems.forEach(item => {
        const countText = item.querySelector('div.jt-image.dress-item-image').textContent.trim();
        const tCount = parseInt(countText.replace('x', ''), 10);
        const charName = item.querySelector('div.dress-item-title').textContent.trim();

        if (charName.includes("고급 글자 조각")) {
            const chName = charName.replace("고급 글자 조각 - ", "");
            jjswq += chName.repeat(tCount);
        } else if (charName.includes("희귀 글자 조각")) {
            const chName = charName.replace("희귀 글자 조각 - ", "");
            jjjswq += chName.repeat(tCount);
        } else if (charName.includes("글자 조각")) {
            const chName = charName.replace("글자 조각 - ", "");
            jswq += chName.repeat(tCount);
        }
    });

    if (jswq === "") {
        jswq = "글자조각없음";
    }
    if (jjswq===""){
        jjswq="고급 글자조각 없음"
    }
    if (jjjswq===""){
        jjjswq="희귀 글자조각 없음"
    }
    outputDiv1.value = jswq;
    outputDiv2.value = jjswq;
    outputDiv3.value = jjjswq;
    document.getElementById('htmls-input').value = "";

    return {
        jswq,
        jjswq,
        jjjswq
    };
}

class CombinationManager {
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
        return Object.keys(this.wordCount).reduce((a, b) => this.wordCount[a] < this.wordCount[b] ? a : b);
    }

    counts() {
        this.countLetter();
        this.countWord();
    }

    findPossibleWords() {
        if (this.possibleWords.length === 0) {
            for (const word of this.words) {
                if (this.exist(this.syllable, this.insert(word))) {
                    this.possibleWords.push(word);
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

    remainstr(){
        return this.syllable
    }
}

function makedata(manager1){
    let result6 = [];
    if (manager1.hasPossibleWord()){
        while (manager1.hasPossibleWord()){
            manager1.counts();
            const best = manager1.getBestAndRemove();
            result6.push(best);
            manager1.findPossibleWords();
        }

    }
    else{
        result6=['No possible words found.'];
    }
    //const stingg = ;
    //console.log(dictionary5.slice(0,7))
    const manager2 = new CombinationManager(manager1.remainstr(), dictionary5);
    manager2.findPossibleWords();
    let result5 = [];
    if (manager2.hasPossibleWord()){
        while (manager2.hasPossibleWord()){
            manager2.counts();
            const best = manager2.getBestAndRemove();
            result5.push(best);
            manager2.findPossibleWords();
        }

    }
    else{
        result5=['No possible words found.'];
    }
    const remainingStrings = manager2.remainstr();
    return [result6,result5,remainingStrings];

}



function outdata(WordList6, WordList5, remainingStringa,mode) {
    const textBox1 = document.getElementById("textBox1");
    const textBox2 = document.getElementById("textBox2");
    const remainingContainer = document.getElementById("remainingContainer");
    let invalue=''
    if (mode==='normal'){
        invalue = document.getElementById("jokak-normal");
    }else if(mode==='gogp'){
        invalue = document.getElementById("jokak-gogp");
    }else {
        invalue = document.getElementById("jokak-rare");
    }
  
    textBox1.innerHTML = "";
    textBox2.innerHTML = "";
    remainingContainer.innerHTML = "";

    WordList6.forEach((word, index) => {
        const itemContainer = document.createElement("div");
        itemContainer.className = "itemContainer";
      
        const indexBox = document.createElement("div");
        indexBox.className = "indexBox";
        indexBox.textContent = index + 1;
      
        const textBoxContent = document.createElement("div");
        textBoxContent.className = "textBoxContent";
        textBoxContent.textContent = word;
      
        itemContainer.appendChild(indexBox);
        itemContainer.appendChild(textBoxContent);
        textBox1.appendChild(itemContainer);
    });

    WordList5.forEach((word, index) => {
        const itemContainer = document.createElement("div");
        itemContainer.className = "itemContainer";
      
        const indexBox = document.createElement("div");
        indexBox.className = "indexBox";
        indexBox.textContent = index + 1;
      
        const textBoxContent = document.createElement("div");
        textBoxContent.className = "textBoxContent";
        textBoxContent.textContent = word;
      
        itemContainer.appendChild(indexBox);
        itemContainer.appendChild(textBoxContent);
        textBox2.appendChild(itemContainer);
    });

    const remainingText = document.createElement("p");
    remainingText.textContent = `남은 글자들: ${remainingStringa}`;
    remainingContainer.appendChild(remainingText);
    invalue.value=remainingStringa;
}

function submit1() {
    const jokakNormal = document.getElementById("jokak-normal").value.replace(/\s+/g, '');
    const manager = new CombinationManager(jokakNormal, dictionary6);
    manager.findPossibleWords();
    const [wordList6, wordList5,remainingStringa] = makedata(manager);
    outdata(wordList6, wordList5, remainingStringa,'normal');
}

function submit2() {
    const jokakGogp = document.getElementById("jokak-gogp").value.replace(/\s+/g, '');
    const manager = new CombinationManager(jokakGogp, dictionary6);
    manager.findPossibleWords();
    const [wordList6, wordList5,remainingStringa] = makedata(manager);
    outdata(wordList6, wordList5, remainingStringa,'gogp');
}

function submit3() {
    const jokakRare = document.getElementById("jokak-rare").value.replace(/\s+/g, '');
    const manager = new CombinationManager(jokakRare, dictionary6);
    manager.findPossibleWords();
    const [wordList6, wordList5,remainingStringa] = makedata(manager);
    outdata(wordList6, wordList5, remainingStringa,'rare');
}
