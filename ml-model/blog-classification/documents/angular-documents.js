
module.exports.getAngularDocuments = () => {
    const doc1 = `
        The 7.0.0 release of Angular is here! This is a major release spanning the entire platform, including the core framework, Angular Material, and the CLI with synchronized major versions. This release contains new features for our tool chain, and has enabled several major partner launches.
        Visit update.angular.io for detailed information and guidance on updating your application, but thanks to the work we did in v6, updating to v7 should be one command for most developers.
        The CLI will now prompt users when running common commands like ng new or ng add @angular/material to help you discover built-in features like routing or SCSS support.
        CLI Prompts have been added to Schematics, so any package publishing Schematics can take advantage of them by adding an x-prompt key to a Schematics collection.
        Continuing our focus on performance, we analyzed common mistakes across the ecosystem. We discovered that many developers were including the reflect-metadata polyfill in production, which is only needed in development.
        To fix this, part of the update to v7 will automatically remove this from your polyfills.ts file, and then include it as a build step when building your application in JIT mode, removing this polyfill from production builds by default.
        Material Design received a big update in 2018. Angular Material users updating to v7 should expect minor visual differences reflecting the updates to the Material Design specification.
        Newly added to the CDK, you can now take advantage of Virtual Scrolling and Drag and Drop by importing the DragDropModule or the ScrollingModule.
        Virtual Scrolling loads and unloads elements from the DOM based on the visible parts of a list, making it possible to build very fast experiences for users with very large scrollable lists.
        Angular Elements now supports content projection using web standards for custom elements.
        Angular owes a huge amount of its success to the community, and to that end we’ve been working to partner with several community projects that have launched recently.
        Angular Console — A downloadable console for starting and running Angular projects on your local machine
        @angular/fire — AngularFire has a new home on npm, and has its first stable release for Angular
        NativeScript — It’s now possible to have a single project that builds for both web and installed mobile with NativeScript
        StackBlitz — StackBlitz 2.0 has been released and now includes the Angular Language Service, and more features like tabbed editing.
    `;
    const doc2 = `
        The most recent release of Angular adds lots of new features to the CLI that make it easier for you to update and add new features to your app. The recent WebStorm 2018.2 major update adds integration with these new CLI commands. Let’s have a look at these and some other new features in action!
        To start off, we will create an Angular app with Angular CLI.
        You can always create a new Angular project from the IDE’s Welcome screen: click Create new project, then select Angular CLI from the list on the left, name your new project and click Create. WebStorm will use the Angular CLI installed globally on your machine or use its latest version via npx.
        With the Angular Schematic action, you can use schematics, which are special scripts that can generate the code for things like new components, directives, and services etc. These are the standard schematics that come with Angular CLI itself which you could use in WebStorm for some time already.
        Now the list also includes the schematics provided by other dependencies, e.g. Angular Material.
        Let’s add a Material dashboard to our app: use Find Action (Cmd-Shift-A/Ctrl+Shift+A) — Angular Schematic or in the Project view, press Cmd-N/Alt+Insert and select Angular Schematic and then select materialDashboard from the list. Specify the name of the component, you can also pass additional configuration options.
        WebStorm ships a collection of Angular code snippets developed by John Papa and these snippets were also updated for the Angular 6 release.
        To sum it all up, the new WebStorm 2018.2 improves a lot its integration with Angular CLI: you can now use the IDE actions instead of the command line to add new dependencies to your Angular app with ng add, and generate code using Angular Schematics. In addition to this, it’s now easier to rename the components and debug your app in WebStorm.
    `;
    const doc3 = `
        This post will be a complete practical guide for getting started with Angular Universal.
        We are going to go start with an existing Angular application, and we will progressively turn it into an Angular Universal application while explaining every step along the way!
        Then we will start by using the Angular CLI to quickly add an Universal bundle to an existing application. We will then write step-by-step our own Angular Universal Express Server from scratch!
        We will make our application search engine (SEO) friendly and compatible with social media crawlers (for example Facebook or Twitter).
        We will then show how to implement a couple of commonly used Angular Universal performance optimizations.
        we will implement a fine-grained Application Shell for selectively server-side render only some of the content (depending on the page).
        we will further optimize the application startup experience by leveraging the Angular State Transfer API.
        In a nutshell, Angular Universal is a Pre-Rendering solution for Angular.
        When we use Angular Universal, we will render the initial HTML and CSS shown to the user ahead of time. We can do it for example at build time, or on-the-fly on the server when the user requests the page.
        With Angular Universal, instead of a blank index.html page we will be able to quickly show something to the user, by rendering the HTML on the server and sending that on the first request.
        So that is another reason for using Angular Universal: improving the social media presence of our application. And with this, we now have a good understanding of when to use Angular Universal and why!
        Let's then start using Angular Universal in an existing Angular Application.
        Let's then start by adapting the application to enable it to build an Angular Universal bundle. We can quickly add an Universal bundle to our application by running the following Angular CLI command.
        The best way to understand how Angular Universal works is to simply take the universal bundle and use it to output, for example, the main root route of our application.
        Let's talk first about the problem that the State Transfer API solves. When our Angular Universal application starts, a large part of the page was already rendered and is visible to the user from the beginning.
        We have also finished turning this plain Angular Application into an Universal application! Let's now summarize all that we have learned and highlight the key points.    
    `;
    const doc4 = `
        In this post, we are going to go through a complete example of how to implement Web Push Notifications in an Angular Application using the Angular Service Worker.
        These notifications can even be displayed to the user if all application tabs are closed, thanks to Service Workers! When well used, Push notifications are a great way of having our users re-engage with our application.
        The first thing that we will need is the Angular Service Worker, and for that here is a guide for how to add it to an existing Angular application.
        Once we have the Angular Service Worker installed, we can now request the user permission for sending Push Notifications.
        In order for the Angular Service Worker to correctly display the message, we need to use the format shown in the code.
        With the Angular Service Worker and the Angular CLI built-in PWA support, it's now simpler than ever to make our web application downloadable and installable, just like a native mobile application.
        This file is the Angular Service Worker itself. Like all Service workers, it get's delivered via its own separate HTTP request so that the browser can track if it has changed, and apply it the Service Worker Lifecycle.
        This is the runtime configuration file, that the Angular Service worker will use. This file is built based on the ngsw-config.json file, and contains all the information needed by the Angular Service Worker to know at runtime about which files it needs to cache, and when.
        The Angular Service Worker is going to load these files either proactively in the case of install mode prefetch, or as needed in the case of install mode lazy, and it will also store the files in Cache Storage.
        This loading is going to happen in the background, as the user first loads the application. The next time that the user refreshes the page, then the Angular Service Worker is going to intercept the HTTP requests, and will serve the cached files instead of getting them from the network.
        The Angular Service Worker will then know that this file has a new version available on the server that needs to be loaded at the appropriate time.
        The Angular Service Worker will start serving the application files the next time you load the page. Try to hit refresh, you will likely notice that the application starts much faster.
        But in general, calling checkForUpdate() manually is not necessary because the Angular Service Worker will look for a new version of ngsw.json on each full application reload, for consistency with the standard Service Worker Lifecycle.
        I hope that this post helps with getting started with the Angular Service Worker and that you enjoyed it! If you want to learn more about other Angular PWA features, have a look at the other posts of the complete series.
    `;
    const doc5 = `
        In this post, we are going to go through a complete example of how to build a custom dialog using the Angular Material Dialog component.
        We are going to cover many of the most common use cases that revolve around the Angular Material Dialog, such as: common dialog configuration options, passing data into the dialog, receiving data back, and dialog layout options.
        The class MatDialogConfig allows us to define a lot of configuration options. Besides the two that we have overridden, here are some other commonly used Material Dialog options.
        The content of this component could also be anything, and there is no need to use any of the auxiliary Angular Material directives. We could build the body of the dialog out of plain HTML and CSS if needed.
        I hope that this post helps with getting started with the Angular Material Dialog and that you enjoyed it! If you have some questions or comments please let me know in the comments below and I will get back to you.
        To get notified of upcoming posts on Angular Material and other Angular topics, I invite you to subscribe to our newsletter.
        Here is what we will do in this post: we are going to scaffold an Angular application from scratch from an empty folder, and we will add it an Application Shell that will be automatically generated at build time using the Angular CLI.
        In order to do pre-rendering in Angular, we will need Angular Universal. Let's then scaffold an Angular Universal application, that contains the same components as our client-side single page application.
        Although this App shell mechanism is usually tied to PWAs, a PWA is not necessary to benefit from the App Shell Angular CLI features, as these two progressive improvements are configurable separately.
        The built-in App Shell mechanism in the Angular CLI is a hugely beneficial performance improvement for any application (not only mobile), that is working right out of the box.
        I hope that this post helps with getting started with the Angular App Shell and that you enjoyed it! If you want to learn more about other Angular PWA features, have a look at the other posts of the complete series.
    `;

    const angularDocuments = [
        doc1, doc2, doc3, doc4, doc5
    ];

    return angularDocuments;
};
