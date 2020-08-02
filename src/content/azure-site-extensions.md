---
title: "Azure Site Extensions"
date: "2015-02-22"
draft: false
path: "/azure-site-extensions"
legacy: true
archiveUrl: https://web.archive.org/web/20150728052927/http://bitsnorbytes.com/2015/02/azure-site-extensions/
---

It’s not been a month since I’ve started blogging, and when I had to choose where to host my blog, I thought “Why Not Azure?”, I like Azure and I already have some experience using Azure. So, I created WordPress site on Azure and started blogging.

My first adventure with Azure and my blog was to setup CDN for my blog. I tried few CDN providers but none able to satisfy me, some had too much features which I don’t need, some were too expensive for me. Then I read about Azure CDN, I thought “Why Not Azure CDN?” and here I am, using Azure CDN for my blog. True it’s not featuristic as other CDN providers, true it does not have much control either, but still it works perfectly for my blog and was able to improve speed of my blog. When I compare pricing, it’s much cheaper than any other CDN provider because Azure bill you only for usage.

But today I experienced new thing in Azure. I never new this feature and it is something to be expected from new Microsoft. It all started when I as running around new [Azure Portal](https://portal.azure.com). it’s been few days since I noticed that all new features to Azure isn’t available on old Azure portal. For example, search preview isn’t there on old Azure portal.

As you can see in my topic, this is about Azure WebSite extensions. It’s not something many people talks about, but I think it’s something every Azure WebSite owner know about. Reason? It give more options and features to site owner which are necessary to control the site. First of all I’ll show you how to see these site extensions.

1. Goto your site on new [Azure Portal](https://portal.azure.com).

![Azure Portal](../images/Screen-Shot-2015-02-22-at-10.01.55-AM-e1424584671676-1024x563.png)

2. Goto Settings of WebSite, there you can see Extensions.

![Azure Portal](../images/Screen-Shot-2015-02-22-at-10.02.07-AM-e1424584763179-1024x563.png)

3. There you can see list of extensions, for me I installed, “Site Admin Tools”, “phpmyadmin” and  “phpmanager”

![Azure Portal](../images/Screen-Shot-2015-02-22-at-10.02.40-AM-e1424584802767-1024x563.png)

4. After the installation, you can navigate to extension by clicking browse.

![Azure Portal](../images/Screen-Shot-2015-02-22-at-10.44.13-AM-e1424584849623-1024x530.png)

Now as you may can see, it does have many powerful tools you may need, phpmyadmin, it’s must when comes to managing MySQL databases, and phpmanager, can be used to import .htaccess files to web.config and there are many other tools you can use to administer your site. There are extensions to get logs of your site, file and image minifiers and many more.

Try and let me know your experience. Have fun with Azure Extensions!! 😊
