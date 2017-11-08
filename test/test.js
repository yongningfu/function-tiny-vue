var Vue = require('./vue');

var data = {
  name: 'name',
  description: 'descript',
  work: {
    program: {
      name: 'js'
    }
  }
}

var testResult;

var vue = Vue({
  data,
  watch: {
    name: function(newValue) {
      testResult = newValue;
    },
    'work.program.name': function(newValue) {
      testResult = newValue;
    },
    work: function(newValue) {
      testResult = newValue;
    },
    description: function(newValue) {
      testResult = newValue;
    }
  }
});


data.name = 'name1';
console.log(testResult === 'name1');

data.name = 'name2';
console.log(testResult === 'name2');

data.name = 'name3';
console.log(testResult === 'name3');

data.work.program.name = 'python'; 
console.log(testResult === 'python');

data.work.program.name = 'js'
console.log(testResult === 'js');

vue.description = 'description1';
console.log(testResult === 'description1');

vue.work = 'changework';
console.log(testResult === 'changework');
