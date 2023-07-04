const setItem = <T>(key: string, value: T) => {
    if (typeof value === 'string') localStorage.setItem(key, value);
    else localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string) => {
    const val = localStorage.getItem(key) || '';
    if (typeof val === 'string') return val;
    return JSON.parse(val);
};

const delItem = (key: string) => {
    localStorage.removeItem(key);
};

const clear = () => {
    localStorage.clear();
};

export const localCache = { setItem, getItem, delItem, clear };
