module.exports.getHibernateDocuments = () => {

    const doc1 = `
        Before understanding hibernate framework,we need to understand Object Relational Mapping(ORM).
        ORM is a programming method to map the objects in java with the relational entities in the database.In this,entities/classes refers to table in database,instance of classes refers to rows and attributes of instances of classes refers to column of table in database.This provides solutions to the problems arise while developing persistence applications using traditional JDBC method. This also reduces the code that needs to be written.
        Hibernate is a pure Java object-relational mapping (ORM) and persistence framework that allows you to map plain old Java objects to relational database tables.The main goal of hibernate is to relieve the developer from the common data persistence related tasks.It maps the objects in the java with the tables in the database very efficiently and also you can get maximum using its data query and retrieval facilities.Mainly by using Hibernate in your projects you can save incredible time and effort.
        This is the primary interface used by hibernate applications. The instances of this interface are lightweight and are inexpensive to create and destroy. Hibernate sessions are not thread safe.It allows you to create query objects to retrieve persistent objects.It wraps JDBC connection Factory for Transaction.It holds a mandatory (first-level) cache of persistent objects, used when navigating the object graph or looking up objects by identifier .
        This is a factory that delivers the session objects to hibernate application.It is a heavy weighted object so generally there will be a single SessionFactory for the whole application and it will be shared among all the application threads.The SessionFactory caches generate SQL statements and other mapping metadata that Hibernate uses at runtime. It also holds cached data that has been read in one unit of work and may be reused in a future unit of work.
        This is used to configure hibernate. It’s also used to bootstrap hibernate. Mapping documents of hibernate are located using this interface.
        This is an optional interface but the above three interfaces are mandatory in each and every application. This interface abstracts the code from any kind of transaction implementations such as JDBC transaction, JTA transaction.
    `;
    const doc2 = `
        Let’s take an example of simple class that you have in your application. Referring Image 1, we have Employee object in our java class which has six fields. In our running application We would have lots of such objects in memory, What if I restart my application ? Everything will be lost. So to overcome this problem and persist data inside my application i will save it in Database.
        So problem here is I have object here in java but I do not have objects here in Database  level. So for saving I have to convert each object’s data into SQL query. Also for retrieving we have to do opposite like convert Record set into object. So at the end we are repeating converting Object data to SQL and SQL result to object.
        Let’s take a look at one of the recipes included in the book. It helps you to find n+1 select issues during development. This performance problem often occurs when Hibernate has to initialize lazily fetched associations between entities.
        You can find it by activating Hibernate\`s Statistics component which provides an easy way to count all executed queries in your Hibernate Session. 
        The easiest way to count all executed queries is to activate Hibernate’s statistics component. Hibernate then collects a lot of internal statistics and provides them as a log message and via the Statistics API.
        Hibernate’s statistics component is deactivated by default. You can activate it by setting the hibernate.generate_statistics parameter to true. You can either do this by providing a system property with the same name or by setting the parameter in the persistence.xml file.
        You have two options to access the statistics. Hibernate can write a subset with the most important information of each session to the log file or you can access them via the Statistics API.
        Let’s take a look at the log messages first. Hibernate writes a log message, similar to the following one, at the end of each session. It shows the number of SQL statements, the time spent for their preparation and execution and the interaction with the second-level cache.
        You can also access the Statistics API via Hibernate’s Statistics interface. You can get it from the SessionFactory. It provides several getter methods that give you access to more detailed information than the log output.
        Counting the executed queries can help find inefficiencies and avoid performance problems. But that’s not enough. You also need to know which queries Hibernate executes and which parameter values it uses. With the correct logging configuration, Hibernate will write all of that information to the log.
    `;
    const doc3 = `
        By now you all know the JPA 2.0 Criteria API : a type safe way to write a JQPL query. This API is clever in the way that you don’t use Strings to build your query, but is quite verbose… and sometimes you get lost in dozens of lines of Java code, just to write a simple query. You get lost in your CriteriaQuery, you don’t know why your query doesn’t work, and you would love to debug it. But how do you debug it ? Well, one way would be by just displaying the JPQL and/or SQL representation. Simple, isn’t it ? Yes, but JPA 2.0 javax.persistence.Query doesn’t have an API to do this. You then need to rely on the implementation… meaning, the code is different if you use EclipseLink, Hibernate or OpenJPA.
        So let’s use an API to get the JPQL/SQL String representations of a CriteriaQuery (to be more precise, the TypedQuery created from a CriteriaQuery). The bad news is that there is no standard JPA 2.0 API to do this. You need to use the implementation API hoping the implementation allows it (thank god that’s (nearly) the case for the 3 main JPA ORM frameworks). The good news is that the Query interface (and therefore TypedQuery) has an unwrap method. This method returns the provider’s query API implementation. Let’s see how you can use it with EclipseLink, Hibernate and OpenJPA.
        EclipseLink‘s Query representation is the org.eclipse.persistence.jpa.JpaQuery interface and the org.eclipse.persistence.internal.jpa.EJBQueryImpl implementation.  This interface gives you the wrapped native query (org.eclipse.persistence.queries.DatabaseQuery) with two very handy methods : getJPQLString() and getSQLString(). Unfortunatelly the getJPQLString() method will not translate a CriteriaQuery into JPQL, it only works for queries originally written in JPQL (dynamic or named query). The getSQLString() method relies on the query being “prepared”, meaning you have to run the query once before getting the SQL String representation.
        Hibernate‘s Query representation is org.hibernate.Query. This interface has several implementations and the very useful method that returns the SQL query string : getQueryString(). I couldn’t find a method that returns the JPQL representation, if I’ve missed something, please let me know.
        OpenJPA‘s Query representation is org.apache.openjpa.persistence.QueryImpl and also has a getQueryString() method that returns the SQL (not the JPQL). It delegates the call to the internal org.apache.openjpa.kernel.Query interface. I couldn’t find a method that returns the JPQL representation, if I’ve missed something, please let me know.
        For a developers’ point of view it would be great to have two methods in the javax.persistence.Query (and therefore javax.persistence.TypedQuery) interface that would be able to easily return the JPQL and SQL String representations, e.g : Query.getJPQLString() and Query.getSQLString(). Hey, that would be the perfect time to have it in JPA 2.1 that will be shipped in less than a year. Now, as an implementer, this might be tricky to do, I would love to ear your point of view on this.
        Hibernate ORM enables developers to more easily write applications whose data outlives the application process. As an Object/Relational Mapping (ORM) framework, Hibernate is concerned with data persistence as it applies to relational databases (via JDBC). Unfamiliar with the notion of ORM?
        In addition to its own "native" API, Hibernate is also an implementation of the Java Persistence API (JPA) specification. As such, it can be easily used in any environment supporting JPA including Java SE applications, Java EE application servers, Enterprise OSGi containers, etc.
        Hibernate enables you to develop persistent classes following natural Object-oriented idioms including inheritance, polymorphism, association, composition, and the Java collections framework. Hibernate requires no interfaces or base classes for persistent classes and enables any class or data structure to be persistent.
    `;
    const doc4 = `
        Hibernate Search transparently indexes your objects and offers fast full-text, geolocation and data mining search capabilities. Easy to use, integrates with Apache Lucene, Elasticsearch and Hibernate ORM.
        Hibernate Validator allows to express and validate application constraints. The default metadata source are annotations, with the ability to override and extend through the use of XML. It is not tied to a specific application tier or programming model and is available for both server and client application programming. But a simple example says more than 1000 words.
        Hibernate Validator offers a configurable bootstrap API as well as a range of built-in constraints. The latter can easily be extended by creating custom constraints.
        Hibernate Validator gives access to constraint configuration via a metadata API facilitating, for example, tooling integration.
        Hibernate Validator offers additional value on top of the features required by Bean Validation. For example, a programmatic constraint configuration API as well as an annotation processor which plugs into the build process and raises compilation errors whenever constraint annotations are incorrectly used.
        The power and simplicity of JPA for NoSQL datastores. Including support for associations, sub-classes, queries and much more. The ride has just begun, so come and join us!
        Hibernate OGM provides Java Persistence (JPA) support for NoSQL solutions. It reuses Hibernate ORM’s engine but persists entities into a NoSQL datastore instead of a relational database.
        Hibernate OGM supports several ways for searching entities and returning them as Hibernate managed objects:
        1- JPQL queries (we convert them into a native backend query)
        2- datastore specific native queries
        3- full-text queries, using Hibernate Search as indexing engine
        When JPA isn’t enough, Hibernate OGM extends it with family-specific and product-specific options. That way, the power of the backend is at your fingertips. All that in a type-safe way.
        Mixing several NoSQL datastores in one application, e.g. use Neo4j for your friendship graph and MongoDB for your blog posts. Or mix NoSQL and relational databases.
    `;
    const doc5 = `
        Working with Hibernate is very easy and developers enjoy using the APIs and the query language. Even creating mapping metadata is not an overly complex task once you've mastered the basics. Hibernate Tools makes working with Hibernate or JPA even more pleasant.
        Hibernate Tools is a toolset for Hibernate implemented as an integrated suite of Eclipse plugins, together with a unified Ant task for integration into the build cycle. Hibernate Tools is a core component of JBoss Tools and hence also part of JBoss Developer Studio.
        An editor for Hibernate XML mapping files, supporting auto-completion and syntax highlighting. The editor even supports semantic auto-completion for class names, property/field names, table names and column names.
        The Hibernate Console perspective allows you to configure database connections, provides visualization of classes and their relationships and allows you to execute HQL queries interactively against your database and browse the query results.
        The most powerful feature of Hibernate Tools is a database reverse engineering tool that can generate domain model classes and Hibernate mapping files, annotated EJB3 entity beans, HTML documentation or even an entire JBoss Seam application in seconds!
        Several wizards are provided, including wizards to quickly generate Hibernate configuration (cfg.xml) files, and Hibernate console configurations.
        I’m glad to announce the second release of the Eclipse plugin for Hibernate Search. In this post I’m describing the changes and new features of the release. Here you can find the first release blog post.
        The next step is to merge this plugin with the JBoss Tools Hibernate plugin. Currently, the Hibernate Search plugin is based on the Hibernate plugin which must be installed beforehand to prevent a "missing required feature" error.
        Hibernate Tools is a set of Eclipse plugns that provides support for edit hbm.xml, JPA annotations, HQL query prototyping and code generation for Hibernate and JPA projects.
        If you want to fix a bug or make any changes, please log an issue in the JBoss Tools JIRA describing the bug or new feature and give it a component type of hibernate. Then we highly recommend making the changes on a topic branch named with the JIRA issue number. For example, this command creates a branch for the JBIDE-1234 issue:
        Working with both Object-Oriented software and Relational Databases can be cumbersome and time-consuming. Development costs are significantly higher due to a paradigm mismatch between how data is represented in objects versus relational databases. Hibernate is an Object/Relational Mapping (ORM) solution for Java environments. The term Object/Relational Mapping refers to the technique of mapping data between an object model representation to a relational data model representation.
        Although having a strong background in SQL is not required to use Hibernate, having a basic understanding of the concepts can help you understand Hibernate more quickly and fully. An understanding of data modeling principles is especially important.
        Hibernate takes care of the mapping from Java classes to database tables, and from Java data types to SQL data types. In addition, it provides data query and retrieval facilities. It can significantly reduce development time otherwise spent with manual data handling in SQL and JDBC. Hibernate’s design goal is to relieve the developer from 95% of common data persistence-related programming tasks by eliminating the need for manual, hand-crafted data processing using SQL and JDBC. However, unlike many other persistence solutions, Hibernate does not hide the power of SQL from you and guarantees that your investment in relational technology and knowledge is as valid as always.
        Hibernate may not be the best solution for data-centric applications that only use stored-procedures to implement the business logic in the database, it is most useful with object-oriented domain models and business logic in the Java-based middle-tier. However, Hibernate can certainly help you to remove or encapsulate vendor-specific SQL code and streamlines the common task of translating result sets from a tabular representation to a graph of objects.
    `;

    const hibernateDocuments = [
        doc1, doc2, doc3, doc4, doc5
    ];

    return hibernateDocuments;
};