---
title: ""
date: ""
draft: false
path: ""
type: 'bio'
index: 1
---

## Projects

### dotnet-monitor-ui

A tool designed to work with APIs provided by `dotnet-monitor` tool. This application does not have a server-side, purely works on the browser to access APIs from `dotnet-monitor`. The reason I thought this tool would come handy was when I was watching session by [Sourabh Shirhatti](https://twitter.com/sshirhatti) where he was explaining functionalities provided by `dotnet-monitor`. The current version of the app has the functionalities to access all endpoints of `dotnet-monitor` and on-demand management of `/metrics` endpoint. Please read about `dotnet-monitor` [here](https://devblogs.microsoft.com/dotnet/introducing-dotnet-monitor/).

Repository: [https://github.com/SachiraChin/dotnet-monitor-ui](https://github.com/SachiraChin/dotnet-monitor-ui)

Try out: [https://dotnet-monitor-ui.dev/](https://dotnet-monitor-ui.dev/)

## SharePoint authentication for modern web apps

```SharePoint.Authentication``` is an inject-able SharePoint context and token helper which can be used in multi-tenant applications. Abilities of this library extended by its sister library ```SharePoint.Authentication.Owin```.

Reason I came up with this project is due to problems I've met while creating high trust multi-tenant application. In the project I've worked on had different client id and secret for each tenant. As you may recall, SharePoint context provider automatically added to web project currently rely on only one client id and secret which must be added to web.config file. This was not the solution I wanted because, application had different client id and secret (provided by seller dashboard) for low trust part of the app and had different client id and secret for each tenant for high trust. To authentication layer to function properly, I wanted it to instantiated per tenant/user and wanted it to inject-able via Unity container. This is the solution I came up with to fix that issue.

Solution I came up consists of two separate libraries, ```SharePoint.Authentication``` and ```SharePoint.Authentication.Owin```. First library is the base which I made from token helpers and providers made by Microsoft. Second library made with one specific purpose in mind which is to use SharePoint authentication in MVC or Web API based applications. ```SharePoint.Authentication``` contains all the functions you need to build an authentication layer, but if you want don't want to build one yourself, you can use ```SharePoint.Authentication.Owin```.

Repository: [https://github.com/SachiraChin/SharePoint.Authentication](https://github.com/SachiraChin/SharePoint.Authentication)
