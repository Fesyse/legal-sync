type DeepPartial<TObject> = TObject extends object
  ? {
      [P in keyof TObject]?: DeepPartial<TObject[P]>;
    }
  : TObject;

type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any
  ? A
  : never;

type AddArgument<
  Fn extends (...args: any[]) => any,
  NextArg extends any,
> = Fn extends (...arg: [...infer PrevArg]) => infer Return
  ? (...args: [...PrevArg, NextArg]) => Return
  : never;

export type { AddArgument, ArgumentTypes, DeepPartial };
