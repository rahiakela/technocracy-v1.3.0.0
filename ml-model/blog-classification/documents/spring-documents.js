
module.exports.getSpringDocuments = () => {
    const doc1 = `
        Spring is a lightweight framework. It can be thought of as a framework of frameworks because it provides support to various frameworks such as Struts, Hibernate, Tapestry, EJB, JSF etc. The framework, in broader sense, can be defined as a structure where we find solution of the various technical problems.
        The Spring framework comprises several modules such as IOC, AOP, DAO, Context, ORM, WEB MVC etc. We will learn these modules in next page. Let's understand the IOC and Dependency Injection first.
        Dependency Injection (DI) is a design pattern that removes the dependency from the programming code so that it can be easy to manage and test the application. Dependency Injection makes our programming code loosely coupled. To understand the DI better, Let's understand the Dependency Lookup (DL) first:
        We can inject the dependency by constructor. The <constructor-arg> subelement of <bean> is used for constructor injection. Here we are going to inject.
        We can inject the dependency by setter method also. The <property> subelement of <bean> is used for setter injection. Here we are going to inject.
        Autowiring feature of spring framework enables you to inject the object dependency implicitly. It internally uses setter or constructor injection.
        The constructor mode injects the dependency by calling the constructor of the class. It calls the constructor having large number of parameters.
        The Spring Framework is an application framework and inversion of control container for the Java platform. The framework's core features can be used by any Java application, but there are extensions for building web applications on top of the Java EE platform.
        Aspect Oriented Programming (AOP) compliments OOPs in the sense that it also provides modularity. But the key unit of modularity is aspect than class.
        A cross-cutting concern is a concern that can affect the whole application and should be centralized in one location in code as possible, such as transaction management, authentication, logging, security etc.
        Problem without AOP We can call methods (that maintains log and sends notification) from the methods starting with m. In such scenario, we need to write the code in all the 5 methods.
        Solution with AOP We don't have to call methods from the method. Now we can define the additional concern like maintaining log, sending notification etc. in the method of a class. Its entry is given in the xml file.
        `;
    const doc2 = `
        Spring JdbcTemplate is a powerful mechanism to connect to the database and execute SQL queries. It internally uses JDBC api, but eliminates a lot of problems of JDBC API.
        Spring JdbcTemplate eliminates all the above mentioned problems of JDBC API. It provides you methods to write the queries directly, so it saves a lot of work and time.
        We can execute parameterized query using Spring JdbcTemplate by the help of execute() method of JdbcTemplate class. To use parameterized query, we pass the instance of PreparedStatementCallback in the execute method.
        We can easily fetch the records from the database using query() method of JdbcTemplate class where we need to pass the instance of ResultSetExtractor.
        ResultSetExtractor interface can be used to fetch records from the database. It accepts a ResultSet and returns the list.The DriverManagerDataSource is used to contain the information about the database such as driver class name, connnection URL, username and password.
        There are a property named datasource in the JdbcTemplate class of DriverManagerDataSource type. So, we need to provide the reference of DriverManagerDataSource object in the JdbcTemplate class for the datasource property.
        Spring provides API to easily integrate Spring with ORM frameworks such as Hibernate, JPA(Java Persistence API), JDO(Java Data Objects), Oracle Toplink and iBATIS.
        The Spring framework provides HibernateTemplate class, so you don't need to follow so many steps like create Configuration, BuildSessionFactory, Session, beginning and committing transaction etc.
        Spring Data JPA API provides JpaTemplate class to integrate spring application with JPA.JPA (Java Persistent API) is the sun specification for persisting objects in the enterprise application. It is currently used as the replacement for complex entity beans.
        SpEL is an exression language supporting the features of querying and manipulating an object graph at runtime.There are many expression languages available such as JSP EL, OGNL, MVEL and JBoss EL. SpEL provides some additional features such as method invocation and string templating functionality.
        `;
    const doc3 = `
        A Spring MVC is a Java framework which is used to build web applications. It follows the Model-View-Controller design pattern. It implements all the basic features of a core spring framework like Inversion of Control, Dependency Injection.
        A Spring MVC provides an elegant solution to use MVC in spring framework by the help of DispatcherServlet. Here, DispatcherServlet is a class that receives the incoming request and maps it to the right resource such as controllers, models, and views.
        In Spring MVC, we can create multiple controllers at a time. It is required to map each controller class with @Controller annotation. Here, we see a Spring MVC example of multiple controllers. The steps are as follows:
        In Spring MVC, the model works a container that contains the data of the application. Here, a data can be in any form such as objects, strings, information from the database, etc.
        It is required to place the Model interface in the controller part of the application. The object of HttpServletRequest reads the information provided by the user and pass it to the Model interface. Now, a view page easily accesses the data from the model part.
        In Spring MVC, the @RequestParam annotation is used to read the form data and bind it automatically to the parameter present in the provided method. So, it ignores the requirement of HttpServletRequest object to read the provided data.
        Including form data, it also maps the request parameter to query parameter and parts in multipart requests. If the method parameter type is Map and a request parameter name is specified, then the request parameter value is converted to a Map else the map parameter is populated with all request parameter names and values.
        The Spring MVC form tags are the configurable and reusable building blocks for a web page. These tags provide JSP, an easy way to develop, read and maintain.
        `;
    const doc4 = `
        The Spring MVC form tags can be seen as data binding-aware tags that can automatically set data to Java object/bean and also retrieve from it. Here, each tag provides support for the set of attributes of its corresponding HTML tag counterpart, making the tags familiar and easy to use.
        The Spring MVC form tag is a container tag. It is a parent tag that contains all the other tags of the tag library. This tag generates an HTML form tag and exposes a binding path to the inner tags for binding.
        The Spring MVC form text field tag generates an HTML input tag using the bound value. By default, the type of the input tag is text.
        The Spring MVC form radio button allows us to choose only one option at a time. This tag renders an HTML input tag of type radio.
        CRUD (Create, Read, Update and Delete) application is the most important application for creating any project. It provides an idea to develop a large project. In spring MVC, we can develop a simple CRUD application.
        We can simply create pagination example in Spring MVC. In this pagination example, we are using MySQL database to fetch records.Spring MVC provides easy way to upload files, it may be image or other files. Let's see a simple example to upload file using Spring MVC.
        The Spring MVC Validation is used to restrict the input provided by the user. To validate the user's input, the Spring 4 or higher version supports and use Bean Validation API. It can validate both server-side as well as client-side applications.
        As Bean Validation API is just a specification, it requires an implementation. So, for that, it uses Hibernate Validator. The Hibernate Validator is a fully compliant JSR-303/309 implementation that allows to express and validate application constraints.
        `;
    const doc5 = `
        Spring provides integration support with apache tiles framework. So we can simply manage the layout of the Spring MVC application with the help of spring tiles support.
        Spring framework makes the developement of remote-enabled services easy. It saves a lot of code by providing its own API.The programmer needs to concentrate on business logic only not plumbing activities such as starting and stopping the server.
        By the help of HessianServiceExporter and HessianProxyFactoryBean classes, we can implement the remoting service provided by hessian.
        Both, Hessian and Burlap are provided by Coucho. Burlap is the xml-based alternative of Hessian.By the help of BurlapServiceExporter and BurlapProxyFactoryBean classes, we can implement the remoting service provided by burlap.
        JAXB is an acronym for Java Architecture for XML Binding. It allows java developers to map Java class to XML representation. JAXB can be used to marshal java objects into XML and vice-versa.
        It is an OXM (Object XML Mapping) or O/M framework provided by Sun.Spring framework provides many useful interfaces and classes for sending and receiving mails.The org.springframework.mail package is the root package that provides mail support in Spring framework.
        Spring framework provides an easy way to manage the dependency. It can be easily integrated with struts 2 framework.The ContextLoaderListener class is used to communicate spring application with struts 2. It must be specified in the web.xml file.
        Spring Security Tutorial provides basic and advanced concepts of Spring Security. Our Spring Security Tutorial is designed for beginners and professionals both.
        Spring Boot is a Spring module which provides RAD (Rapid Application Development) feature to Spring framework.Spring Boot Tutorial includes all topics of Spring Boot such as features, project, maven project, starter project wizard, spring Initializr, cli, application, annotations, dm, properties, starters, actuator, jpa, jdbc etc.
        `;

    const springDocuments = [
        doc1, doc2, doc3, doc4, doc5
    ];

    return springDocuments;
};
