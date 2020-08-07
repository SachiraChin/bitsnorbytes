---
title: "Gatsby site with Azure Web App and Application Insights"
date: "2020-08-02"
draft: false
path: "/2020/gatsby-site-with-azure-application-insights"
type: 'blog'
---

As it is for my other blog posts, this post is also a story about a few things I've learned while working my most recent project, this web site!

If you check a few posts in this web site, you may have noticed that I'm having a hard time keeping backups of my blog posts. As time passes, I tend to loose backups of the articles when I had to take servers offline. I've been thinking about this issue for some time and been thinking what I can do to keep everything some place secure, and also in a way which I can easily maintain. In the same time, `GitHub Markdown Language` been growing in me simply because how easy it is to write technical posts using it. With the combination of these two remarks, I decided to find a platform which is easy to manage and also supports markdown language for posts.

After looking around for a blogging engine which supports my requirements, I came across [`gatsby`](https://www.gatsbyjs.org/), I've seen people talk about this in social media, but I never had a chance to try it out. After digging more into how it works, I decided that it is the perfect solution for me. Easy to manage, markdown supported, static site generator. Then the theme, it was an easy pick, [gatsby-starter-julia](https://www.gatsbyjs.org/starters/niklasmtj/gatsby-starter-julia/) theme was simple, had the look and feel I'd love to have in my blog, it was just a matter of creating the new site using theme and start working on it. Steps to create the site was really easy to follow, articles from [`gatsby`](https://www.gatsbyjs.org/) site and details in [gatsby-starter-julia](https://www.gatsbyjs.org/starters/niklasmtj/gatsby-starter-julia/) was simple enough that I was able to get the base site up and running locally within few a minutes of time. After that, I spent a few hours to make it look like how I wanted it to be, and migrating old articles from WordPress and [web.archive.org](https://web.archive.org).

Being the easy part of the process being done, here are the things I did after to make it available for you. 😊

## `web.config` and security headers

Since I'm using Azure Web App to host the `gatsby` web site, in order to add different kinds of server configurations, I have to use `web.config` file. A good start point to get this working is to read this article from `gatsby`, [Deploying to Microsoft Internet Information Server (IIS)](https://www.gatsbyjs.org/docs/deploying-to-iis/).

After going through this article, I came up with below `web.config` file (which resides on `/static` folder),

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <location path="static">
        <system.webServer>
            <httpProtocol>
                <customHeaders>
                    <remove name="Cache-Control" />
                    <remove name="Strict-Transport-Security" />
                    <add name="Cache-Control" value="public, max-age=31536000, immutable" />
                    <add name="Strict-Transport-Security" value="max-age=31536000" />
                </customHeaders>
            </httpProtocol>
        </system.webServer>
    </location>
    <system.webServer>
        <httpProtocol>
            <customHeaders>
                <remove name="Cache-Control" />
                <remove name="Strict-Transport-Security" />
                <remove name="Content-Security-Policy" />
                <remove name="X-XSS-Protection" />
                <remove name="X-Frame-Options" />
                <remove name="X-Content-Type-Options" />
                <add name="Cache-Control" value="public, max-age=0, must-revalidate" />
                <add name="Strict-Transport-Security" value="max-age=0" />
                <add name="Content-Security-Policy" value="default-src 'self' 'unsafe-inline'" />
                <add name="X-XSS-Protection" value="1; mode=block" />
                <add name="X-Frame-Options" value="SAMEORIGIN" />
                <add name="X-Content-Type-Options" value="nosniff" />
            </customHeaders>
        </httpProtocol>
        <staticContent>
            <mimeMap fileExtension=".webmanifest" mimeType="application/manifest+json" />
            <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
            <mimeMap fileExtension=".woff2" mimeType="application/font-woff2" />
            <mimeMap fileExtension=".json" mimeType="application/json" />
        </staticContent>
        <rewrite>
            <outboundRules>
                <rule name="AdjustCacheForCachePermanentlyFiles" preCondition="IsCachePermanentlyFile">
                    <match serverVariable="RESPONSE_Cache-Control" pattern=".*" />
                    <action type="Rewrite" value="public, max-age=31536000, immutable" />
                </rule>
                <rule name="AdjustCacheForCachePermanentlyFilesSTS" preCondition="IsCachePermanentlyFile" stopProcessing="true">
                    <match serverVariable="RESPONSE_Strict-Transport-Security" pattern=".*" />
                    <action type="Rewrite" value="max-age=31536000" />
                </rule>
                <preConditions>
                    <preCondition name="IsCachePermanentlyFile">
                        <add input="{REQUEST_FILENAME}" pattern="((.*\.js)|(.*\.css)|(.*\.png)|(.*\.jpg)|(.*\.ico)|(.*\.woff)|(.*\.woff2))$" />
                    </preCondition>
                </preConditions>
            </outboundRules>
        </rewrite>
    </system.webServer>
</configuration>
```

Here are few points about the above configuration file,

- Please read about each response headers from below articles if you already do not know about them,
  - `Cache-Control`: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control), good read: [https://stackoverflow.com/questions/1046966/whats-the-difference-between-cache-control-max-age-0-and-no-cache](https://stackoverflow.com/questions/1046966/whats-the-difference-between-cache-control-max-age-0-and-no-cache)
  - `Strict-Transport-Security`: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security)
  - `Content-Security-Policy`: [https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
  - `X-XSS-Protection`: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection)
  - `X-Frame-Options`: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options)
  - `X-Content-Type-Options`: [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options)
- `Line 3-14`: Content in `/static` folder are static content for the site. These files does not have to cached in the browser. We make it so that it overrides default values for `Cache-Control` and `Strict-Transport-Security` here.
- `Line 16-31`: Default content security headers to be used for files.
- `Line 32-37`: I have added `mimeMap` for `woff`, `woff2` and `json` files which used by the site.
- `Line 39-53`: These are special overrides for `Cache-Control` and `Strict-Transport-Security` depends on the file extension. This makes different types of static files in the site cached in the browser so the browser doesn't have to load them each time.

## CI/CD, deploying my blog via GitHub actions

I'm not going to detail things I did here simply because I followed steps from an awesome article by [Jen Looper](https://twitter.com/jenlooper).

Read: [Deploy your Website on Azure with GitHub Actions like a Hipster](https://dev.to/azure/deploy-your-website-on-azure-with-github-actions-like-a-hipster-4da3)

My final `yaml` looked like this,

```yml
name: bitsnorbytes.com build and deploy to Azure Web App

on:
  [push]

env:
  AZURE_WEBAPP_NAME: bitsnorbytes
  AZURE_WEBAPP_PACKAGE_PATH: './public'
  NODE_VERSION: '10.x'

jobs:
  build-and-deploy:
    name: Build and Deploy
    runs-on: ubuntu-latest
    steps:
    - name: Checkout 🛎️
      uses: actions/checkout@v2.3.1
      with:
        persist-credentials: false

    - name: Install npm ${{ env.NODE_VERSION }} 🔧
      uses: actions/setup-node@v1
      with:
        node-version: ${{ env.NODE_VERSION }}

    - name: Install packages 🔧
      run: |
        npm install

    - name: Build project 🔧
      run: |
        npm run-script build

    - name: Deploy to Azure WebApp 🚀
      uses: azure/webapps-deploy@v1
      with:
        app-name: ${{ env.AZURE_WEBAPP_NAME }}
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: ${{ env.AZURE_WEBAPP_PACKAGE_PATH }}

```

## SSL all-the-way, LetsEncrypt for Azure Web Apps

Well, again, I just followed through an article, this time, none other than [Scott Hanselman](https://twitter.com/shanselman). I have nothing more to say but to follow this article to the line, I can vouch that it works. 😎

Article: [Securing an Azure App Service Website under SSL in minutes with Let's Encrypt](https://www.hanselman.com/blog/SecuringAnAzureAppServiceWebsiteUnderSSLInMinutesWithLetsEncrypt.aspx)

When I said to follow it to the line, please do so, I was kind of dumb enough to do some silly mistakes like below,

- Getting subscription id wrong 🤦‍♂️
- Setting up permissions to the app incorrectly - make sure you add `Contribute` permissions to the resource group. You may get different errors from the LetsEncrypt configuration page if you haven't done that, which makes you fix non-existing problems.

After overcoming my own mistakes, my site was setup with LetsEncrypt SSL.

## Azure Application Insights for Gatsby web site

Well, this is where I had real trouble with, I have went through the rabbit hole of polyfills to Azure Application Insights documentations and JavaScript repository to god-knows-where. To be honest, I'm actually not sure this is really an issue with my setup or something wrong I have done. I will update here if I discover the true reason for it.

First of all, good reads to start,

[Implementing Monitoring in React Using AppInsights](https://www.aaron-powell.com/posts/2019-10-04-implementing-monitoring-in-react-using-appinsights/) by [Aaron Powell](https://twitter.com/slace)

[Gatsby with Azure AppInsights](https://www.olivercoding.com/2019-04-04-gatsby-azure-appinsights/) by [Daniel Oliver](https://twitter.com/a_software_dev)

Having read above-mentioned articles, I wanted to add a few more features as well. I wanted my GitHub Actions to pick Azure Application Insights key from its secrets, which made me read about few other functionalities in Gatsby.

My approach here was to use environment variables in Gatsby. You can read about them [here](https://www.gatsbyjs.org/docs/environment-variables/). My idea was to use `.env` locally and then pass AAI key as a parameter to build function.

So, I've added `.env` to the application folder (which is ignored and not added the repo), updated it with below content,

```txt
GATSBY_APPLICATION_INSIGHTS_KEY={Azure-Application-Insights-Key}
```

Now I have to update my `gatsby-config.js` to accept values from `.env` file, added below section to the top to make it happen,

```js
require("dotenv").config({
    path: `.env.${process.env.NODE_ENV}`,
})
```

Now the interesting part, where I'm going to use the AAI key, for this, I simply copied the code mentioned in [Aaron Powell](https://twitter.com/slace)'s article, and added small change to it, my `AppInsights.js` looked like this,

```js
// AppInsights.js
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js'
import { globalHistory } from "@reach/router"

const reactPlugin = new ReactPlugin();
const ai = new ApplicationInsights({
    config: {
        instrumentationKey: process.env.GATSBY_APPLICATION_INSIGHTS_KEY,
        extensions: [reactPlugin],
        extensionConfig: {
            [reactPlugin.identifier]: { history: globalHistory }
        }
    }
})

if (process.env.GATSBY_APPLICATION_INSIGHTS_KEY) {
    ai.loadAppInsights();
} else {
    console.log('Application insights key not available.')
}

export default (Component) => withAITracking(reactPlugin, Component)
export const appInsights = ai.appInsights
```

The change I added was between lines 17-21, where it invokes `ai.loadAppInsights()` only when `process.env.GATSBY_APPLICATION_INSIGHTS_KEY` is present. Thinking my work is done, I ran `gatsby build` and alas, I'm hit with an error,

```bash
WebpackError: ReferenceError: XMLHttpRequest is not defined
```

The full error looked like this,

```bash
Building static HTML failed

See our docs page for more info on this error: https://gatsby.dev/debug-html


  143 |         }
  144 |         else {
> 145 |             if (!CoreUtils.isUndefined(XMLHttpRequest)) {
      |                           ^
  146 |                 var testXhr = new XMLHttpRequest();
  147 |                 if ("withCredentials" in testXhr) {
  148 |                     this._sender = this._xhrSender;


  WebpackError: ReferenceError: XMLHttpRequest is not defined

  - Sender.js:145
    node_modules/@microsoft/applicationinsights-channel-js/dist-esm/Sender.js:145:27

  - TelemetryHelpers.js:40
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/TelemetryHelpers.js:40:1

  - CoreUtils.js:183
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/CoreUtils.js:183:1

  - TelemetryHelpers.js:39
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/TelemetryHelpers.js:39:14

  - ChannelController.js:85
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/ChannelController.js:85:78

  - CoreUtils.js:183
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/CoreUtils.js:183:1

  - ChannelController.js:85
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/ChannelController.js:85:1

  - TelemetryHelpers.js:40
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/TelemetryHelpers.js:40:1

  - CoreUtils.js:183
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/CoreUtils.js:183:1

  - TelemetryHelpers.js:39
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/TelemetryHelpers.js:39:14

  - BaseCore.js:100
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/BaseCore.js:100:26

  - AppInsightsCore.js:18
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/AppInsightsCore.js:18:1

  - Initialization.js:233
    node_modules/@microsoft/applicationinsights-web/dist-esm/Initialization.js:233:1

  - AppInsights.js:20
    src/services/AppInsights.js:20:8
```

This was strange for me because of two reasons,

1. Why build tries to invoke `ai.loadAppInsights()` on build time, shouldn't it be called only at run time?
2. How it can be that `XMLHttpRequest` is not available for build anyways, isn't it something which should be there in all environments?

Answer for the first question is still at large, I think it's something related to how `Gatsby` build applications. I am still to learn about it.

For the second question though, it turned out that `XMLHttpRequest` is not available for the Node.js and should be added as a package. The reason I said 'a' package earlier because, there are two packages available for us to use.

1. `xmlhttprequest`: [https://www.npmjs.com/package/xmlhttprequest](https://www.npmjs.com/package/xmlhttprequest)
2. `xhr2`: [https://www.npmjs.com/package/xhr2](https://www.npmjs.com/package/xhr2)

For my case though, the first package did not work as expected, I have came across this article: [http://zuga.net/articles/node-errors-referenceerror-xmlhttprequest-is-not-defined/](http://zuga.net/articles/node-errors-referenceerror-xmlhttprequest-is-not-defined/), which talks about how to use `xmlhttprequest` to fix this error. But setting it as global variable didn't work.

Then I found [this answer](https://spectrum.chat/gatsby-js/general/referenceerror-xmlhttprequest-is-not-defined-on-production-build~5bc45c69-36e1-4ad4-b8d6-495b5ec242bd?m=MTU2NzE1NjkxOTM3Mg==) by [Matt Kane](https://github.com/ascorbic). Seeing that, I updated my `AppInsights.js` like this,

```js
// AppInsights.js
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js'
import { globalHistory } from "@reach/router"

if (!("XMLHttpRequest" in global)) {
    global.XMLHttpRequest = require('xhr2');
}

....
```

Check lines 6-9, it checks if `XMLHttpRequest` is available on the `global` object, if it's not there, it creates `XMLHttpRequest` from `xhr2`.

Now you may think that this solved my problems, I wished at the time the same too, but my luck was not there for it. Now I was smashed with new error,

```bash
WebpackError: ReferenceError: XDomainRequest is not defined
```

Full error as below,

```bash
Building static HTML failed

See our docs page for more info on this error: https://gatsby.dev/debug-html


  149 |                     this._XMLHttpRequestSupported = true;
  150 |                 }
> 151 |                 else if (!CoreUtils.isUndefined(XDomainRequest)) {
      |                                    ^
  152 |                     this._sender = this._xdrSender; // IE 8 and 9
  153 |                 }
  154 |             }


  WebpackError: ReferenceError: XDomainRequest is not defined

  - Sender.js:151
    node_modules/@microsoft/applicationinsights-channel-js/dist-esm/Sender.js:151:36

  - TelemetryHelpers.js:40
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/TelemetryHelpers.js:40:1

  - CoreUtils.js:183
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/CoreUtils.js:183:1

  - TelemetryHelpers.js:39
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/TelemetryHelpers.js:39:14

  - ChannelController.js:85
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/ChannelController.js:85:78

  - CoreUtils.js:183
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/CoreUtils.js:183:1

  - ChannelController.js:85
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/ChannelController.js:85:1

  - TelemetryHelpers.js:40
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/TelemetryHelpers.js:40:1

  - CoreUtils.js:183
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/CoreUtils.js:183:1

  - TelemetryHelpers.js:39
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/TelemetryHelpers.js:39:14

  - BaseCore.js:100
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/BaseCore.js:100:26

  - AppInsightsCore.js:18
    [applicationinsights-web]/[@microsoft]/applicationinsights-core-js/dist-esm/JavaScriptSDK/AppInsightsCore.js:18:1

  - Initialization.js:233
    node_modules/@microsoft/applicationinsights-web/dist-esm/Initialization.js:233:1

  - AppInsights.js:20
    src/services/AppInsights.js:20:8
```

Now, I thought as for `XMLHttpRequest`, there would be a package to import for `XDomainRequest` as well. It turned out that there is no package for `XDomainRequest`. That left me no option but to check out the code within `applicationinsights-web` for a possible solution. That's when I actually noticed the code which it threw the error in the first place,

[ApplicationInsights-JS/channels/applicationinsights-channel-js/src/Sender.ts](https://github.com/microsoft/ApplicationInsights-JS/blob/430caa1f9e525339e4614d61992fec0e305fcaa9/channels/applicationinsights-channel-js/src/Sender.ts#L230)

```ts
if (!CoreUtils.isUndefined(XMLHttpRequest)) {
    const testXhr = new XMLHttpRequest();
    if ("withCredentials" in testXhr) {
        _self._sender = _xhrSender;
        _self._XMLHttpRequestSupported = true;
    } else if (!CoreUtils.isUndefined(XDomainRequest)) {
        _self._sender = _xdrSender; // IE 8 and 9
    }
}
```

What this actually means is that, if `XMLHttpRequest` or `XDomainRequest` is `undefined`, AAI should work without any issue. So I actually do not need `xhr2` in the first place. With that in mind, I've changed my `AppInsights.js` as below,

```js
// AppInsights.js
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js'
import { globalHistory } from "@reach/router"
if (!("XMLHttpRequest" in global)) {
    global.XMLHttpRequest = undefined;
    global.XDomainRequest = undefined;
}
```

Now when I ran `gatsby build`, ~~it worked without any issue~~ was what I wanted to say, but I didn't, now I was hammered with new error,

```bash
Building static HTML failed

See our docs page for more info on this error: https://gatsby.dev/debug-html


  234 |                     snippetVer += ".lg";
  235 |                 }
