/* tslint:disable */
/* eslint-disable */
export class CombinationManager {
  free(): void;
  /**
   * @param {string} syllable
   * @param {(string)[]} words
   */
  constructor(syllable: string, words: (string)[]);
  /**
   * @returns {string | undefined}
   */
  get_best_and_remove(): string | undefined;
  counts(): void;
  find_possible_words(): void;
  /**
   * @returns {boolean}
   */
  has_possible_word(): boolean;
  /**
   * @returns {string}
   */
  remainstr(): string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_combinationmanager_free: (a: number, b: number) => void;
  readonly combinationmanager_new: (a: number, b: number, c: number, d: number) => number;
  readonly combinationmanager_get_best_and_remove: (a: number) => Array;
  readonly combinationmanager_counts: (a: number) => void;
  readonly combinationmanager_find_possible_words: (a: number) => void;
  readonly combinationmanager_has_possible_word: (a: number) => number;
  readonly combinationmanager_remainstr: (a: number) => Array;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
