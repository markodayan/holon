class CustomError extends Error {
  public syscall: string; // e.g. connect
  public code: number; //  e.g. -111
  // message  -> e.g. ECONNREFUSED

  public constructor(syscall: string, message: string, code: number) {
    super(message);
    this.syscall = syscall;
    this.code = code;
  }
}

export { CustomError };
