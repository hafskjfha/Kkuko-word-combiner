use std::collections::{VecDeque,HashMap};
use indexmap::IndexMap;
use wasm_bindgen::prelude::*;

// 웹에서 사용하는 함수들을 활성화하기 위한 어노테이션
#[wasm_bindgen]
pub struct CombinationManager {
    syllable: String,
    words: Vec<String>,
    possible_words: Vec<String>,
    letter_count: HashMap<char, usize>,
    word_count: IndexMap<String, usize>,
    syllable_count: HashMap<char, usize>,
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
            word_count: IndexMap::new(),
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
        self.init();
    }

    
}