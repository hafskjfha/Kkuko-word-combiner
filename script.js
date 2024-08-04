function maxWordsFromString(string, dictionary,mode) {
    // 문자열과 사전에서 문자의 빈도를 계산하는 함수
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

    // 각 단어에 대해 만들 수 있는 최대 횟수 계산
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

    // 단어별 최대 빈도를 기반으로 정렬
    wordCounts.sort((a, b) => b.count - a.count);

    const result = [];
    
    // 결과 단어 생성 및 문자열에서 문자 제거
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

    const wordCountsResult = {};
    for (const word of result) {
        if (wordCountsResult[word]) {
            wordCountsResult[word]++;
        } else {
            wordCountsResult[word] = 1;
        }
    }

    // 결과를 HTML에 출력
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    for (const word in wordCountsResult) {
        const p = document.createElement('p');
        p.textContent = `단어 '${word}'를 ${wordCountsResult[word]}번 만들 수 있습니다.`;
        outputDiv.appendChild(p);
    }

    // 남은 문자열 출력
    let remainingString = '';
    for (const char in stringCount) {
        remainingString += char.repeat(stringCount[char]);
    }
    const remainingP = document.createElement('p');
    remainingP.textContent = `남은 문자열: '${remainingString}'`;
    outputDiv.appendChild(remainingP);
    
    const ReturnList=[]
    for (const word in wordCountsResult){
        for (let i=0;i<wordCountsResult[word];i++){
            ReturnList.push(word);
        }
        
    }
    return ReturnList;
}

// 예제 사용법
//const string = "가가가가가가가나나나나나나ㄷ다다다다다다라라라라";
//const k=maxWordsFromString(string, dictionary);
//console.log(k)


function submit1(){
    var strings= document.getElementById('jokak-normal').value;
    const dictionary = ["가가가가가나", "가나다가나다"];
    maxWordsFromString(strings, dictionary,'normal');
    
}

function submit2(){
    var strings= document.getElementById('jokak-gogp').value;
    const dictionary = ["가가가가가나", "가나다가나다"];
    maxWordsFromString(strings, dictionary,'gogp');
    
}

function submit3(){
    var strings= document.getElementById('jokak-rare').value;
    const dictionary = ["가가가가가나", "가나다가나다"];
    maxWordsFromString(strings, dictionary,'rare');
    
}

function processHtml() {
    var htmlString = document.getElementById('htmls-input').value;
    const outputDiv = document.getElementById('jokak-normal');
    // DOMParser를 사용하여 HTML 문자열을 파싱
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    let jswq = ""; // 일반
    let jjswq = ""; // 고급
    let jjjswq = ""; // 희귀

    // 특정 클래스의 div 요소들을 선택
    const dressItems = doc.querySelectorAll('div.dress-item.expl-mother');

    // 각 요소에 대해 처리
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
    //const remainingP = document.createElement('p');
    if (jswq===""){
        jswq="글자조각없음";
    }
    outputDiv.value = jswq;
  //  outputDiv.appendChild(remainingP);
    document.getElementById('htmls-input').value="";
    return {
        jswq,
        jjswq,
        jjjswq
    };
}

// 사용 예제
//const htmlString = `<html>...your HTML here...</html>`;
//const result = processHtml(htmlString);
//console.log(result.jswq);
//console.log(result.jjswq);
//console.log(result.jjjswq);

