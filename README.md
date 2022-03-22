### cli-share 共享子仓库

> 用于 cli 相关仓库的共享子仓库，技术原理: git subtree
> repo 地址: https://github.com/linshangchun/cli-share

### 父仓库配置管理命令

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

> yarn add yaml@1.10.2 clipboardy@2.3.0 chalk@4.1.1 boxen@5.0.1

- yaml
- clipboardy
- chalk
- boxen

### 特别注意 ！！！

- share 文件夹下面的内容修改时一定要考虑验证修改前的兼容性
- 当存在破坏性的修改优化时，所有关联的父仓库一定要同时 pull 更新测试

### 已引用子仓库的父仓库

- https://github.com/linshangchun/cli-item
- https://github.com/linshangchun/yourl
