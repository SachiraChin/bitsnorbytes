---
title: "Visual Studio 2015: npm, Bower and Grunt – Part 1"
date: "2015-03-06"
draft: false
path: "/visual-studio-2015-npm-bower-and-grunt-part-1"
legacy: true
archiveUrl: https://web.archive.org/web/20150811084242/http://bitsnorbytes.com/2015/03/visual-studio-2015-npm-bower-and-grunt-part-1/
---

Few days back Microsoft released Visual Studio 2015 CTP 6, I have been using Visual Studio 2015 since the early previews and when it comes to new changes they brought to Visual Studio and Microsoft ecosystem, it’s mind blowing. It’s really nice to see where the company goes with all the new things.

But this blog post series not about Microsoft change, it’s about three small components they integrated to Visual Studio 2015. These were there in Visual Studio 2013 as well but wasn’t inbuilt. Those are `npm`, `Grunt`, and `bower`. This blog post is for people who have trouble understanding what these are and would like to use these in Visual Studio 2015. First I’ll give introduction to each component and then I’ll show you how to use it in Visual Studio 2015. This blog post is purely used to describe each component and what are key features in each component. In next blog post, I shall describe how to use each in Visual Studio 2015. If you know what these are, you may skip to next post.

1. Visual Studio 2015: npm, Bower, and Grunt – Introduction
2. Visual Studio 2015: npm, Bower, and Grunt – Practical usage

## Package Managers

Before I talk about each component, I want to talk little bit about package managers. Think of a scenario where you develop an application which uses external libraries. In early days, what we have done was to go to developer site and download required library and add it to our project as a reference. There are two major questions we face when we download libraries from websites.

- What about dependencies?
- What if this packages got updated?

Usually we get all dependencies from developer site, but it really can be a headache to add those to project. And about updates, we usually won’t check developer site for updates if it isn’t absolutely necessary. You may argue that updating the package may break the code, true there’s possibility for that. But what if there’s critical update in the package, may be security related, or change in back-end API which got updated in library, we don’t have any option but to update the package. Issue is, in such scenario we may not know the required change until our application starts to fail.

This is where package manager comes in. We can use the package manager to download and install required library to our project. Package manager will automatically download and install dependencies. When an update comes, the package manager will notify us about the update, if we need, we can update it, if we think it’s not necessary we can ignore it too. But at least we know we ignored it and we know what we are getting into, this is much better than not being aware of it.

One package manager we used since Visual Studio 2010 is NuGet package manager.

## npm

`npm` is a package manager for JavaScript. Note that `npm` only works for JavaScript libraries, in `npm` context, we all these libraries as packages. Limitation is we only can use `npm` to install these predefined packages which supplied by a repository. If we want something other than these packages, we can’t use `npm` for that task. Now you may ask, what do we need other than these packages, if this is such a sophisticated system, it should have all the libraries we want right? Answer is Yes and No.

Yes, because it has almost every commonly used JavaScript library in it. No, because if we want any other library which have html, css or images we can’t use `npm` for that. To understand the reason for this, we should dig into the concept of npm and understand what’s really behind it.

Even though we only see npm in Visual Studio, it really comes with Node.js. Now you may hear about Node.js, it is a server side JavaScript engine (like Apache, IIS). When we install Node.js, `npm` comes as default package manager for Node.js. When it comes to Visual Studio `npm` integration, we use `npm` to install developer dependency libraries. For example, we use npm to install both `Grunt` and `bower`.

When we work with `npm`, understanding package.json is very important. package.json is the file which contains settings for given `npm` package. In our context, this file contains `npm` settings for our project.When we use `npm` with node.js, name and version required and plays a major role, but in our case, even though those are required, it doesn’t matter what the values are. What we have to worry is devDependencies property of the configuration. There are actually two types of dependencies in `npm`, those are application dependencies (dependencies) and developer dependencies (devDependencies). Difference between these two is, application dependencies will get published to your build output, developer dependencies only work on developer environment, they will not get published to build output.

One special thing to note in `npm` dependencies is that, we can use nested dependency libraries inside our application. This can cause duplication of libraries inside the application. This can be both advantage and disadvantage given the scenario.

```json
{
  "name": "WebApplication",
  "version": "0.0.0",
  "devDependencies": {
    "grunt": "^0.4.5",
    "grunt-bower-task": "^0.4.0",
    "vows": "^0.7.0",
    "assume": "&lt;1.0.0 || &gt;=2.3.1 &lt;2.4.5 || &gt;=2.5.2 &lt;3.0.0",
    "pre-commit": "*"
  },
  "dependencies": {
    "primus": "*",
    "async": "~0.8.0",
    "express": "4.2.x",
    "winston": "git://github.com/flatiron/winston#master",
    "bigpipe": "bigpipe/pagelet",
    "plates": "https://github.com/flatiron/plates/tarball/master"
  }
}
```

