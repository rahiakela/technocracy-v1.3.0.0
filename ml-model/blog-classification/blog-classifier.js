const BayesClassifier =require('bayes-classifier');
const classifier =new BayesClassifier();

const fs = require('fs');
const angularDocuments = require('./documents/angular-documents');
const hibernateDocuments = require('./documents/hibernate-documents');
const mlDocuments = require('./documents/ml-documents');
const pythonDocuments = require('./documents/python-documents');
const nodeDocuments = require('./documents/node-documents');

// add documents to the classifier
classifier.addDocuments(angularDocuments.getAngularDocuments(), 'angular');
classifier.addDocuments(hibernateDocuments.getHibernateDocuments(), 'hibernate');
classifier.addDocuments(mlDocuments.getMLDocuments(),'machine learning');
classifier.addDocuments(pythonDocuments.getPythonDocuments(), 'python django flask tornado SQLAlchemy');
classifier.addDocuments(nodeDocuments.getNodeDocuments(), 'node.js express.js javascript');

// train the classifier
classifier.train();

// Create and store classifier model
const classifierModel = `${__dirname}/blog-classifier-model.json`;
fs.writeFileSync(classifierModel, JSON.stringify(classifier));
