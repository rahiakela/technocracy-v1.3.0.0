const BayesClassifier =require('bayes-classifier');
const classifier =new BayesClassifier();

const fs = require('fs');
const angularDocuments = require('./documents/angular-documents');
const hibernateDocuments = require('./documents/hibernate-documents');
const mlDocuments = require('./documents/ml-documents');
const pythonDocuments = require('./documents/python-documents');
const nodeDocuments = require('./documents/node-documents');
const htmlCssDocuments = require('./documents/html-css-documents');
const javaDocuments = require('./documents/java-documents');
const springDocuments = require('./documents/spring-documents');

// add documents to the classifier
classifier.addDocuments(angularDocuments.getAngularDocuments(), 'angular');
classifier.addDocuments(hibernateDocuments.getHibernateDocuments(), 'hibernate');
classifier.addDocuments(mlDocuments.getMLDocuments(),'machine learning');
classifier.addDocuments(pythonDocuments.getPythonDocuments(), 'python django flask tornado SQLAlchemy');
classifier.addDocuments(nodeDocuments.getNodeDocuments(), 'node.js express.js javascript');
classifier.addDocuments(htmlCssDocuments.getHTMLCSSDocuments(),'html css');
classifier.addDocuments(javaDocuments.getJavaDocuments(),'java servlet jsp jpa jdbc');
classifier.addDocuments(springDocuments.getSpringDocuments(),'spring');

// train the classifier
classifier.train();

// Create and store classifier model
const classifierModel = `${__dirname}/blog-classifier-model.json`;
fs.writeFileSync(classifierModel, JSON.stringify(classifier));
