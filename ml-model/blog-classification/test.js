const BayesClassifier =require('bayes-classifier');

const classifierModel = `${__dirname}/blog-classifier-model.json`;

// Restoring classifier
const blogClassifier =new BayesClassifier();
const storedClassifier =require(classifierModel);
blogClassifier.restore(storedClassifier);


console.log(blogClassifier.classify('Hibernate takes care of the mapping from Java classes to database tables, and from Java data types to SQL data types.'));
console.log(blogClassifier.classify('The Fundamentals of Neural Networks: The basics of Perceptron '));
console.log(blogClassifier.classify('NgRx —  A Best Practice Guide for Enterprise Angular Applications '));
console.log(blogClassifier.classify('Payment Slip Monetary Amounts Recognition using Machine Learning With Deeplearning4j '));

