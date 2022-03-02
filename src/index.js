const cmd = require("commander");

cmd
  .command("init <alisa>")
  .description("init")
  .option(`-o, --opt`, "选项描述", "默认值: str|num|bool")
  .action((name, opts) => {
    console.log(name, opts);
  });

cmd.parse(process.argv);
