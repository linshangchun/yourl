"use strict";function e(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function r(r){for(var n=1;n<arguments.length;n++){var o=null!=arguments[n]?arguments[n]:{};n%2?e(Object(o),!0).forEach((function(e){t(r,e,o[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):e(Object(o)).forEach((function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))}))}return r}function t(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}var n=require("path"),o=require("fs"),i=require("os"),u=require("../share/utils"),a=".".concat("yourl"),c="".concat("yourl",".json"),l="".concat("yourl",".yml"),f=u.getRootStoreFileFullPath(a,c),s=u.getRootStoreFileFullPath(a,l),O=n.join(__dirname,"../..","package.json"),p=function(e){if("ENOENT"===e.code){if(e.path.indexOf(c)>-1){var r=[];return u.fileWriteS(e.path,r),r}if(e.path.indexOf(l)>-1){var t,n={developerName:(null===(t=i.userInfo())||void 0===t?void 0:t.username)||"yourl",editToolCmd:"code"};return u.fileWriteS(e.path,n),n}}return null},y=function(e){return u.fileReadS(e,{onError:p})},b=function(){return y(f)},v=function(e){return u.fileWriteS(f,e)};module.exports=r(r({},u),{},{getConf:function(){return y(s)},saveConf:function(e){return u.fileWriteS(s,e)},getData:b,saveData:v,getPackageInfo:function(){return o.existsSync(O)?y(O):null},activeURL:function(e){var r=e.alias,t=b().map((function(e){return e.alias===r&&(e.active=(e.active||0)+1),e}));return v(t),t},ylPath:{YOURL_DATA_PATH:f,YOURL_CONF_PATH:s},ylSystem:{LOGO:"/*\n        \n'##:::'##::'*******::'**::::'**:'********::'##:::::::\n. ##:'##::'**.... **: **:::: **: **.... **: ##:::::::\n:. ####::: **:::: **: **:::: **: **:::: **: ##:::::::\n::. ##:::: **:::: **: **:::: **: ********:: ##:::::::\n::: ##:::: **:::: **: **:::: **: **.. **::: ##:::::::\n::: ##:::: **:::: **: **:::: **: **::. **:: ##:::::::\n::: ##::::. *******::. *******:: **:::. **: ########:\n:::..::::::.......::::.......:::..:::::..::........::\n*/"}});
