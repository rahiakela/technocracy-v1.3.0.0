
module.exports.getReduxNgrxRxjsDocuments = () => {
    const doc1 = `
       Redux is a predictable state container for JavaScript apps.You can use Redux together with React, or with any other view library. It is tiny (2kB, including dependencies), but has a large ecosystem of addons available.
       Redux is available as a package on NPM for use with a module bundler or in a Node application.
       Redux itself is small and unopinionated. We also have a separate package called redux-starter-kit, which includes some opinionated defaults that help you use Redux more effectively.
       Whether you're a brand new Redux user setting up your first project, or an experienced user who wants to simplify an existing application, redux-starter-kit can help you make your Redux code better.
       The Redux repository contains several example projects demonstrating various aspects of how to use Redux. Almost all examples have a corresponding CodeSandbox sandbox. This is an interactive version of the code that you can play with online.
       We have a variety of resources available to help you learn Redux, no matter what your background or learning style is.
       Once you've picked up the basics of working with actions, reducers, and the store, you may have questions about topics like working with asynchronous logic and AJAX requests, connecting a UI framework like React to your Redux store, and setting up an application to use Redux.
       Redux is a valuable tool for organizing your state, but you should also consider whether it's appropriate for your situation. Don't use Redux just because someone said you should - take some time to understand the potential benefits and tradeoffs of using it.
       Don't be fooled by all the fancy talk about reducers, middleware, store enhancers—Redux is incredibly simple. If you've ever built a Flux application, you will feel right at home. If you're new to Flux, it's easy too!
       Actions are payloads of information that send data from your application to your store. They are the only source of information for the store.
       Reducers specify how the application's state changes in response to actions sent to the store. Remember that actions only describe what happened, but don't describe how the application's state changes.
       In Redux, all the application state is stored as a single object. It's a good idea to think of its shape before writing any code. What's the minimal representation of your app's state as an object?
       The Store is the object that brings them together. The store has the following responsibilities. 
    `;
    const doc2 = `
       Store is RxJS powered state management for Angular applications, inspired by Redux. Store is a controlled state container designed to help write performant, consistent applications on top of Angular.
       Actions are one of the main building blocks in NgRx. Actions express unique events that happen throughout your application. From user interaction with the page, external interaction through network requests, and direct interaction with device APIs, these and more events are described with actions.
       Actions are used in many areas of NgRx. Actions are the inputs and outputs of many systems in NgRx. Actions help you to understand how events are handled in your application. This guide provides general rules and examples for writing actions in your application.
       Reducers in NgRx are responsible for handling transitions from one state to the next state in your application. Reducer functions handle these transitions by determining which actions to handle based on the type.
       Selectors are pure functions used for obtaining slices of store state. @ngrx/store provides a few helper functions for optimizing this selection. Selectors provide many features when selecting slices of state.
       @ngrx/store composes your map of reducers into a single reducer.
        Developers can think of meta-reducers as hooks into the action->reducer pipeline. Meta-reducers allow developers to pre-process actions before normal reducers are invoked.
        Use the metaReducers configuration option to provide an array of meta-reducers that are composed from right to left.Note: Meta-reducers in NgRx are similar to middleware used in Redux.
        The Effect decorator provides metadata to register observable side-effects in the effects class. Registered effects provide new actions provided by the source Observable to the store.
        Entity State adapter for managing record collections.Entity provides an API to manipulate and query entity collections.
        NgRx is a framework for building reactive applications in Angular. NgRx provides state management, isolation of side effects, entity collection management, router bindings, code generation, and developer tools that enhance developers experience when building many different types of applications.
    `;
    const doc3 = `
       RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.
       ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events.
       The essential concepts in RxJS which solve async event management are:
        Observable: represents the idea of an invokable collection of future values or events.
        Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
        Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
        Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.
        Subject: is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
        Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.
        Observables are lazy Push collections of multiple values. They fill the missing spot in the following table:
        RxJS introduces Observables, a new Push system for JavaScript. An Observable is a Producer of multiple values, "pushing" them to Observers (Consumers).
        Contrary to popular claims, Observables are not like EventEmitters nor are they like Promises for multiple values. Observables may act like EventEmitters in some cases, namely when they are multicasted using RxJS Subjects, but usually they don't act like EventEmitters.
        What is a Subscription? A Subscription is an object that represents a disposable resource, usually the execution of an Observable. A Subscription has one important method, unsubscribe, that takes no argument and just disposes the resource held by the subscription. In previous versions of RxJS, Subscription was called "Disposable".
        Subscriptions can also be put together, so that a call to an unsubscribe() of one Subscription may unsubscribe multiple Subscriptions. You can do this by "adding" one subscription into another.
        A Subscription essentially just has an unsubscribe() function to release resources or cancel Observable executions.
        What is a Subject? An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.
        Every Subject is an Observable. Given a Subject, you can subscribe to it, providing an Observer, which will start receiving values normally. From the perspective of the Observer, it cannot tell whether the Observable execution is coming from a plain unicast Observable or a Subject.
        Internally to the Subject, subscribe does not invoke a new execution that delivers values. It simply registers the given Observer in a list of Observers, similarly to how addListener usually works in other libraries and languages.
        Every Subject is an Observer. It is an object with the methods next(v), error(e), and complete(). To feed a new value to the Subject, just call next(theValue), and it will be multicasted to the Observers registered to listen to the Subject.
    `;
    const doc4 = `
        Reactive programming is an asynchronous programming paradigm concerned with data streams and the propagation of change (Wikipedia). RxJS (Reactive Extensions for JavaScript) is a library for reactive programming using observables that makes it easier to compose asynchronous or callback-based code (RxJS Docs).
        RxJS provides an implementation of the Observable type, which is needed until the type becomes part of the language and until browsers support it. The library also provides utility functions for creating and working with observables. These utility functions can be used for:
        Converting existing code for async operations into observables.Iterating through the values in a stream.Mapping values to different types
        Filtering streams.Composing multiple streams.RxJS offers a number of functions that can be used to create new observables. These functions can simplify the process of creating observables from things such as events, timers, promises, and so on.
        Angular provides an EventEmitter class that is used when publishing values from a component through the @Output() decorator. EventEmitter extends Observable, adding an emit() method so it can send arbitrary values. When you call emit(), it passes the emitted value to the next() method of any subscribed observer.
        RxJS is one of the hottest libraries in web development today. Offering a powerful, functional approach for dealing with events and with integration points into a growing number of frameworks, libraries, and utilities, the case for learning Rx has never been more appealing. Couple this with the ability to utilize your knowledge across nearly any language, having a solid grasp on reactive programming and what it can offer seems like a no-brainer.
        Learning RxJS and reactive programming is hard. There's the multitude of concepts, large API surface, and fundamental shift in mindset from an imperative to declarative style. This site focuses on making these concepts approachable, the examples clear and easy to explore, and features references throughout to the best RxJS related material on the web. The goal is to supplement the official docs and pre-existing learning material while offering a new, fresh perspective to clear any hurdles and tackle the pain points. Learning Rx may be difficult but it is certainly worth the effort!    
    `;
    const doc5 = `
        Operators are the horse-power behind observables, providing an elegant, declarative solution to complex asynchronous tasks. This section contains all RxJS operators, included with clear, executable examples in both JSBin and JSFiddle. Links to additional resources and recipes for each operator are also provided, when applicable.
        Without a solid base knowledge of how Observables work behind the scenes, it's easy for much of RxJS to feel like 'magic'. This section helps solidify the major concepts needed to feel comfortable with reactive programming and Observables.
        New to RxJS and reactive programming? In addition to the content found on this site, these excellent articles and videos will help jump start your learning experience!
        Reactive Extensions for JavaScript (RxJS) is a reactive streams library that allows you to work with asynchronous data streams. RxJS can be used both in the browser or in the server-side using Node.js.
        In this post we are going to introduce RxJS basic concepts and how we can use them with AngularJS.Asynchronous data streams are not new. They have been around since Unix systems, and come in different flavours and names: streams (Node.js), pipes (Unix) or async pipes (Angular 2).
        In this example, we used an Observable (rx.Observable) followed by a chain of operators ending with a call to subscribe.
        RxJS combines Observables and Operators so we can subscribe to streams and react to changes using composable operations. Let’s introduce these concepts in more detail.
        Observables get their name from the Observer design pattern. The Observable sends notifications while the Observer receives them. Let’s create a simple Observer.
        RxJS plays well with Angular but instead of writing your own helper functions to bridge the two you can use rx.angular.js, a dedicated library for RxJS and AngularJS interoperability.
        Another common use case for RxJS are DOM-events. Let’s build a simple idle user feature using RxJS and Angular. In order to use DOM-events we will use Rx.DOM (HTML DOM bindings for RxJS) through rx.angular.           
    `;

    const reduxNgrxRxjsDocuments = [
        doc1, doc2, doc3, doc4, doc5
    ];

    return reduxNgrxRxjsDocuments;
};
