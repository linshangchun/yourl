const path = require("path");
const fs = require("fs");
const os = require("os");
const shareUtils = require("../share/utils");

const YOURL_NAME = "yourl";
const STORE_ROOT_DIR = `.${YOURL_NAME}`;
const STORE_DATA_FILENAME = `${YOURL_NAME}.json`;
const STORE_CONF_FILENAME = `${YOURL_NAME}.yml`;
const STORE_EXTEND_FILENAME = `${YOURL_NAME}.js`;
const RUN_COMMAND_FILENAME = `.${YOURL_NAME}rc.yml`;
const PACKAGE_FILENAME = "package.json";

// http://patorjk.com/software/taag/#p=display&h=0&f=Banner3-D&t=yourl
const LOGO = `/*
        
'##:::'##::'*******::'**::::'**:'********::'##:::::::
. ##:'##::'**.... **: **:::: **: **.... **: ##:::::::
:. ####::: **:::: **: **:::: **: **:::: **: ##:::::::
::. ##:::: **:::: **: **:::: **: ********:: ##:::::::
::: ##:::: **:::: **: **:::: **: **.. **::: ##:::::::
::: ##:::: **:::: **: **:::: **: **::. **:: ##:::::::
::: ##::::. *******::. *******:: **:::. **: ########:
:::..::::::.......::::.......:::..:::::..::........::
*/`;

// 项目数据文件路径
const YOURL_DATA_PATH = shareUtils.getRootStoreFileFullPath(
  STORE_ROOT_DIR,
  STORE_DATA_FILENAME
);
// 项目配置文件路径
const YOURL_CONF_PATH = shareUtils.getRootStoreFileFullPath(
  STORE_ROOT_DIR,
  STORE_CONF_FILENAME
);
// 项目配置文件路径
const YOURL_EXTEND_PATH = shareUtils.getRootStoreFileFullPath(
  STORE_ROOT_DIR,
  STORE_EXTEND_FILENAME
);
// 项目信息路径
const PACKAGE_PATH = path.join(__dirname, "../..", PACKAGE_FILENAME);

// 运行时数据文件路径
const RUN_COMMAND_PATH = path.join(process.cwd(), RUN_COMMAND_FILENAME);

const handleFlieReadError = (error) => {
  if (error.code === "ENOENT") {
    // 无项目数据文件时
    if (error.path.indexOf(STORE_DATA_FILENAME) > -1) {
      const initJson = [];
      shareUtils.fileWriteS(error.path, initJson);
      return initJson;
    }
    // 无系统配置文件时
    if (error.path.indexOf(STORE_CONF_FILENAME) > -1) {
      const initYml = {
        developerName: os.userInfo()?.username || YOURL_NAME,
        editToolCmd: "code",
      };
      shareUtils.fileWriteS(error.path, initYml);
      return initYml;
    }
  }
  return null;
};
const fileReadS = (path, opts) =>
  shareUtils.fileReadS(path, { onError: handleFlieReadError, ...opts });

// 所有项目-配置信息
const getConf = () => {
  return fileReadS(YOURL_CONF_PATH);
};
// 保存项目-配置信息
const saveConf = (data) => {
  return shareUtils.fileWriteS(YOURL_CONF_PATH, data);
};
// 所有运行时数据信息
const getRCData = () => {
  if (!fs.existsSync(RUN_COMMAND_PATH)) return null;
  return fileReadS(RUN_COMMAND_PATH);
};
// 保存项目信息
const saveData = (data) => {
  return shareUtils.fileWriteS(YOURL_DATA_PATH, data);
};

// 所有项目信息
const getData = () => {
  return fileReadS(YOURL_DATA_PATH);
};

// 获取项目信息
const getPackageInfo = () => {
  if (fs.existsSync(PACKAGE_PATH)) {
    return fileReadS(PACKAGE_PATH);
  }
  return null;
};

// 活跃项目
const activeURL = ({ alias }) => {
  const allData = getData();
  const tempData = allData.map((item) => {
    if (item.alias === alias) {
      item.active = (item.active || 0) + 1;
    }
    return item;
  });
  saveData(tempData);
  return tempData;
};

// 初始化创建extend文件
const initExtendFile = () => {
  try {
    let openPath = YOURL_EXTEND_PATH;
    const strTemplate = `module.exports = {}`;
    shareUtils.fileWriteS(openPath, Buffer.from(strTemplate), false);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  ...shareUtils,
  getConf,
  saveConf,
  getData,
  saveData,
  getPackageInfo,
  activeURL,
  initExtendFile,
  getRCData,
  ylPath: {
    YOURL_DATA_PATH,
    YOURL_CONF_PATH,
    YOURL_EXTEND_PATH,
  },
  ylSystem: {
    LOGO,
  },
};
