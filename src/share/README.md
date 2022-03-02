## cli-share 共享子仓库

> 用于 cli 相关项目的共享文件，技术原理: git subtree
>
> git 地址: git@github.com:linshangchun/cli-share.git

### 父项目配置管理

```
  git remote add cli-share git@github.com:linshangchun/cli-share.git
  git remote set-url cli-share git@github.com:linshangchun/cli-share.git
  git subtree add --prefix=src/share cli-share  master --squash
  git subtree push --prefix=src/share cli-share  master --squash
  git subtree pull --prefix=src/share cli-share  master --squash
```

### 文件目录划分

share 共享文件夹

- script 公享脚本
- utils 共享函数

### 依赖库包

系统模块

- path
- fs
- os

三方模块

- yaml
- clipboardy
- chalk
- boxen
