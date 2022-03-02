"use strict";var o=require("commander");o.command("init <alisa>").description("init").option("-o, --opt","选项描述","默认值: str|num|bool").action((function(o,i){console.log(o,i)})),o.parse(process.argv);