> 236 |                 _this.properties.context.internal.snippetVer = snippetVer || "-";
      | ^
  237 |                 // apply updated properties to the global instance (snippet)
  238 |                 for (var field in _this) {
  239 |                     if (CoreUtils.isString(field) &&


  WebpackError: TypeError: Cannot set property 'snippetVer' of undefined

  - Initialization.js:236
    node_modules/@microsoft/applicationinsights-web/dist-esm/Initialization.js:236:1

  - Initialization.js:263
    node_modules/@microsoft/applicationinsights-web/dist-esm/Initialization.js:263:1

  - AppInsights.js:23
    src/services/AppInsights.js:23:8

  - 404.js:1
    src/pages/404.js:1:1
```

This error was easy to fix though, when I googled for this error, I came across this GitHub issue.

[https://github.com/microsoft/ApplicationInsights-JS/issues/1321](https://github.com/microsoft/ApplicationInsights-JS/issues/1321)

There I took the hint that, this specific issue may be caused by `@microsoft/applicationinsights-web@2.5.6`, so I installed `@microsoft/applicationinsights-web@2.5.3` which mentioned in that ticket, and VOILA!!!, it stopped me giving this error.

At the moment, [@MSNev](https://github.com/MSNev) opened the discussion of this error in below issue, in the future, if someone needs more details about this, you may check out this issue for more details.

[https://github.com/microsoft/ApplicationInsights-JS/issues/1334](https://github.com/microsoft/ApplicationInsights-JS/issues/1334)

For now though, my final `AppInsights.js` looks like this and it works without any issue for the build.

Azure Application Insights version: `@microsoft/applicationinsights-web@2.5.3`

```js
// AppInsights.js
import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin, withAITracking } from '@microsoft/applicationinsights-react-js'
import { globalHistory } from "@reach/router"

if (!("XMLHttpRequest" in global)) {
    global.XMLHttpRequest = undefined;
    global.XDomainRequest = undefined;
}

const reactPlugin = new ReactPlugin();
const ai = new ApplicationInsights({
    config: {
        instrumentationKey: process.env.GATSBY_APPLICATION_INSIGHTS_KEY,
        extensions: [reactPlugin],
        extensionConfig: {
            [reactPlugin.identifier]: { history: globalHistory }
        }
    }
})

if (process.env.GATSBY_APPLICATION_INSIGHTS_KEY) {
    ai.loadAppInsights();
} else {
    console.log('Application insights key not available.')
}

export default (Component) => withAITracking(reactPlugin, Component)
export const appInsights = ai.appInsights
```

## Conclusion

Throughout the process of converting my site to `Gatsby` was a big learning experience for me. I learned a lot about `Gatsby`, about GitHub Actions, Azure WebSites with LetsEncrypt encryption, and finally, integration to Azure Application Insights to static web sites. For the last one though, I'm still not sure if this is an issue with how I setup the site or an issue with how `Gatsby` build applications. Either way, I have a working fix which allows me to continue using Application Insights in my site. I call it a win. 😊

Hope you learned something through this experience of mine. Cheers!
