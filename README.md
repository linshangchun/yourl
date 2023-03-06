## Description

yourl: 软链接集合管理工具 your URL(or Link) are all here

## Play time

```
安装：
    > npm install -g yourl

测试：
    > yl
or  > yl -h
添加或修改链接信息:
    > yl set <alisa> <url>
打开链接:
    > yl <alisa>
查看链接信息:
    > yl view <alisa>
删除链接:
    > yl rm <alisa>
更多功能:
    > yl -h
or  > yl <cmd> -h

默认说明：
1、打开软链接 yl alisa：使用系统默认的浏览器打开[alisa 别名]匹配的url
2、编辑软链接配置|数据 yl edit linkrc|link，默认使用vscode编辑器，也可指定编辑器编辑 yl edit [-t idea|webstore|other-edit-cmd]

```
## .yourlrc

> 任意项目文件夹里配置[.yourlrc]，在该项目文件夹下执行控制台命令[yl alisa]，即可快速打开匹配网址
>
> 功能支持版本号: 2.0.0+

如何配置：[👉 点击查看](https://github.com/linshangchun/yourl/blob/master/example/.yourlrc)

**！！！注意**：项目文件夹下.yourlrc 中配置的[alisa 别名]会优先于系统数据文件匹配，前者未命中时会在后者中继续匹配[alisa 别名]

## Learn more

[yourl:npm](https://www.npmjs.com/package/yourl)

[yourl:repo](https://github.com/linshangchun/yourl)