There are few annotations you should know when mentioning version of the package you are going to use. I will describe each annotation below.

Version | Description of version
:-------------------------:|:-------------------------:
*|any version
(empty string)|any version
1.2.5|must match the exact version given
>1.2.5|must be greater than given version
>=1.2.5|must be greater than or equal to given version
<1.2.5|must be lesser than given version
<=1.2.5|must be lesser than or equal to given version
~1.2.5|should approximately equal to given version
^1.2.5|must compatible with given version
1.2.x|must be subversion of 1.2 (not 1.3 or 1.4)
1.2.3 – 1.2.7 (range)| must be between given range (>=1.2.3 and <=1.2.7)
range1 \|\| range2 \|\| range3|must satisfy one of range given range
http://……..|url must point to tarball, tarball will be downloaded and installed to project (ex: http://bitsnorbytes.com/packages/abc.tar.gz)
git…..|	git project will be downloaded and installed to project, ex:<br />git://github.com/user/project.git#commit-ish<br />git+ssh://user@hostname:project.git#commit-ish<br />git+ssh://user@hostname/project.git#commit-ish<br />git+http://user@hostname/project/blah.git#commit-ish<br />git+https://user@hostname/project/blah.git#commit-ish
user\repository|download given repository from given user at GitHub
file:…..|get package inside give folder. Folder must be either relative to project or absolute path

When we use npm in Visual Studio 2015, ASP.NET 5 projects, we only use devDependencies, there isn’t any restriction not to use dependencies in the project, but we have alternative way to manage application or client dependencies.

You can read more about package.json properties and specifically about dependencies property from below URLs.

