# Awesome Wasm

**tl;dr:** WebAssembly (Wasm) is now the official second language<sup>1</sup> of the web world,
offering a compact and performant<sup>2</sup> complement to JavaScript.

> <sup>1</sup> Well, mostly official: https://caniuse.com/#feat=wasm
>
> <sup>2</sup> Load, parse, and execution times are often ~20%-30% faster

## Background

<sub>Or, *A (Comically Brief, Incomplete, and Quite Possibly Inaccurate) History of Client-side Code*</sub>

In **The Beginning**, there was static text.

**1995**

JavaScript was created to give designers a 'behavior layer'.

**1996-2007**

JavaScript remained fully interpreted (read: slow) and this was generally fine,
because Java applets were originally intended to provide a 'performant' option.

**2008**

Google released V8, which introduced the first JIT compiler for JavaScript and
set JavaScript on a path toward remarkably fast execution speeds<sup>3</sup>.

**2011**

Google released Portable Native Client (PNaCl, pronouned "pinnacle"), offering a compile target
for C/C++ with the goal of achieving near-native speed in the browser.

**2013**

Mozilla released asm.js as a compile target for C that, unlike PNaCl, leveraged the existing
JavaScript VMs to execute more optimized code while 'bypassing' the garbage collector.


<sup>3</sup>
<small>Lin Clark wrote [an excellent article](https://hacks.mozilla.org/2017/02/a-crash-course-in-just-in-time-jit-compilers/) describing how these compilers work at a high level</small>


### Beyond JIT

To summarize some trade-offs:

> [JIT] makes JavaScript run faster by monitoring the code as it’s running it and sending hot code paths to be optimized.
> This has resulted in many-fold performance improvements for most JavaScript applications.
>
> Even with these improvements, though, the performance of JavaScript can be unpredictable.
> And to make things faster, the JIT has added some overhead during runtime, including:
>
> - optimization and deoptimization
> - memory used for the monitor’s bookkeeping and recovery information for when bailouts happen
> - memory used to store baseline and optimized versions of a function

While JavaScript had now become much faster (especially as other browser vendors introduced their own compilers and they competed for speed),
Google and Mozilla independently explored different paths for ta





**2011**


- 2013: Mozilla released asm.js as a compile target for C (performance aided by optimizers and 'no' GC)








### Why Not Stop There?

JavaScript was now *fast* (and asm.js even faster), but...

... parsing a JS file into an AST is still time-consuming, and...

... the browsers' optimization techniques still incur runtime overhead.

<!--Basically, asm.js was a great experiment for squeezing even more speed out of the JavaScript VMs-->
<!--... predictability/determinism of optimizations...?-->

--- 

## adf

<!--asm.js and NaCl were great experiments, but in 2015 engineers from Mozilla, Microsoft, Apple, and Google-->
<!--began to work on a joint prototype. By 2017 they had settled -->


From the source:

> There are two main benefits WebAssembly provides:
>
>   - The kind of binary format being considered for WebAssembly can be natively decoded much faster than JavaScript can be parsed (experiments show more than 20× faster). On mobile, large compiled codes can easily take 20–40 seconds just to parse, so native decoding (especially when combined with other techniques like streaming for better-than-gzip compression) is critical to providing a good cold-load user experience.
>
>   - By avoiding the simultaneous asm.js constraints of AOT-compilability and good performance even on engines without specific asm.js optimizations, a new standard makes it much easier to add the features :unicorn: required to reach native levels of performance.


---

## Game of Life

Conway's Game of Life in [Wasm](https://awesome-wasm-game-of-life.s3.amazonaws.com/wasm/index.html)
and [JS](https://awesome-wasm-game-of-life.s3.amazonaws.com/javascript/index.html).





3. WebAssembly MVP
    - Streaming
        - Parsing file before fully loaded
        - Parallelization..?
    - Sandboxing
        - Linear memor
        - Embedded in host that grants 'abilities'


calls between Wasm and JS were initially slow but have been much improved**


4. Future directionss
    - Host bindings (direct, efficient access to Web APIs and DOM)
    - Non-web hosts, including WASI


---



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
