import {VError, WError, Options} from 'verror';

type Throwable = Error | Object;
export type VErrorInstance = InstanceType<typeof VError>;

declare global {
  export interface Error {
    chain(options: ChainOption, msg: string, ...args: any[]): VErrorInstance;
  }

  interface ErrorConstructor {
    verror(options: Options | Error, message: string, ...params: any[]): VErrorInstance;
    werror(options: Options | Error, message: string, ...params: any[]): VErrorInstance;
    of(t: Throwable): Error;
  }
}

type ChainOption = Omit<Options, 'name' | 'cause'> & {
  name: string;
}

Error.prototype.chain = function(
  options: ChainOption,
  msg: string,
  ...args: any[]
): VErrorInstance {
  return Error.verror(
    {
      name: options.name,
      cause: this,
    },
    msg,
    ...args,
  );
};

Error.verror = function(...args) {
  return new VError(...args);
};

Error.werror = function(...args) {
  return new WError(...args);
};

Error.of = function(t: Throwable) {
  if (typeof t === 'string') {
    return new Error(t);
  }
  if (typeof t === 'object') {
    if (t instanceof Error) {
      return t;
    } else {
      let error = new Error();
      Object.assign(error, t);
      return error;
    }
  }
  throw new Error('invalid params');
};
