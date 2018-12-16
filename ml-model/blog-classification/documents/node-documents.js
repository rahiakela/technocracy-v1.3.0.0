module.exports.getNodeDocuments = () => {

    const doc1 = `
        Node.js is a platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
        Node.js is an open source, cross-platform runtime environment for developing server-side and networking applications. Node.js applications are written in JavaScript, and can be run within the Node.js runtime on OS X, Microsoft Windows, and Linux.
        Node.js also provides a rich library of various JavaScript modules which simplifies the development of web applications using Node.js to a great extent.
        All APIs of Node.js library are asynchronous, that is, non-blocking. It essentially means a Node.js based server never waits for an API to return data. The server moves to the next API after calling it and a notification mechanism of Events of Node.js helps the server to get a response from the previous API call.
        Node.js uses a single threaded model with event looping. Event mechanism helps the server to respond in a non-blocking way and makes the server highly scalable as opposed to traditional servers which create limited threads to handle requests. Node.js uses a single threaded program and the same program can provide service to a much larger number of requests than traditional servers like Apache HTTP Server.
        Node.js came into existence when the original developers of JavaScript extended it from something you could only run in the browser to something you could run on your machine as a standalone application.
        Both your browser JavaScript and Node.js run on the V8 JavaScript runtime engine. This engine takes your JavaScript code and converts it into a faster machine code. Machine code is low-level code which the computer can run without needing to first interpret it.
        Node.js runs JavaScript code. This means that millions of frontend developers that already use JavaScript in the browser are able to run the server-side code and frontend-side code using the same programming language without the need to learn a completely different tool.
        Node provides non-blocking I/O primitives, and generally, libraries in Node.js are written using non-blocking paradigms, making a blocking behavior an exception rather than the normal.
        When Node.js needs to perform an I/O operation, like reading from the network, access a database or the filesystem, instead of blocking the thread Node.js will simply resume the operations when the response comes back, instead of wasting CPU cycles waiting.
    `;
    const doc2 = `
        Node.js is a low-level platform, and to make things easier and more interesting for developers thousands of libraries were built upon Node.js.
        As the former corporate steward of Node.js, co-founder of the Node.js Foundation, and one of its largest-scale production users, Joyent is uniquely equipped to deliver the highest level of support for powerful application frameworks and APIs.
        Based on Google’s V8 JavaScript engine, Node.js allows developers to build scalable, real-time web applications with two-way connections between the client and server. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, which makes it perfect for data-intensive real-time applications that run across distributed devices. The Bitnami Node.js package includes the latest version of Node.js, Apache, Python, and Redis.
        Node.js has quickly become the de facto standard for creating web applications and SaaS products. Node.js frameworks such as Express, Sails, and Socket.IO allow users to quickly bootstrap applications and focus only on the business logic.
        Node.js owes much to JavaScript for its enormous popularity. JavaScript is a multiparadigm language that supports many different styles of programming, including functional programming, procedural programming, and object-oriented programming. It allows the developer to be flexible and take advantage of the various programming styles.
        But JavaScript can be a double-edged sword. The multiparadigm nature of JavaScript means that nearly everything is mutable. Thus, you can’t brush aside the probability of object and scope mutation when writing Node.js code. Because JavaScript lacks tail call optimization (which allows recursive functions to reuse stack frames for recursive calls), it’s dangerous to use recursion for large iterations. In addition to pitfalls like these, Node.js is single threaded, so it’s imperative for developers to write asynchronous code.
        JavaScript can be a boon if used with care—or a bane if you are reckless. Following structured rules, design patterns, key concepts, and basic rules of thumb will help you choose the optimal approach to a problem. Which key concepts should Node.js programmers understand? Below I’ll share the 10 JavaScript concepts that I believe are most essential to writing efficient and scalable Node.js code.
        Node.js plays an increasingly critical role in the technology stack of many high-profile companies.
    `;
   const doc3 = `
      In simple terms, Node.js is a program we can use to execute JavaScript on our computers — making it a JavaScript runtime. It’s commonly used to run various build tools designed to automate the process of developing a modern JavaScript application. Node.js is also used for running server-side JavaScript.
      Node.js is particularly suited to building applications that require some form of real-time interaction or collaboration. It’s also a good fit for building APIs where you’re handling lots of requests that are I/O driven.
      Node.js brings various advantages. It’s fast and scalable. You can use it both in the browser and on the server, meaning you can do everything with one language. It speaks JSON, arguably the most important data exchange format on the Web. And it’s JavaScript!
      You can start by finding out what Node is and how you can use it. Or you might prefer to get a more hands-on introduction by rolling up your sleeves and just having some fun with Node.js. And if books are your thing, check out Jump Start Node.js.
      It’s also a good idea to get familiar with npm, Node’s package manager, which helps you install the vast array of Node-based tools that have evolved to transform the face of front-end development.
       
  `;

   const doc4 = `
      Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
      Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.
      You define routing using methods of the Express app object that correspond to HTTP methods; for example, app.get() to handle GET requests and app.post to handle POST requests. For a full list, see app.METHOD. You can also use app.all() to handle all HTTP methods and app.use() to specify middleware as the callback function.
      Express supports methods that correspond to all HTTP request methods: get, post, and so on. For a full list, see app.METHOD.
      Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
      When running an Express app behind a proxy, set (by using app.set()) the application variable trust proxy to one of the values listed in the following table.
      Express 4 is a breaking change from Express 3. That means an existing Express 3 app will not work if you update the Express version in its dependencies.
      Express 5.0 is still in the alpha release stage, but here is a preview of the changes that will be in the release and how to migrate your Express 4 app to Express 5.
      Express 5 is not very different from Express 4: The changes to the API are not as significant as from 3.0 to 4.0. Although the basic API remains the same, there are still breaking changes; in other words an existing Express 4 program might not work if you update it to use Express 5.
      Express 5 no longer supports the app.del() function. If you use this function an error is thrown. For registering HTTP DELETE routes, use the app.delete() function instead.
   `;

   const nodeDocuments = [
       doc1, doc2, doc3, doc4
   ];

   return nodeDocuments;
};