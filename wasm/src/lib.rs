use std::collections::{HashMap, BTreeMap};
use wasm_bindgen::prelude:: *;

fn sort_map(map : BTreeMap<String, u32>) -> BTreeMap<String, u32> {
    let mut entries: Vec<_> = map
        .into_iter()
        .collect();
    entries.sort_by(| (key_a, value_a), (key_b, value_b) | {
        value_a
            .cmp(value_b)
            .then_with(|| key_a.cmp(key_b))
    });
    entries
        .into_iter()
        .collect()
}

#[wasm_bindgen]
pub struct CombinationManager {
    syllable: String,
    words: Vec<String>,
    possible_words: Vec<String>,
    letter_count: HashMap<char, u32>,
    word_count: BTreeMap<String, u32>,
    syllable_count: HashMap<char, u32>
}

#[wasm_bindgen]
impl CombinationManager {
    #[wasm_bindgen(constructor)]
    pub fn new() -> CombinationManager {
        let mut manager: CombinationManager = CombinationManager {
            syllable : String::new(),
            words: Vec::new(),
            possible_words: Vec::new(),
            letter_count: HashMap::new(),
            word_count: BTreeMap::new(),
            syllable_count: HashMap::new()
        };
        manager.count_letter();
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

    fn init(& mut self) {
        self.count_syllable();
        self.find_possible_words();
        self.count_word();
        self.word_count = sort_map(self.word_count.clone());
    }

    #[wasm_bindgen]
    pub fn get_bests(& mut self) -> Vec<String> {
        let mut result: Vec<String> = Vec::new();

        // `word_count`의 키를 복사한 벡터를 생성하여 반복합니다.
        let words_to_check: Vec<String> = self
            .word_count
            .keys()
            .cloned()
            .collect();

        for word in words_to_check {
            if self.exist(& word) {
                result.push(word.clone());
                self.delete_word(& word);
                self
                    .word_count
                    .remove(& word);
            }
        }

        if result.is_empty() {
            result.push("No possible words found.".to_string());
        }
        result
    }

    fn delete_word(& mut self, word : &str) {
        for c in word.chars() {
            if let Some(count) = self.syllable_count.get_mut(& c) { * count -= 1;
            }
        }
    }

    fn find_possible_words(& mut self) {
        if self.possible_words.is_empty() {
            for word in & self.words {
                if self.exist(word) {
                    self
                        .possible_words
                        .push(word.clone());
                }
            }
        } else {
            let temp: Vec<String> = self
                .possible_words
                .iter()
                .filter(| word | self.exist(word))
                .cloned()
                .collect();
            self.possible_words = temp;
        }
    }

    fn count_word(& mut self) {
        self
            .word_count
            .clear();
        for word in & self.possible_words {
            let count: u32 = word
                .chars()
                .map(| c | * self.letter_count.get(& c).unwrap_or(& 0))
                .sum();
            self
                .word_count
                .insert(word.clone(), count);
        }
    }

    fn count_letter(& mut self) {
        self
            .letter_count
            .clear();
        for word in & self.words {
            for c in word.chars() { * self
                    .letter_count
                    .entry(c)
                    .or_insert(0) += 1;
            }
        }
    }

    fn count_syllable(& mut self) {
        self
            .syllable_count
            .clear();
        for c in self.syllable.chars() { * self
                .syllable_count
                .entry(c)
                .or_insert(0) += 1;
        }
    }

    fn exist(& self, word : &str) -> bool {
        let mut temp: HashMap<char, u32> = HashMap::new();
        for c in word.chars() { * temp
                .entry(c)
                .or_insert(0) += 1;
        }

        for (c, & count) in & temp {
                if  * self.syllable_count.get(c).unwrap_or(& 0) < count {
                    return false;
                }
            }
        true
}
}
