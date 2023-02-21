const path = require("path");
const fs = require("fs");
const os = require("os");
const yaml = require("yaml");
const clipboardy = require("clipboardy");
const chalk = require("chalk");
const boxen = require("boxen");

// 递归创建文件夹
const mdDirsSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mdDirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      console.log(`文件夹初始化成功：${dirname}`);
      return true;
    }
  }
};
// 数据存储文件路径
const getRootStoreFileFullPath = (rootdir, filename) => {
  if (typeof rootdir !== "string" || !rootdir) return null;
  if (typeof filename !== "string" || !filename) return null;
  const rootStoreDir = path.join(os.homedir().toString(), rootdir);
  return mdDirsSync(rootStoreDir) && path.join(rootStoreDir, filename);
};

// 同步写入json格式文件
const fileWriteS = (p, d, isJson = true) => {
  try {
    if (p.indexOf(".yml") > -1) {
      fs.writeFileSync(p, yaml.stringify(d));
    } else {
      fs.writeFileSync(p, isJson ? JSON.stringify(d, null, 2) : d);
    }
  } catch (error) {
    console.log("fileWriteS-error：");
    console.log(error);
  }
};

// 按json格式同步读取文件
const fileReadS = (p, opts) => {
  try {
    const dataU8 = fs.readFileSync(p, "utf8");
    if (p.indexOf(".yml") > -1) {
      return yaml.parse(dataU8);
    } else if (p.indexOf(".json") > -1) {
      return JSON.parse(dataU8);
    }
    return null;
  } catch (error) {
    if (typeof opts?.onError === "function") {
      const errRes = opts.onError(error);
      if (errRes) {
        return errRes;
      }
    }
    console.log("fileReadS-error：");
    console.log(error);
    return null;
  }
};

// 读取系统剪切板
const clipReadS = (cb) => {
  try {
    const readText = clipboardy.readSync();
    if (typeof cb === "function") cb(readText);
    return readText;
  } catch (error) {
    console.log(error);
  }
};
// 写入系统剪切板
const clipWriteS = (text, cb) => {
  try {
    clipboardy.writeSync(text);
    typeof cb === "function" ? cb(text) : console.log("操作信息复制成功");
  } catch (error) {
    console.log(error);
  }
};

// 生成唯一标识
const uuid_generate = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
// 字符替换方案映射表
const replaceMap = [
  { from: /#/g, to: "#", color: "yellow" },
  { from: /=/g, to: "#", color: "cyan" },
  { from: /\*/g, to: "#", color: "green" },
  { from: /\./g, to: ".", color: "blue" },
  { from: /\:/g, to: ":", color: "blue" },
  { from: /\'/g, to: `'`, color: "magenta" },
];
// 系统Logo
const systemLogo = (logoSrc) => {
  if (!logoSrc) return "";
  let logoString = logoSrc.substring(
    logoSrc.indexOf("/*") + 3,
    logoSrc.lastIndexOf("*/")
  );
  if (!chalk) return logoString;
  replaceMap.forEach(({ from, to, color }) => {
    logoString = logoString.replace(from, chalk[color](to));
  });
  return logoString;
};
// 系统package
const systemPkg = (pkg, opts) => {
  const chars = opts?.chars || `***`;
  return boxen(
    chalk.yellow(
      `${chars} ${pkg.name}@${pkg.version} ${chars}\n${chars} ${pkg.description} ${chars}`
    ),
    { padding: 1, ...opts }
  );
};

// 标签管理
const newTag = ({ oldTag = [], tag }) => {
  // 输入"t0,t1-,t2,t4-",表示添加tag:[t0,t2],移除tag:[t1,t4]
  if (!tag || !tag?.length) return oldTag;
  const inputTag = tag.split(",");
  const isOut = (i) => i.lastIndexOf("-") === i.length - 1;
  const outTag = inputTag
    .filter(isOut)
    .map((t) => t.substring(0, t.length - 1));
  const addTag = inputTag.filter((i) => !isOut(i));
  const allTag = [...new Set([...oldTag, ...addTag])].filter(
    (t) => !outTag.includes(t)
  );
  return allTag;
};

module.exports = {
  mdDirsSync,
  getRootStoreFileFullPath,
  fileWriteS,
  fileReadS,
  clipReadS,
  clipWriteS,
  uuid_generate,
  systemLogo,
  systemPkg,
  newTag,
};
