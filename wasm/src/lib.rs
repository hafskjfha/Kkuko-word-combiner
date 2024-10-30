use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct CombinationManager {
    syllable: String,
    words: Vec<String>,
    possible_words: Vec<String>,
    letter_count: HashMap<char, usize>,
    word_count: HashMap<String, usize>,
}

#[wasm_bindgen]
impl CombinationManager {
    pub fn new(syllable: String, words: Vec<String>) -> Self {
        Self {
            syllable,
            words,
            possible_words: Vec::new(),
            letter_count: HashMap::new(),
            word_count: HashMap::new(),
        }
    }

    pub fn has_possible_word(&self) -> bool {
        !self.possible_words.is_empty()
    }

    pub fn count_word(&mut self) {
        self.word_count.clear(); // 기존 데이터를 지웁니다.

        for word in &self.possible_words {
            let mut count: usize = 0;
            for letter in word.chars() {
                count += self.letter_count.get(&letter).copied().unwrap_or(0);
            }
            self.word_count.insert(word.clone(), count);
        }
    }

    pub fn count_letter(&mut self) {
        self.letter_count.clear(); // 기존 데이터를 지웁니다.

        for word in &self.words {
            for letter in word.chars() {
                *self.letter_count.entry(letter).or_insert(0) += 1;
            }
        }
    }

    fn insert(arr1: &str) -> String {
        let mut arr: Vec<char> = arr1.chars().collect();
        arr.sort(); // Timsort 사용으로 O(n log n) 성능
        arr.iter().collect()
    }

    pub fn remainstr(&mut self){
        self.syllable
    }

    pub fn exist(&self, syllable: &str, word: &str) -> bool {
        let mut count: usize = 0;

        for s in syllable.chars() {
            if s == word.chars().nth(count).unwrap_or('\0') {
                count += 1;
            }
            if count == word.len() {
                return true;
            }
        }
        false
    }

    pub fn fast_find_possible_words(&mut self) {
        let mut temp: Vec<String> = Vec::new(); 

        for word in &self.possible_words {
            let inserted_word: str = self.insert(word);

            
            if self.exist(&self.syllable, &inserted_word) {
                temp.push(word.clone()); 
            }
        }

        self.possible_words = temp; 
    }

    pub fn counts(&mut self){
        self.count_letter();
        self.count_word();
    }

    pub fn delete_word(&mut self, word: &str) {
        let mut deleted = self.syllable.clone(); 

        for char in word.chars() {
            deleted = deleted.replace(char, ""); 
        }

        self.syllable = deleted; 
    }

    pub fn get_best(&self) -> Option<String> {
        let mut best_word: Option<String> = None;
        let mut min_count: usize = usize::MAX; 

        for (word, &count) in &self.word_count {
            if count < min_count {
                min_count = count;
                best_word = Some(word.clone()); 
            }
        }

        best_word
    }

    pub fn find_possible_words(&mut self) {
        if self.possible_words.is_empty() {
            for word in &self.words {
                let inserted_word: str = self.insert(word); 

                if self.exist(&self.syllable, &inserted_word) {
                    self.possible_words.push(word.clone()); 
                }
            }
        } else {
            self.fast_find_possible_words();
        }
    }

    pub fn get_best_and_remove(&mut self){
        let mut best: Option<String> = self.get_best();
        self.delete_word(best);
        best
    }

}