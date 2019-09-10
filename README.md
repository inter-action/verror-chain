## VError-Chain

这个库是构建在 verror 库之上的, 在 Error 对象上扩展方法, 并封装成 VError 对象. 提供便利
的 error wrap 和 chain 机制.

注意这个库会污染 Error 实例的几个方法.

this lib is a simple wrapper builded upon `verror` lib. it injects a few helper methods into `Error` & `Error.prototype` to help you with error chainning & wrapping. In doing so it apparently pollutes `Error` and its instance. So use it with care.

示例:

```
import '@jing.miao/verror-chain'; // 

try {
  await fs.readFileSync('something-not-existed')
} catch (err){
  return err.chain({name: 'FILE_NOT_EXISTED'})
}

```

# Api

-> `Error.chain(options)`
`options` is the same parameters but with only one exception that is `name` field is required.


-> `Error.verror`
-> `Error.werror`
a helper function wrap around `new VError()/WError()`.


-> `Error.of(t: string | object | Error)`
create a `new Error()`.

