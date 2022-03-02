const cmd = require("commander");
const { exec } = require("shelljs");
const open = require("open");
const dayjs = require("dayjs");
const {
  systemLogo,
  systemPkg,
  getPackageInfo,
  getData,
  saveData,
  getConf,
  saveConf,
  activeURL,
  uuid_generate,
  ylSystem,
  ylPath,
} = require("./utils");

const getCurURL = (alias, type = "item") => {
  if (cmd.commands.map((item) => item._name).includes(alias)) {
    console.log(`${alias}: 该别名为项目保留关键字！请重试`);
    return type === "tag" ? [] : null;
  }
  const allData = getData();
  if (type === "tag") {
    const curList = allData.filter((i) => i?.tag?.split(",").includes(alias));
    if (!curList.length && type === "tag")
      console.log(`yl: "not found the tag"`);
    return curList;
  }
  const curURL = allData.find((i) => i.alias === alias);
  if (!curURL && type === "item") console.log(`yl: "not found the URL"`);
  if (curURL) activeURL(curURL); // 获取成功即活跃一次项目
  return curURL;
};

cmd
  .command("add <alias> <url>")
  .description(`【yl add <alias> <url>】新增URL`)
  .option(`-t, --template <template>`, `模板链接`, null)
  .option(`-d, --description <description>`, `描述说明`, "无")
  .action((alias, url, opts) => {
    const allData = getData();
    const curURL = getCurURL(alias, "add");
    if (curURL) return console.log(`已存在该URL: ${alias}！请重试`);
    const tempData = {
      id: uuid_generate(),
      alias,
      url,
      template: opts.template,
      description: opts.description,
      createTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    };
    allData.unshift(tempData);
    saveData(allData);
  });

cmd
  .command(`del <alias>`)
  .description(`【yl del <alias>】删除URL`)
  .action((alias) => {
    const allData = getData();
    const delURL = getCurURL(alias);
    if (delURL) {
      saveData(allData.filter((i) => i.alias !== alias));
    }
  });

cmd
  .command(`set <alias>`)
  .description(`【yl set <alias> [-a,-d,-t]】更新URL`)
  .option(`-a, --alias <alias>`, `更新别名`)
  .option(`-d, --description <description>`, `更新描述`)
  .option(`-t, --tag <tag>`, `更新标签`)
  .action((alias, opts) => {
    const allData = getData();
    const curURL = getCurURL(alias, "set");
    if (curURL) {
      saveData(
        allData.map((item) => {
          if (item.alias === alias) {
            item.active = (item.active || 0) + 1;
            item.alias = opts.alias ? opts.alias : item.alias;
            item.description = opts.description
              ? opts.description
              : item.description;
            const oldTags = (item.tag || "").split(",");
            const setTags = (opts.tag || "")
              .split(",")
              .filter((i) => Boolean(i) && i !== " ")
              .map((i) => i.trim());
            const isOut = (i) => i.lastIndexOf("-") === i.length - 1;
            const outTags = setTags
              ?.filter((i) => isOut(i))
              .map((i) => i.substring(0, i.length - 1)); // 取出要删除的标签
            const addTags = setTags?.filter((i) => !isOut(i)); // 真正添加的标签
            const newOldTags = oldTags.filter((i) => !outTags.includes(i)); // 去除原数据中要删除的标签
            item.tag = [...new Set([...newOldTags, ...addTags])].join(",");
            item.updateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
            console.log(`changed-itemAlias: ${item.alias}`);
            console.log(`changed-itemDesc: ${item.description}`);
            console.log(`changed-itemTag: ${item.tag}`);
          }
          return item;
        })
      );
    }
  });

cmd
  .command("view <alias>")
  .description("【yl view <alias>】查看URL详情")
  .action((alias) => {
    const curURL = getCurURL(alias, "view");
    if (curURL) {
      console.log(`${curURL.alias} of info:`);
      console.log(curURL);
    }
  });

cmd
  .command(`list`)
  .alias("ls")
  .description(`【yl list】查看URL列表`)
  .option(`-n, --number <number>`, `展示数量`, 6)
  .option(`-a, --all [all]`, `展示所有`, false)
  .action((opts) => {
    const allData = getData();
    allData
      .sort((a, b) => {
        return (b.active || 0) - (a.active || 0);
      })
      .slice(0, opts.all ? allData.length : opts.number)
      .map((item, index) => {
        const indexStr = index >= 9 ? index + 1 : `0${index + 1}`;
        return `${indexStr} ${item.alias}[${item.active || 0}]: ${item.url} 【${
          item.description
        }】`;
      })
      .forEach((item) => {
        console.log(item);
      });
    console.log("* * ".repeat(5));
    console.log(
      `当前URL总数：${allData.length}\n查看所有URL：-a \n指定展示数量：-n n`
    );
  });

cmd
  .command(`edit [name]`)
  .description(`【yl edit [data|conf]】查看并编辑数据文件`)
  .action((name) => {
    const { editToolCmd } = getConf();
    const namePathList = {
      data: ylPath.YOURL_DATA_PATH,
      conf: ylPath.YOURL_CONF_PATH,
    };
    if (namePathList[name]) {
      exec(`${editToolCmd} ${namePathList[name]}`, { silent: true });
      return;
    }
    console.log(`当前支持数据查看项: data 或 conf`);
  });

cmd
  .command(`conf`)
  .description(`【yl conf】系统设置`)
  .option(`-e, --editToolCmd <editToolCmd>`, `编辑工具命令`)
  .action((opts) => {
    const itemInfo = getConf();
    if (opts.editToolCmd) {
      itemInfo.editToolCmd = opts.editToolCmd;
      saveConf(itemInfo);
    }
    console.log(itemInfo);
  });

cmd
  .command("tag <name>")
  .description("【yl tag <name>】标签打开相关URL")
  .action((name) => {
    const curURLList = getCurURL(name, "tag");
    if (curURLList.length > 0) {
      curURLList.forEach((item) => {
        open(item.url);
      });
    }
  });

// 子命令兜底处理
cmd
  .arguments(`[args...]`)
  .option(`-c, --copy [copy]`, "是否复制", false)
  .action((args, opts) => {
    if (args.length === 0) {
      // 显示cli信息
      console.log(systemLogo(ylSystem.LOGO));
      console.log(systemPkg(getPackageInfo()));
      return;
    }
    const [alias] = args;
    const curURL = getCurURL(alias);
    if (curURL) {
      open(curURL.url);
    }
  });

cmd.parse(process.argv);
