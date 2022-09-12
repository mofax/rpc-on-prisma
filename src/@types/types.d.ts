type POJO<T extends any> = Record<string, T>;
type JSON_NATIVE = string | number | boolean | null | POJO<unknown>;
