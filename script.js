let dictionary6 = ["가가가가가나", "가나다가나다", "가가가가가나", "가나다가나다"]; // 샘플 단어 리스트
let dictionary5 = ["가가가가가", "가나다가나", "가가가가가", "가나다가나"]; // 샘플 단어 리스트

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

function maxWordsFromString(string, dictionary) {
    function countCharacters(str) {
        const count = {};
        for (const char of str) {
            if (count[char]) {
                count[char]++;
            } else {
                count[char] = 1;
            }
        }
        return count;
    }

    const stringCount = countCharacters(string);
    const wordCounts = [];

    for (const word of dictionary) {
        const wordCount = countCharacters(word);
        let minCount = Infinity;
        for (const char in wordCount) {
            if (!stringCount[char] || stringCount[char] < wordCount[char]) {
                minCount = 0;
                break;
            }
            minCount = Math.min(minCount, Math.floor(stringCount[char] / wordCount[char]));
        }
        if (minCount > 0) {
            wordCounts.push({ word: word, count: minCount });
        }
    }

    wordCounts.sort((a, b) => b.count - a.count);

    const result = [];
    
    for (const { word, count } of wordCounts) {
        const wordCount = countCharacters(word);
        for (let i = 0; i < count; i++) {
            let canMakeWord = true;
            for (const char in wordCount) {
                if (stringCount[char] < wordCount[char]) {
                    canMakeWord = false;
                    break;
                }
            }
            if (canMakeWord) {
                for (const char in wordCount) {
                    stringCount[char] -= wordCount[char];
                }
                result.push(word);
            }
        }
    }

    let remainingString = '';
    for (const char in stringCount) {
        remainingString += char.repeat(stringCount[char]);
    }

    return [result, remainingString];
}

function outdata(WordList6, WordList5, remainingStringa) {
    const textBox1 = document.getElementById("textBox1");
    const textBox2 = document.getElementById("textBox2");
    const remainingContainer = document.getElementById("remainingContainer");
  
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
}

function submit1() {
    const jokakNormal = document.getElementById("jokak-normal").value;
    const [wordList6, remainingString] = maxWordsFromString(jokakNormal, dictionary6);
    const wordList5 = wordList6.filter(word => word.length === 5);
    outdata(wordList6, wordList5, remainingString);
}

function submit2() {
    const jokakGogp = document.getElementById("jokak-gogp").value;
    const [wordList6, remainingString] = maxWordsFromString(jokakGogp, dictionary6);
    const wordList5 = wordList6.filter(word => word.length === 5);
    outdata(wordList6, wordList5, remainingString);
}

function submit3() {
    const jokakRare = document.getElementById("jokak-rare").value;
    const [wordList6, remainingString] = maxWordsFromString(jokakRare, dictionary6);
    const wordList5 = wordList6.filter(word => word.length === 5);
    outdata(wordList6, wordList5, remainingString);
}
