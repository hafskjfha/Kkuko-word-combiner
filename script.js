import init, { CombinationManager } from './wasm/pkg/wasm.js';
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
let pach=''
fetch("https://raw.githubusercontent.com/hafskjfha/Kkuko-word-combiner/main/patchnote.txt")
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.text();
  })
  .then(data => {
    pach=data
    console.log('good'); // 여기서 텍스트 파일의 내용을 출력하거나 처리합니다.
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
// 사용 예시
const url6 = 'https://raw.githubusercontent.com/hafskjfha/Kkuko-word-combiner/main/len6_words_listA.txt';
fetchTextFile6(url6).then(() => {
    console.log('a6'); // 가져온 단어 리스트를 출력
});

const url5 = 'https://raw.githubusercontent.com/hafskjfha/Kkuko-word-combiner/main/len5_words_list2.txt';
fetchTextFile5(url5).then(() => {
    console.log('a5'); // 가져온 단어 리스트를 출력
});

var modal = document.getElementById("Modal");
var btn = document.getElementById("modalBtn");
var span = document.getElementsByClassName("close")[0];
var modalContent = document.getElementById("modalContent");
btn.onclick = function() {
    modalContent.innerHTML = pach;
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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


function makedata(manager1){
    let result6 = [];
    if (manager1.has_possible_word()){
        while (manager1.has_possible_word()){
            manager1.counts();
            const best = manager1.get_best_and_remove();
            result6.push(best);
            manager1.find_possible_words();
        }

    }
    else{
        result6=['No possible words found.'];
    }
    const manager2 = new CombinationManager(manager1.remainstr(), dictionary5);
    manager2.find_possible_words();
    let result5 = [];
    if (manager2.has_possible_word()){
        while (manager2.has_possible_word()){
            manager2.counts();
            const best = manager2.get_best_and_remove();
            result5.push(best);
            manager2.find_possible_words();
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
    let list6_len = WordList6.length;
    let lis5_len = WordList5.length;
    if (WordList6[0]==='No possible words found.'){
        list6_len-=1;
    }
    if (WordList5[0]==='No possible words found.'){
        lis5_len-=1;
    }
    const k1 = (list6_len*4) + (lis5_len*3); //낱장 갯수
    const k2 = Math.floor(list6_len*0.857 + lis5_len*0.714); //일반 휘장 상자
    const k3 = Math.floor(list6_len*0.4 + lis5_len*0.333); //고급 휘장 상자
    const k4 = Math.floor(list6_len*0.467 + lis5_len*0.389); //일반 글자 조각
    const k5 = Math.floor(list6_len*0.233 + lis5_len*0.194); //고급 글자 조각


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

    const FunTextContent = document.getElementById('output1')
    FunTextContent.innerHTML = `낱장 갯수(확정): ${k1} <br>일반 휘장 상자(기댓값): ${k2} <br>고급 휘장 상자(기댓값): ${k3} <br>일반 글자 조각(기댓값): ${k4} <br>고급 글자 조각(기댓값): ${k5}`;

}


function processing(mode, str) {
    const manager = new CombinationManager(str, dictionary6);
    manager.find_possible_words();
    const [wordList6, wordList5, remainingStringa] = makedata(manager);
    outdata(wordList6, wordList5, remainingStringa, mode);
}

var spinnerOverlay = document.getElementById('spinnerOverlay');
spinnerOverlay.style.display='none';

function submit1() {
    const jokakNormal = document.getElementById("jokak-normal").value.replace(/\s+/g, '');
    var spinnerOverlay = document.getElementById('spinnerOverlay');
    spinnerOverlay.style.display = 'flex';
    setTimeout(() => {
        try {
            processing('normal',jokakNormal);
          } catch (error) {
            console.error('An error occurred:', error);
          } finally {
            spinnerOverlay.style.display = 'none';
        }
    }, 1);
}

function submit2() {
    const jokakGogp = document.getElementById("jokak-gogp").value.replace(/\s+/g, '');
    var spinnerOverlay = document.getElementById('spinnerOverlay');
    spinnerOverlay.style.display = 'flex';
    setTimeout(() => {
        try {
            processing('gogp',jokakGogp);
          } catch (error) {
            console.error('An error occurred:', error);
          } finally {
            spinnerOverlay.style.display = 'none';
        }
    }, 1);
}

function submit3() {
    const jokakRare = document.getElementById("jokak-rare").value.replace(/\s+/g, '');
    var spinnerOverlay = document.getElementById('spinnerOverlay');
    spinnerOverlay.style.display = 'flex';
    setTimeout(() => {
        try {
            processing('rare',jokakRare);
          } catch (error) {
            console.error('An error occurred:', error);
          } finally {
            spinnerOverlay.style.display = 'none';
        }
    }, 1);
}
