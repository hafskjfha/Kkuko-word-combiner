use std::collections::{VecDeque,HashMap};
use wasm_bindgen::prelude::*;

// 웹에서 사용하는 함수들을 활성화하기 위한 어노테이션
#[wasm_bindgen]
pub struct CombinationManager {
    syllable: String,
    words: Vec<String>,
    possible_words: Vec<String>,
    letter_count: HashMap<char, u64>,
    word_count: HashMap<String, u64>,
    syllable_count: HashMap<char, u64>,
    words_countz:VecDeque<(String, u64)>
}

#[wasm_bindgen]
impl CombinationManager {
    #[wasm_bindgen(constructor)]
    pub fn new() -> CombinationManager{
        let mut manager: CombinationManager = CombinationManager{
            syllable : String::new(),
            words: Vec::new(),
            possible_words: Vec::new(),
            letter_count: HashMap::new(),
            word_count: HashMap::new(),
            syllable_count: HashMap::new(),
            words_countz: VecDeque::new()
        };
        manager
    }

    #[wasm_bindgen]
    pub fn add_words(& mut self, new_words : Vec<String>) {
        self
            .words
            .extend(new_words);
    }

    #[wasm_bindgen]
    pub fn add_syllable(& mut self, syllable : &str) {
        self.syllable = syllable.to_string();
        self.__init();
    }

    #[wasm_bindgen]
    pub fn count_letter(&mut self){
        for &word in &self.words{
            for c in word.chars(){
                *self.letter_count.entry(c).or_insert(0) +=1;
            }
        }
    }

    fn count_syllable(&mut self){
        self.syllable_count.clear();
        for c in self.syllable.chars(){
            *self.syllable_count.entry(c).or_insert(0) +=1;
        }
    }

    fn count_word(&mut self){
        self.word_count.clear();
        for word in &self.possible_words{
            let count:u64=word.chars().map(|c|*self.letter_count.get(&c).unwrap_or(&99999)).sum();
            self.word_count.insert(word.clone(), count)
        }
    }

    fn delete_word(&mut self,word:&str){
        for c in word.chars(){
            *self.syllable_count.get_mut(&c).unwrap() -=1;
        }
        
    }

    fn exist(&self, word:&str)->bool{
        let mut temp:HashMap<char,u64>=HashMap::new();
        for c in word.chars(){
            *temp.entry(c).or_insert(0) +=1;
        }

        for (c,v) in &temp{
            if self.syllable_count.get(c).unwrap_or(&0) <v{
                return false;
            }
        }
        true
    }

    fn sort_map(&mut self){
        let mut sorted:Vec<_>=self.word_count.into_iter().collect();
        sorted.sort_by(|a: &(String, u64), b: &(String, u64)| {
            a.1.cmp(&b.1).then_with(|| a.0.cmp(&b.0))
        });

        for entry in sorted{
            self.words_countz.push_back(entry);
        }
    }

    fn find_possible_words(&mut self){
        if self.possible_words.is_empty(){
            for word in &self.words{
                if self.exist(word){
                    self.possible_words.push(word.clone());
                }
            }
        }else{
            let mut temp: Vec<String>=self
            .possible_words
            .iter()
            .filter(| word | self.exist(word))
            .cloned()
            .collect();
        self.possible_words = temp;

        }
    }

    fn __init(&mut self){
        self.count_syllable();
        self.find_possible_words();
        self.count_word();
        self.sort_map();
    }

    
    
}