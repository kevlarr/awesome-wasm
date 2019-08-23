(module
  ;; Declare a single 64kB block of memory
  (memory $mem 1)

  ;; Save a number to the third spot in memory.
  (func $setThird (param $num i32)
    ;; Save directly to third 8-byte address in linear memory
    ;; First 8-byte number stored at byte address 0, second at 8, etc.
    (i32.store (i32.const 16) (get_local $num))
  )

  ;; Returns the 32-bit number stored at third position
  (func $getThird (result i32)
    (i32.load (i32.const 16))
  )
  (export "setThird" (func $setThird))
  (export "getThird" (func $getThird))
)
