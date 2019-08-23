(module
  (func $add (param $lhs i32) (param $rhs i32) (result i32)
    local.get $lhs
    local.get $rhs
    i32.add
  )
  (func $double (param $x i32) (result i32)
    (i32.add (local.get $x) (local.get $x))
  )
  (export "add" (func $add))
  (export "double" (func $double))
)
