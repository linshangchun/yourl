## Description

cli: your URL are all here

## Play time

```
安装：
    >npm install -g yourl

测试：
    >yl
or  >yl -h
添加并打开链接:
    >yl add <alisa> <url>
    >yl <alisa>
查看链接信息:
    >yl view <alisa>
编辑链接信息:
    >yl set <alisa> [-a,-d,-t]
or  >yl edit data (defaule: code open your-url-data)
删除链接:
    >yl del <alisa>
更多功能:
    >yl -h
or  >yl <cmd> -h

默认说明：
1、打开链接[yl alisa]：使用系统默认的浏览器打开[alisa 别名]匹配的url
2、编辑数据文件[yl edit data]，默认使用vscode编辑器,也可设置idea或其他编辑器：yl conf -e [idea|webstore|other-edit-cmd] (or: yl edit conf)

```

## .yourlrc.yml

> 任意项目文件夹里配置[.yourlrc.yml]，在该项目文件夹下执行控制台命令[yl alisa]，即可快速打开匹配网址
> 功能支持版本号: 1.0.6+

如何配置：[👉 点击查看](https://github.com/linshangchun/yourl/blob/master/example/.yourlrc.yml)

**！！！注意**：项目文件夹下.yourlrc.yml 中配置的[alisa 别名]会优先于系统数据文件匹配，前者未命中时会在后者中继续匹配[alisa 别名]

## Learn more

[yourl:npm](https://www.npmjs.com/package/yourl)

[yourl:repo](https://github.com/linshangchun/yourl)
