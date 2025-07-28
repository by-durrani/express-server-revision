export const config = () => {
  let PORT: number = 3000;
  const argIdx = process.argv.findIndex((p) => p == "--port");
  if (argIdx !== -1) {
    const getArg = Number(process.argv[argIdx + 1]);

    if (getArg) {
      PORT = getArg;
    } else {
      console.error("enter port number if using --port flag");
      process.exit(1);
    }
  }

  if (process.env.PORT) {
    PORT = Number(process.env.PORT);
  }
  global.PORT = PORT;
};