- [https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)
- [https://docs.npmjs.com/files/package.json#dependencies](https://docs.npmjs.com/files/package.json#dependencies)
- [http://browsenpm.org/package.json](http://browsenpm.org/package.json)

## Bower

I think you may have idea about what `bower` is. It’s simply the tool which we use to install any library which going to need to application itself. This is the description given for library in official site.

<blockquote class="wp-block-ugb-blockquote ugb-blockquote ugb-blockquote--v2 ugb--background-opacity-5 ugb-blockquote--design-plain"><div class="ugb-content-wrapper"><svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" style="fill:;width:70px;height:70px"><path d="M19.8 9.3C10.5 11.8 4.6 17 2.1 24.8c2.3-3.6 5.6-5.4 9.9-5.4 3.3 0 6 1.1 8.3 3.3 2.2 2.2 3.4 5 3.4 8.3 0 3.2-1.1 5.8-3.3 8-2.2 2.2-5.1 3.2-8.7 3.2-3.7 0-6.5-1.2-8.6-3.5C1 36.3 0 33.1 0 29 0 18.3 6.5 11.2 19.6 7.9l.2 1.4zm26.4 0C36.9 11.9 31 17 28.5 24.8c2.2-3.6 5.5-5.4 9.8-5.4 3.2 0 6 1.1 8.3 3.2 2.3 2.2 3.4 4.9 3.4 8.3 0 3.1-1.1 5.8-3.3 7.9-2.2 2.2-5.1 3.3-8.6 3.3-3.7 0-6.6-1.1-8.6-3.4-2.1-2.3-3.1-5.5-3.1-9.7 0-10.7 6.6-17.8 19.7-21.1l.1 1.4z"></path></svg><p class="ugb-blockquote__text" style="color:">
Bower works by fetching and installing packages from all over, taking care of hunting, finding, downloading, and saving the stuff you’re looking for. Bower keeps track of these packages in a manifest file, `bower.json`.</p></div></blockquote>

Unlike `npm` `bower` designed to work specifically for client side libraries. Still you don’t feel like it doesn’t justify the reason to use `bower` instead of all other libraries right? Main reason to use `bower` to client side libraries is because it doesn’t support nested hierarchy of libraries. It only support flat hierarchy and does not allow duplicates. In other words, you never can add multiple versions of same library for one project.

Same like `npm`, `bower` also have a configuration file.

```json
{
    "name": "WebApplication",
    "private": true,
    "dependencies": {
        "bootstrap": "~3.0.0",
        "jquery": "~1.10.2",
        "jquery-validation": "~1.11.1",
        "jquery-validation-unobtrusive": "~3.2.2"
    },
    "exportsOverride": {
        "bootstrap": {
            "js": "dist/js/*.*",
            "css": "dist/css/*.*",
            "fonts": "dist/fonts/*.*"
        },
        "jquery": {
            "js": "jquery.{js,min.js,min.map}"
        },
        "jquery-validation": {
            "": "jquery.validate.js"
        },
        "jquery-validation-unobtrusive": {
            "": "jquery.validate.unobtrusive.{js,min.js}"
        }
    }
}
```

In `bower.json` file, name is the name of the application. Property `private` is to inform bower that this application is a private application and not to publish it to bower registry (if application get registered in bower registry, other users can download application using bower). We can list all dependencies in `dependencies` property. We can use same version annotations as `npm` inside this to mention version of library. What specific to `bower` is the property `exportsOverride`. This property tells bower what kind of files should be downloaded from each package. This gives developer flexibility remove unwanted files from the package before deployment.

## Grunt

Grunt is a JavaScript based task runner. We can use task runners to run predefined set of tasks repetitively on a project. A task can be either minifiying JavaScript, CSS files, compiling, unit testing or may be check code for errors (linting). For `Grunt` also we have separate configuration file called Gruntfile. But unlike npm and `bower`, configuration file for `Grunt` can be either a JavaScript or CoffeeScript file. In Visual Studio we use `gruntfile.js` file to configure Grunt.

```js
module.exports = function (grunt) {
    grunt.initConfig({
        bower: {
            install: {
                options: {
                    targetDir: "wwwroot/lib",
                    layout: "byComponent",
                    cleanTargetDir: false
                }
            }
        }
    });

    // This command registers the default task which will install bower packages into wwwroot/lib
    grunt.registerTask("default", ["bower:install"]);

    // The following line loads the grunt plugins.
    // This line needs to be at the end of this this file.
    grunt.loadNpmTasks("grunt-bower-task");
};
```

There are few sections in `Gruntfile` we need to understand. First part is the wrapper function. This function encapsulates the `Grunt` configuration.

```js
module.exports = function (grunt) {

};
```

This function also a comes from `node.js`, if I quote definition from `node.js` documentation,

<blockquote class="wp-block-ugb-blockquote ugb-blockquote ugb-blockquote--v2 ugb--background-opacity-5 ugb-blockquote--design-plain"><div class="ugb-content-wrapper"><svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" style="fill:;width:70px;height:70px"><path d="M19.8 9.3C10.5 11.8 4.6 17 2.1 24.8c2.3-3.6 5.6-5.4 9.9-5.4 3.3 0 6 1.1 8.3 3.3 2.2 2.2 3.4 5 3.4 8.3 0 3.2-1.1 5.8-3.3 8-2.2 2.2-5.1 3.2-8.7 3.2-3.7 0-6.5-1.2-8.6-3.5C1 36.3 0 33.1 0 29 0 18.3 6.5 11.2 19.6 7.9l.2 1.4zm26.4 0C36.9 11.9 31 17 28.5 24.8c2.2-3.6 5.5-5.4 9.8-5.4 3.2 0 6 1.1 8.3 3.2 2.3 2.2 3.4 4.9 3.4 8.3 0 3.1-1.1 5.8-3.3 7.9-2.2 2.2-5.1 3.3-8.6 3.3-3.7 0-6.6-1.1-8.6-3.4-2.1-2.3-3.1-5.5-3.1-9.7 0-10.7 6.6-17.8 19.7-21.1l.1 1.4z"></path></svg><p class="ugb-blockquote__text" style="color:">
The module.exports object is created by the Module system. Sometimes this is not acceptable; many want their module to be an instance of some class. To do this, assign the desired export object to module.exports. Note that assigning the desired object to exports will simply rebind the local exports variable, which is probably not what you want to do.</p></div></blockquote>

In simple terms, if we want to expose something inside script file to use outside of file it self, we can use module.export to do that task. You can learn more about functions of `module.export` from [this](http://www.sitepoint.com/understanding-module-exports-exports-node-js) blog post.

Second part of `Gruntfile` to understand is the `grunt.initConfig` section.

```js
grunt.initConfig( {
    bower: {
        install: {
            options: {
                targetDir: "wwwroot/lib",
                layout: "byComponent",
                cleanTargetDir: false
            }
        }
    }
});
```

As method name says, this initialize the `Grunt` configuration for each task. For example in here it configures `bower` task. Now the question you should have is what is a task and how we configure them. When it comes to `Grunt` a task can be anything. We can create tasks as we desire. In Visual Studio 2015 web project, it only configure the `bower` task. If you check little bit below, you can see how it create new task.

```js
grunt.registerTask("default", ["bower:install"]);
```

From this line it says that `Grunt` should register `bower` task passing `install` parameter to it. Basic syntax of registering task is,

```js
grunt.registerTask(taskName, [description, ] taskList)
```

You can enter a task name, this is actually a task collection name, whenever you load tasks with this name, Grunt will run all the tasks registered under this name. Task description is optional. When you name a task, you can name parameters of the task using “:” notation. For example, `bower:install`, in here task name is bower and parameter is install.

And final line of `Gruntfile`,

```js
grunt.loadNpmTasks("grunt-bower-task");
```

This allows up to manage bower packages through `Grunt`, for example, minifying, testing and testing packages through tasks.

This is the end of the introduction to `npm`, `bower`, and `Grunt`. I’ll talk more about how to use these in Visual Studio 2015 in my next post.
