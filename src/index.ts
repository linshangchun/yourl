import path  from 'path'
import fs  from 'fs'
import { program } from 'commander'
import { josnReadSync, printPKG, execCmd, log } from '@lshch/utils-node'
import { actions, linkConfigPath, linkDataPath, getLinkConfig } from '@lshch/utils-link'

const packageInfo = () => {
  const pkgPath = path.resolve(__dirname, '..', 'package.json');
  return josnReadSync(pkgPath);
};

const checkAlias = (alias: string): Promise<boolean> => {
  return new Promise(resolve=> {
    if (program.commands.map((item) => item.name()).includes(alias)) {
      log.info(`${alias}：当前名称保护不可用，请使用用其他名称`)
      resolve(false);
    } else {
      resolve(true);
    }
  })
}

program
  .command('set <alias> <url>')
  .description('添加或编辑软链接')
  .option(`-d, --description <description>`, '软链接描述')
  .option(`-y, --yes [yes]`, `跳过提示`)
  .action(async (alias, url, opts) => {
    const res = await checkAlias(alias);
    if(!res) return;
    actions.default(alias, url, opts);
  });

program
  .command('list')
  .description('查看软链接列表')
  .option(`-a, --all [all]`, `查看所有软链接`, false)
  .option(`-n, --number <number>`, `查看指定数量软链接`, '5')
  .action((opts) => {
    actions.default('list', undefined, opts);
  });

program
  .command('edit <alias>')
  .description('编辑软链接')
  .option(`-t, --tool <tool>`, '编辑工具')
  .action(async (alias, opts) => {
    const file_paths = {
      linkrc: fs.existsSync(linkConfigPath) && linkConfigPath,
      link: fs.existsSync(linkDataPath) && linkDataPath,
    };
    if (file_paths[alias]) {
      const { edit_tool } = getLinkConfig();
      await execCmd(`${opts.tool || edit_tool} ${file_paths[alias]}`, true);
      return;
    }
    log.info(
      `当前支持以下文件编辑：${Object.keys(file_paths)
        .filter((i) => file_paths[i])
        .join('|')}`
    );
  },);

program
  .command('view <alias>')
  .description('查看软链接')
  .action((alias) => {
    actions.default(alias, undefined, {view: true});
  });

program
  .command('rm <alias>')
  .description('移除软链接')
  .action((alias) => {
    actions.default(alias, undefined, {remove: true});
  });

// 子命令兜底处理
program.arguments(`[args...]`)
  .description('yourl：软链接集合管理工具')
  .option(`-c, --copy [copy]`, `复制软链接url`, false)
  .action((args, opts)=>{
    if (args.length === 0) {
      // 显示版本信息
      const pkg = packageInfo();
      printPKG(pkg);
      return;
    }
    if (args.length === 1) {
      // 打开软链接
      actions.default(args[0], undefined, opts);
      return;
    }
    console.log(args, opts);
  });

program.parse(process.argv);