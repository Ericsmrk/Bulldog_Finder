//create an array of 5 objects with id, name, age, and temperature
var people = [
    { id: 1, name: "John", age: 25, temperature: 98.6 },
    { id: 2, name: "Jane", age: 30, temperature: 97.2 },
    { id: 3, name: "Jim", age: 35, temperature: 99.8 },
    { id: 4, name: "Jill", age: 40, temperature: 98.2 },
    { id: 5, name: "Jack", age: 45, temperature: 97.8 }
];

// order people by age
people.sort(function(a, b) {
  return a.age - b.age;
});

console.log(people);