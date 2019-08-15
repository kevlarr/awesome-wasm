# Awesome Wasm


1. A brief history of the (JavaScript) universe
    - Need for scripting, fully interpreted language was fine
    - JIT, optimization cycles to improve runtime performance
    - asm.js 'subset' designed to take advantage of the optimization techniques, but parsing/optimizing still slow

2. What problems remained
    - Parsing was still a very time consuming process...
    - ... as were the runtime optimizers
    - ... predictability/determinism of optimizations...?
    - TODO but why start with C/++?

3. WebAssembly MVP
    - Streaming
        - Parsing file before fully loaded
        - Parallelization..?
    - Sandboxing
        - Linear memor
        - Embedded in host that grants 'abilities'


4. Future directionss
    - Host bindings (direct, efficient access to Web APIs and DOM)
    - Non-web hosts, including WASI


---

Game of Life

- want FPS count
- interactive controls for...
    - cell size
    - grid size passed through to wasm?






> highly computational tasks that involve playing with numbers and memory<sup>1</sup>

"not the death of JS because..." -> future access to dom/web APIs


## Targets


### Web


### Embedded


## Performance


### Speed tests

TODO: summarize benchmarks against JS (desktop and mobile)


### Memory footprint

TODO: summary resource consumption against JS (desktop and mobile)


## Languages

https://github.com/AssemblyScript/assemblyscript


## Future

### Browser

Web APIs, DOM, etc.


### Non-web hosts

[WASI](https://hacks.mozilla.org/2019/03/standardizing-wasi-a-webassembly-system-interface/)
[Lucet](https://www.fastly.com/blog/announcing-lucet-fastly-native-webassembly-compiler-runtime)


## References
<sup>1</sup>https://medium.com/@torch2424/webassembly-is-fast-a-real-world-benchmark-of-webassembly-vs-es6-d85a23f8e193
<sup>2</sup>[White paper](https://github.com/WebAssembly/spec/blob/master/papers/pldi2017.pdf)
<sup>3</sup>https://www.youtube.com/watch?v=pBYqen3B2gc
https://www.smashingmagazine.com/2017/05/abridged-cartoon-introduction-webassembly/
https://hacks.mozilla.org/2017/02/a-cartoon-intro-to-webassembly/
