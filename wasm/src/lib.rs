use std::collections::HashMap;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Debug)]
pub struct CombinationManager {
    syllable: String,
    words: Vec<String>,
    possible_words: Vec<String>,
    letter_count: HashMap<char, usize>,
    word_count: HashMap<String, usize>,
}

#[wasm_bindgen]
impl CombinationManager {
    #[wasm_bindgen(constructor)]
    pub fn new(syllable: String, words: Vec<String>) -> CombinationManager {
        CombinationManager {
            syllable,
            words,
            possible_words: Vec::new(),
            letter_count: HashMap::new(),
            word_count: HashMap::new(),
        }
    }

    #[wasm_bindgen]
    pub fn get_best_and_remove(&mut self) -> Option<String> {
        if let Some(best) = self.get_best() {
            self.delete_word(&best);
            Some(best)
        } else {
            None
        }
    }

    fn delete_word(&mut self, word: &str) {
        let mut deleted: String = self.syllable.clone();
        for ch in word.chars() {
            deleted = deleted.replacen(ch, "", 1);
        }
        self.syllable = deleted;
    }

    fn get_best(&self) -> Option<String> {
        self.word_count.iter().min_by_key(|(_, &count)| count).map(|(word, _)| word.clone())
    }

    #[wasm_bindgen]
    pub fn counts(&mut self) {
        self.count_letter();
        self.count_word();
    }

    #[wasm_bindgen]
    pub fn find_possible_words(&mut self) {
        if self.possible_words.is_empty() {
            for word in &self.words {
                if self.exist(&self.syllable, &self.insert(word.clone())) {
                    self.possible_words.push(word.clone());
                }
            }
        } else {
            self.fast_find_possible_words();
        }
    }

    #[wasm_bindgen]
    pub fn has_possible_word(&self) -> bool {
        !self.possible_words.is_empty()
    }

    fn count_word(&mut self) {
        self.word_count.clear();
        for word in &self.possible_words {
            let mut count: usize = 0;
            for letter in word.chars() {
                count += *self.letter_count.get(&letter).unwrap_or(&0);
            }
            self.word_count.insert(word.clone(), count);
        }
    }

    fn count_letter(&mut self) {
        self.letter_count.clear();
        for word in &self.words {
            for letter in word.chars() {
                *self.letter_count.entry(letter).or_insert(0) += 1;
            }
        }
    }

    fn fast_find_possible_words(&mut self) {
        let mut temp: Vec<String> = Vec::new();
        for word in &self.possible_words {
            if self.exist(&self.syllable, &self.insert(word.clone())) {
                temp.push(word.clone());
            }
        }
        self.possible_words = temp;
    }

    fn insert(&self, word: String) -> String {
        let mut chars: Vec<char> = word.chars().collect();
        chars.sort_unstable();
        chars.into_iter().collect()
    }

    fn exist(&self, syllable: &str, word: &str) -> bool {
        let mut count: usize = 0;
        let word_chars: Vec<char> = word.chars().collect(); 
    
        for s in syllable.chars() {
            if count < word_chars.len() && s == word_chars[count] {
                count += 1;
            }
            if count == word_chars.len() {
                return true;
            }
        }
        false
    }

    #[wasm_bindgen]
    pub fn remainstr(&self) -> String {
        self.syllable.clone()
    }
}
