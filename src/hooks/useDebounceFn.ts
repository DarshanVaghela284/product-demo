export function useDebounceFn(fn: (value: string) => void, delay: number) {
    let timer: ReturnType<typeof setTimeout>;
    return (value: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(value);
        }, delay);
    };
}