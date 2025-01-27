/* tslint:disable */
/* eslint-disable */
export class CombinationManager {
  free(): void;
  constructor();
  /**
   * @param {(string)[]} new_words
   */
  add_words(new_words: (string)[]): void;
  /**
   * @param {string} syllable
   */
  add_syllable(syllable: string): void;
  count_letter(): void;
  /**
   * @returns {(string)[]}
   */
  get_bests(): (string)[];
  /**
   * @returns {string}
   */
  remainstr(): string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_combinationmanager_free: (a: number, b: number) => void;
  readonly combinationmanager_new: () => number;
  readonly combinationmanager_add_words: (a: number, b: number, c: number) => void;
  readonly combinationmanager_add_syllable: (a: number, b: number, c: number) => void;
  readonly combinationmanager_count_letter: (a: number) => void;
  readonly combinationmanager_get_bests: (a: number) => Array;
  readonly combinationmanager_remainstr: (a: number) => Array;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __externref_table_alloc: () => number;
  readonly __externref_drop_slice: (a: number, b: number) => void;
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
