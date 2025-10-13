// import { Injectable } from '@angular/core';
// import { Firestore, doc, setDoc, updateDoc, deleteField } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root',
// })
// export class FirestoreService {
//   constructor(private firestore: Firestore) {}

//   async updateMaterials(courseId: string) {
//     const courseRef = doc(this.firestore, `courses/${courseId}`);

//     // const materials = [
//     //   {
//     //     id: "part1",
//     //     title: "Introduction to Java",
//     //     completed: true,
//     //     videos: [
//     //       { title: "Java Basics - Installation, First Code,Comments", 
//     //         url: "https://drive.google.com/file/d/1Bx3v_WMHbISEz0zEZd1Oy-WxIObiOwml/preview"},{
//     //         title:"Java Fundamentals - Variables, Data Types, and Arrays",
//     //         url: "https://drive.google.com/file/d/1Mcg8ZUVJSQmJIh834upQKW0X5FuXJgbK/preview"  }
//     //     ],
//     //     mcqs: [
//     //       {
//     //         question: "Which keyword is used to define a class?",
//     //         options: ["class", "def", "object", "init"],
//     //         correctAnswer: "class"
//     //       },
//     //       {
//     //         question: "Which function is a constructor in Python?",
//     //         options: ["__start__", "__create__", "__init__", "__build__"],
//     //         correctAnswer: "__init__"
//     //       }
//     //     ]
//     //   },
//     //   {
//     //     id: "part2",
//     //     title: "Core Java Concepts",
//     //     completed: true,
//     //     videos: [
//     //       { title: "Java Essentials - Constants, Operators, Math, and User Input", 
//     //         url: "https://drive.google.com/file/d/1Wu65xgKrlNLC3WI_crD9Wha2f7yknL0e/preview" }
//     //     ]
//     //   },
//     //   {
//     //     id: "part3",
//     //     title: "Control Flow in Java",
//     //     completed: true,
//     //     videos: [
//     //       { title: "Java Control Flow - Conditions, Loops, and Operators", 
//     //         url: "https://drive.google.com/file/d/1a-fxzH2hdiwkQMdW-o4DnVWzJBoCJYJ8/preview" }
//     //     ]
//     //   },
//     //   {
//     //     id: "part4",
//     //     title: "Advanced Java Concepts",
//     //     completed: true,
//     //     videos: [
//     //       { title: "Java Advanced Concepts - Exception Handling, Methods, and a Mini-Project", 
//     //         url: "https://drive.google.com/file/d/1DGjAHrawORDqlFbydQe0xg_SH-w3gcM0/preview" }
//     //     ]
//     //   }
//     // ];

//     const materials = [
//       {
        
//         mcqs: [
//           {
//             question: "Which keyword is used to define a class?",
//             options: ["class", "def", "object", "init"],
//             correctAnswer: "class"
//           },
//           {
//             question: "Which function is a constructor in Python?",
//             options: ["__start__", "__create__", "__init__", "__build__"],
//             correctAnswer: "__init__"
//           }
//         ]
//       }
//     ];

//     try {
//       // First, remove the existing "materials" field
//       await updateDoc(courseRef, { materials: deleteField() });

//       // Then, add the new materials data with database location 'nam5'
//       await setDoc(courseRef, { materials, databaseLocation: "nam5" }, { merge: true });
//       console.log("Materials updated successfully!");
//     } catch (error) {
//       console.error("Error updating materials:", error);
//     }
//   }
// }

import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, updateDoc, deleteField } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  async updateMaterials(courseId: string) {
    const courseRef = doc(this.firestore, `courses/${courseId}`);
  
          const materials = [
            {
              id: "part1",
              title: "SQL Made Easy: Learn Databases, Tables & Data Types",
              completed: true,
              videos: [
                {
                  title: "SQL Made Easy: Learn Databases, Tables & Data Types",
                  url: "https://drive.google.com/file/d/1awbPQJtuPNUwduAJXgjAQm8PGNppgFlV/preview"
                }
              ],
              mcqs: [
                { question: "What does SQL stand for?", options: ["Structured Query Language", "System Query Language", "Sequential Query Language", "Standard Query Logic"], correctAnswer: "Structured Query Language" },
                { question: "Which SQL statement is used to retrieve data from a database?", options: ["GET", "SELECT", "RETRIEVE", "FETCH"], correctAnswer: "SELECT" },
                { question: "Which clause is used to filter results in an SQL query?", options: ["ORDER BY", "WHERE", "HAVING", "GROUP BY"], correctAnswer: "WHERE" },
                { question: "What type of database model does SQL primarily use?", options: ["Hierarchical", "Relational", "NoSQL", "Document"], correctAnswer: "Relational" },
                { question: "Which SQL command is used to create a database?", options: ["NEW DATABASE", "CREATE DATABASE", "INIT DATABASE", "MAKE DATABASE"], correctAnswer: "CREATE DATABASE" },
                { question: "What is the primary purpose of the SQL PRIMARY KEY constraint?", options: ["To allow duplicate values", "To uniquely identify each record", "To restrict null values", "To increase query speed"], correctAnswer: "To uniquely identify each record" },
                { question: "Which SQL clause is used to sort the result set?", options: ["SORT BY", "ORDER BY", "GROUP BY", "FILTER BY"], correctAnswer: "ORDER BY" },
                { question: "Which of the following is a valid SQL data type?", options: ["int", "string", "character", "byte"], correctAnswer: "int" },
                { question: "Which SQL keyword is used to remove all records from a table without deleting the table itself?", options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"], correctAnswer: "TRUNCATE" },
                { question: "Which SQL function returns the number of records in a result set?", options: ["SUM()", "COUNT()", "LENGTH()", "TOTAL()"], correctAnswer: "COUNT()" }
              ]
            },
            {
              id: "part2",
              title: "SQL in Depth: Commands, Queries & Best Practices",
              completed: true,
              videos: [
                {
                  title: "SQL in Depth: Commands, Queries & Best Practices",
                  url: "https://drive.google.com/file/d/1GD1gAt0gDx3KiXVe2R9HH5opQt7Q-xG-/preview"
                }
              ],
              mcqs: [
                { question: "Which SQL statement is used to insert new records into a table?", options: ["ADD", "INSERT INTO", "UPDATE", "CREATE"], correctAnswer: "INSERT INTO" },
                { question: "Which SQL statement is used to modify existing records in a table?", options: ["MODIFY", "CHANGE", "UPDATE", "ALTER"], correctAnswer: "UPDATE" },
                { question: "Which SQL clause is used to group results?", options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"], correctAnswer: "GROUP BY" },
                { question: "Which SQL command is used to delete a table permanently?", options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"], correctAnswer: "DROP" },
                { question: "What is the use of the SQL DISTINCT keyword?", options: ["To remove duplicate values", "To delete data", "To order results", "To count values"], correctAnswer: "To remove duplicate values" },
                { question: "Which SQL operator is used to search for a specified pattern in a column?", options: ["LIKE", "FIND", "SEARCH", "MATCH"], correctAnswer: "LIKE" },
                { question: "Which SQL constraint ensures that a column cannot have NULL values?", options: ["PRIMARY KEY", "NOT NULL", "UNIQUE", "FOREIGN KEY"], correctAnswer: "NOT NULL" },
                { question: "Which SQL keyword is used to join two or more tables?", options: ["MERGE", "JOIN", "UNION", "COMBINE"], correctAnswer: "JOIN" },
                { question: "Which of the following is NOT an SQL JOIN type?", options: ["INNER JOIN", "OUTER JOIN", "MIDDLE JOIN", "LEFT JOIN"], correctAnswer: "MIDDLE JOIN" },
                { question: "Which SQL function is used to find the maximum value in a column?", options: ["MAX()", "GREATEST()", "TOP()", "LARGEST()"], correctAnswer: "MAX()" }
              ]
            },
            {
              id: "part3",
              title: "Mastering SQL Queries: Filtering, Sorting & Aggregate Functions",
              completed: true,
              videos: [
                {
                  title: "Mastering SQL Queries: Filtering, Sorting & Aggregate Functions",
                  url: "https://drive.google.com/file/d/14z1bDntVKvBubgnSCf6UkOLzf5uJfDaL/preview"
                }
              ],
              mcqs: [
                { question: "Which SQL function calculates the sum of a column?", options: ["SUM()", "TOTAL()", "ADD()", "COUNT()"], correctAnswer: "SUM()" },
                { question: "Which SQL statement is used to return only different values?", options: ["FILTER", "DISTINCT", "ORDER BY", "GROUP BY"], correctAnswer: "DISTINCT" },
                { question: "Which SQL function returns the smallest value in a column?", options: ["LEAST()", "MIN()", "LOWEST()", "BOTTOM()"], correctAnswer: "MIN()" },
                { question: "Which SQL clause is used to filter aggregated data?", options: ["WHERE", "HAVING", "GROUP BY", "FILTER"], correctAnswer: "HAVING" },
                { question: "Which SQL operator checks if a value falls within a given range?", options: ["BETWEEN", "WITHIN", "RANGE", "IN"], correctAnswer: "BETWEEN" },
                { question: "Which SQL function counts the number of rows that match a condition?", options: ["SUM()", "COUNT()", "LENGTH()", "TOTAL()"], correctAnswer: "COUNT()" },
                { question: "What does the SQL UNION operator do?", options: ["Combines results from multiple SELECT statements", "Deletes duplicate records", "Creates a new table", "Sorts records"], correctAnswer: "Combines results from multiple SELECT statements" },
                { question: "Which SQL clause is used to limit the number of rows returned?", options: ["LIMIT", "MAX", "TOP", "FETCH"], correctAnswer: "LIMIT" },
                { question: "Which SQL operator checks if a value exists in a list?", options: ["EXISTS", "IN", "LIKE", "BETWEEN"], correctAnswer: "IN" },
                { question: "Which SQL clause is used to order the result set?", options: ["ORDER BY", "SORT BY", "GROUP BY", "LIMIT"], correctAnswer: "ORDER BY" }
              ]
            },
            {
              id: "part4",
              title: "SQL Essentials: Data Manipulation, Relationships & Views",
              completed: true,
              videos: [
                {
                  title: "SQL Essentials: Data Manipulation, Relationships & Views",
                  url: "https://drive.google.com/file/d/19_JcwMpEiM7HUY_JPnvBY4RcaDCOJ4hv/preview"
                }
              ],
              mcqs: [
        { question: "What does the SQL UPDATE statement do?", options: ["Deletes data", "Modifies existing data", "Creates a new table", "Adds a new column"], correctAnswer: "Modifies existing data" },
        { question: "What is a SQL View?", options: ["A stored query", "A new table", "A copy of data", "A type of database"], correctAnswer: "A stored query" },
        { question: "Which SQL command is used to remove a column from an existing table?", options: ["DELETE COLUMN", "REMOVE COLUMN", "ALTER TABLE DROP COLUMN", "DROP COLUMN"], correctAnswer: "ALTER TABLE DROP COLUMN" },
        { question: "Which SQL JOIN returns only the matching rows from both tables?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"], correctAnswer: "INNER JOIN" },
        { question: "What is the purpose of the SQL HAVING clause?", options: ["Filter records after grouping", "Sort records", "Limit records", "Filter individual rows"], correctAnswer: "Filter records after grouping" },
        { question: "Which SQL constraint ensures that values in a column are unique?", options: ["PRIMARY KEY", "FOREIGN KEY", "UNIQUE", "NOT NULL"], correctAnswer: "UNIQUE" },
        { question: "What does the SQL DELETE statement do?", options: ["Removes all records from a table", "Deletes specified records", "Drops a table", "Removes all columns"], correctAnswer: "Deletes specified records" },
        { question: "Which SQL command is used to create a relationship between two tables?", options: ["SET RELATION", "FOREIGN KEY", "PRIMARY RELATION", "LINK TABLE"], correctAnswer: "FOREIGN KEY" },
        { question: "What is the default sorting order of the ORDER BY clause in SQL?", options: ["Ascending", "Descending", "Random", "None"], correctAnswer: "Ascending" },
        { question: "Which SQL function returns the current date and time?", options: ["CURDATE()", "NOW()", "CURRENT_TIMESTAMP", "DATE()"], correctAnswer: "NOW()" }
      ]
      
    
        
      }
    ];

    try {
      await updateDoc(courseRef, { materials: deleteField() }); // Remove old materials
      await setDoc(courseRef, { materials, databaseLocation: "nam5" }, { merge: true });
      console.log("🔥 Materials updated successfully!");
    } catch (error) {
      console.error("❌ Error updating materials:", error);
    }
  }
}


//java
// const materials = [
//   {
//     id: "part1",   
//     title: "Introduction to Java",
//     completed: true,
//     videos: [
//       {
//         title: "Java Basics - Installation, First Code, Comments",
//         url: "https://drive.google.com/file/d/1Bx3v_WMHbISEz0zEZd1Oy-WxIObiOwml/preview"
//       },
//       {
//         title: "Java Fundamentals - Variables, Data Types, and Arrays",
//         url: "https://drive.google.com/file/d/1Mcg8ZUVJSQmJIh834upQKW0X5FuXJgbK/preview"
//       }
//     ],
//     mcqs: [
//       { question: "What is the extension of a Java source file?", options: [".java", ".js", ".class", ".jav"], correctAnswer: ".java" },
//       { question: "Which keyword is used to define a class in Java?", options: ["class", "Class", "define", "struct"], correctAnswer: "class" },
//       { question: "Which of these is a valid data type in Java?", options: ["integer", "number", "int", "real"], correctAnswer: "int" },
//       { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Visual Machine", "Java Variable Machine", "None of the above"], correctAnswer: "Java Virtual Machine" },
//       { question: "Which of the following is not a Java keyword?", options: ["final", "static", "boolean", "unsigned"], correctAnswer: "unsigned" },
//       { question: "Which symbol is used to end a Java statement?", options: [".", ";", ":", ","], correctAnswer: ";" },
//       { question: "Which of the following is used to read user input in Java?", options: ["Scanner", "InputReader", "Console", "UserReader"], correctAnswer: "Scanner" },
//       { question: "Which method is called when a Java application starts?", options: ["init()", "start()", "main()", "run()"], correctAnswer: "main()" },
//       { question: "What is the default value of an uninitialized integer variable in Java?", options: ["0", "null", "undefined", "NaN"], correctAnswer: "0" },
//       { question: "Which of these is not a primitive data type in Java?", options: ["char", "String", "int", "double"], correctAnswer: "String" }
//     ]
//   },
//   {
//     id: "part2",
//     title: "Core Java Concepts",
//     completed: true,
//     videos: [
//       {
//         title: "Java Essentials - Constants, Operators, Math, and User Input",
//         url: "https://drive.google.com/file/d/1Wu65xgKrlNLC3WI_crD9Wha2f7yknL0e/preview"
//       }
//     ],
//     mcqs: [
//       { question: "Which operator is used for addition in Java?", options: ["+", "-", "*", "/"], correctAnswer: "+" },
//       { question: "Which of these operators is used for comparison?", options: ["=", "==", "!=", "==="], correctAnswer: "==" },
//       { question: "Which keyword is used to declare a constant in Java?", options: ["static", "final", "const", "constant"], correctAnswer: "final" },
//       { question: "Which operator is used to get the remainder of a division?", options: ["%", "/", "//", "*"], correctAnswer: "%" },
//       { question: "Which function is used to find the absolute value of a number?", options: ["abs()", "absolute()", "Math.abs()", "Math.absolute()"], correctAnswer: "Math.abs()" },
//       { question: "Which function returns the square root of a number?", options: ["sqrt()", "Math.sqrt()", "squareRoot()", "Math.square()"], correctAnswer: "Math.sqrt()" },
//       { question: "What is the result of 5 % 2 in Java?", options: ["2", "2.5", "1", "0"], correctAnswer: "1" },
//       { question: "Which of the following is a valid identifier in Java?", options: ["1variable", "_variable", "var-name", "var name"], correctAnswer: "_variable" },
//       { question: "Which function is used to round a number to the nearest integer?", options: ["round()", "Math.round()", "Math.ceil()", "Math.floor()"], correctAnswer: "Math.round()" },
//       { question: "Which of the following is a valid way to declare a float variable?", options: ["float num = 5.5;", "float num = 5.5f;", "float num = 5;", "Both B and C"], correctAnswer: "Both B and C" }
//     ]
//   },
//   {
//     id: "part3",
//     title: "Control Flow in Java",
//     completed: true,
//     videos: [
//       {
//         title: "Java Control Flow - Conditions, Loops, and Operators",
//         url:"https://drive.google.com/file/d/1a-fxzH2hdiwkQMdW-o4DnVWzJBoCJYJ8/preview"
//       }
//     ],
//     mcqs: [
//       { question: "Which keyword is used for an if-else statement in Java?", options: ["if-then", "if", "switch", "case"], correctAnswer: "if" },
//       { question: "Which loop is best when the number of iterations is known?", options: ["while", "do-while", "for", "foreach"], correctAnswer: "for" },
//       { question: "Which of these statements is used to exit a loop?", options: ["stop", "exit", "break", "return"], correctAnswer: "break" },
//       { question: "Which loop is guaranteed to execute at least once?", options: ["for", "while", "do-while", "None"], correctAnswer: "do-while" },
//       { question: "Which statement is used for multiple condition checks?", options: ["if-else", "for", "switch", "while"], correctAnswer: "switch" },
//       { question: "What is the default value of a boolean variable in Java?", options: ["true", "false", "null", "0"], correctAnswer: "false" },
//       { question: "Which keyword is used to skip an iteration of a loop?", options: ["skip", "continue", "break", "pass"], correctAnswer: "continue" },
//       { question: "Which of these is NOT a valid loop type in Java?", options: ["for", "while", "foreach", "do-while"], correctAnswer: "foreach" },
//       { question: "Which keyword is used to define a switch case?", options: ["switch", "case", "default", "Both A and B"], correctAnswer: "Both A and B" },
//       { question: "What is the output of `System.out.println(5 > 3 ? 'Yes' : 'No')`?", options: ["Yes", "No", "Error", "5"], correctAnswer: "Yes" }
//     ]
//   },
//   {
//     id: "part4",
//     title: "Advanced Java Concepts",
//     completed: true,
//     videos: [
//       {
//         title: "Java Advanced Concepts - Exception Handling, Methods, and a Mini-Project",
//         url: "https://drive.google.com/file/d/1DGjAHrawORDqlFbydQe0xg_SH-w3gcM0/preview"
//       }
//     ],
//      mcqs: [
//   { question: "Which keyword is used to handle exceptions in Java?", options: ["error", "try", "exception", "throw"], correctAnswer: "try" },
//   { question: "Which block must be used with a try block?", options: ["catch", "finally", "throw", "Both A and B"], correctAnswer: "Both A and B" },
//   { question: "Which exception is thrown when dividing by zero?", options: ["NullPointerException", "ArithmeticException", "IOException", "Exception"], correctAnswer: "ArithmeticException" },
//   { question: "Which keyword is used to manually throw an exception?", options: ["throw", "throws", "exception", "error"], correctAnswer: "throw" },
//   { question: "What is the return type of a constructor?", options: ["void", "class type", "None", "int"], correctAnswer: "None" },
//   { question: "Which keyword is used for method overloading?", options: ["overload", "override", "static", "None"], correctAnswer: "None" },
//   { question: "Which of these is NOT a valid access specifier?", options: ["private", "public", "protected", "internal"], correctAnswer: "internal" },
//   { question: "Which method is used to execute a thread?", options: ["run()", "start()", "execute()", "begin()"], correctAnswer: "start()" },
//   { question: "What is the parent class of all Java classes?", options: ["Object", "Main", "Super", "Base"], correctAnswer: "Object" },
//   { question: "Which Java feature allows different methods to have the same name but different parameters?", options: ["Inheritance", "Method Overloading", "Encapsulation", "Polymorphism"], correctAnswer: "Method Overloading" }
// ]
//   }
// ];



// pythoon
// const materials = [
//   {
//     id: "part1",
//     title: "Basics of Python",
//     completed: true,
//     videos: [
//       { title: "Lecture 1 - Variables & Data Types", url: "https://drive.google.com/file/d/1lGeujFdb31cGpOObepaoi_JZSX031aGI/preview" },
//       { title: "Lecture 2 - Strings & Conditional Statements", url: "https://drive.google.com/file/d/1f4rHQJJ3xfRGzdGV9jBYV64mQFW64xxe/preview" },
//       { title: "Lecture 3 - List & Tuple in Python", url: "https://drive.google.com/file/d/1ODHlZPLEHVlDTAvX6iTgPAimhkjnElNb/preview" }
//     ],
//     mcqs: [
//       { question: "What is the correct extension for a Python file?", options: [".py", ".python", ".p", ".pt"], correctAnswer: ".py" },
//       { question: "Which function is used to display output in Python?", options: ["print()", "echo()", "output()", "display()"], correctAnswer: "print()" },
//       { question: "Which of the following is a valid variable name in Python?", options: ["1var", "_var", "var-name", "var name"], correctAnswer: "_var" },
//       { question: "Which data type is immutable in Python?", options: ["List", "Dictionary", "Tuple", "Set"], correctAnswer: "Tuple" },
//       { question: "What is the output of `print(2 ** 3)`?", options: ["6", "8", "9", "12"], correctAnswer: "8" },
//       { question: "Which of these is NOT a valid data type in Python?", options: ["float", "int", "real", "list"], correctAnswer: "real" },
//       { question: "What will `type(10.5)` return?", options: ["int", "float", "double", "decimal"], correctAnswer: "float" },
//       { question: "Which statement is used to take user input?", options: ["scan()", "input()", "get()", "read()"], correctAnswer: "input()" },
//       { question: "What keyword is used to define a function in Python?", options: ["func", "def", "function", "define"], correctAnswer: "def" },
//       { question: "Which of the following is used for single-line comments in Python?", options: ["//", "#", "/* */", "<!-- -->"], correctAnswer: "#" }
//     ]
//   },
//   {
//     id: "part2",
//     title: "Data Structures and Loops",
//     completed: true,
//     videos: [
//       { title: "Lecture 4 - Dictionary & Set in Python", url: "https://drive.google.com/file/d/1xDQIyCbcUM_tlhn_WmQDt472ttj-xPdw/preview" },
//       { title: "Lecture 5 - Loops in Python (While & For Loops)", url: "https://drive.google.com/file/d/1vCMRyeV02tWNN53Gq8fz3wC7bKulMtsX/preview" }
//     ],
//     mcqs: [
//       { question: "Which data structure allows duplicate values?", options: ["Set", "List", "Dictionary", "Tuple"], correctAnswer: "List" },
//       { question: "Which method is used to remove an item from a list?", options: ["delete()", "remove()", "pop()", "discard()"], correctAnswer: "remove()" },
//       { question: "Which loop is used when the number of iterations is known?", options: ["While loop", "For loop", "Infinite loop", "Do-while loop"], correctAnswer: "For loop" },
//       { question: "Which keyword is used to exit a loop in Python?", options: ["return", "break", "continue", "exit"], correctAnswer: "break" },
//       { question: "Which method is used to add an item to a set?", options: ["push()", "append()", "add()", "insert()"], correctAnswer: "add()" },
//       { question: "Which of these data structures is mutable?", options: ["Tuple", "String", "List", "Integer"], correctAnswer: "List" },
//       { question: "Which of these loops will execute at least once?", options: ["for", "while", "do-while", "None"], correctAnswer: "do-while" },
//       { question: "Which function is used to iterate over elements in a list?", options: ["foreach()", "map()", "forEach()", "None"], correctAnswer: "map()" },
//       { question: "What will `range(2, 10, 2)` return?", options: ["[2, 4, 6, 8]", "[2, 3, 4, 5]", "[2, 6, 10]", "[2, 4, 6, 8, 10]"], correctAnswer: "[2, 4, 6, 8]" },
//       { question: "What is the default starting index of a list in Python?", options: ["0", "1", "-1", "Depends on the list"], correctAnswer: "0" }
//     ]
//   },
//   {
//     id: "part3",
//     title: "Functions and File Handling",
//     completed: true,
//     videos: [
//       { title: "Lecture 6 - Functions & Recursion in Python", url: "https://drive.google.com/file/d/1EIleLOgNNmg7mgdoH5Tq_BmCuC49F2OR/preview" },
//       { title: "Lecture 7 - File Input/Output in Python", url: "https://drive.google.com/file/d/1gNaXjMbSBLvlvTvNZzUaJkk3g9wWjMa8/preview" }
//     ],
//     mcqs: [
//       { question: "What keyword is used to define a function?", options: ["define", "def", "func", "function"], correctAnswer: "def" },
//       { question: "How do you read a file in Python?", options: ["open('file.txt', 'r')", "read('file.txt')", "file('file.txt')", "get('file.txt')"], correctAnswer: "open('file.txt', 'r')" },
//       { question: "Which function is used to write content into a file?", options: ["write()", "append()", "store()", "print()"], correctAnswer: "write()" },
//       { question: "Which function is used to close a file?", options: ["end()", "stop()", "close()", "terminate()"], correctAnswer: "close()" },
//       { question: "Which statement is used to return a value from a function?", options: ["return", "exit", "break", "yield"], correctAnswer: "return" },
//       { question: "What keyword is used to define an anonymous function?", options: ["def", "lambda", "anonymous", "func"], correctAnswer: "lambda" },
//       { question: "How do you check if a file exists in Python?", options: ["os.exists()", "file.exists()", "os.path.exists()", "path.exists()"], correctAnswer: "os.path.exists()" },
//       { question: "Which mode opens a file for both reading and writing?", options: ["'r'", "'w'", "'rw'", "'r+'"], correctAnswer: "'r+'" },
//       { question: "Which module is used for handling files in Python?", options: ["sys", "os", "file", "io"], correctAnswer: "io" },
//       { question: "What function is used to get the length of a string?", options: ["length()", "size()", "count()", "len()"], correctAnswer: "len()" }
//     ]
    
//   },
//   {
//     id: "part4",
//     title: "Object-Oriented Programming (OOPs)",
//     completed: true,
//     videos: [
//       { title: "Lecture 8 - OOPS in Python (Classes & Objects)", url: "https://drive.google.com/file/d/1l4kUZAK7sTG29jXi70Sv1RCH02P7KaYS/preview" },
//       { title: "Lecture 9 - OOPS Part 2 (Object-Oriented Programming Concepts)", url: "https://drive.google.com/file/d/1REDGqkTBP0w5fLtnmlp-cgBEYsTWYEeF/preview" }
//     ],
//     mcqs: [
//       { question: "What is the process of creating an object in Python?", options: ["Declaration", "Instantiation", "Initialization", "Construction"], correctAnswer: "Instantiation" },
//       { question: "Which keyword is used to define a class?", options: ["class", "def", "object", "init"], correctAnswer: "class" },
//       { question: "Which function is a constructor in Python?", options: ["__start__", "__create__", "__init__", "__build__"], correctAnswer: "__init__" },
//       { question: "Which of the following is an OOP principle?", options: ["Encapsulation", "Recursion", "Iteration", "Compilation"], correctAnswer: "Encapsulation" },
//       { question: "Which function is used to delete an object?", options: ["delete()", "del()", "remove()", "erase()"], correctAnswer: "del()" },
//       { question: "Which keyword is used to inherit a class in Python?", options: ["extends", "inherits", "super", "class"], correctAnswer: "super" },
//       { question: "Which method is called when an object is created?", options: ["__init__", "__start__", "__main__", "__new__"], correctAnswer: "__init__" },
//       { question: "Which access specifier allows a member to be accessed only within the class?", options: ["Public", "Private", "Protected", "Global"], correctAnswer: "Private" },
//       { question: "What does polymorphism allow in Python?", options: ["Multiple classes to have methods with the same name", "Creating objects of multiple classes", "Direct memory manipulation", "Running multiple processes"], correctAnswer: "Multiple classes to have methods with the same name" },
//       { question: "Which concept allows one class to be based on another?", options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"], correctAnswer: "Inheritance" }
//     ]














//SQL
//     const materials = [
//       {
//         id: "part1",
//         title: "SQL Made Easy: Learn Databases, Tables & Data Types",
//         completed: true,
//         videos: [
//           {
//             title: "SQL Made Easy: Learn Databases, Tables & Data Types",
//             url: "https://drive.google.com/file/d/1awbPQJtuPNUwduAJXgjAQm8PGNppgFlV/preview"
//           }
//         ],
//         mcqs: [
//           { question: "What does SQL stand for?", options: ["Structured Query Language", "System Query Language", "Sequential Query Language", "Standard Query Logic"], correctAnswer: "Structured Query Language" },
//           { question: "Which SQL statement is used to retrieve data from a database?", options: ["GET", "SELECT", "RETRIEVE", "FETCH"], correctAnswer: "SELECT" },
//           { question: "Which clause is used to filter results in an SQL query?", options: ["ORDER BY", "WHERE", "HAVING", "GROUP BY"], correctAnswer: "WHERE" },
//           { question: "What type of database model does SQL primarily use?", options: ["Hierarchical", "Relational", "NoSQL", "Document"], correctAnswer: "Relational" },
//           { question: "Which SQL command is used to create a database?", options: ["NEW DATABASE", "CREATE DATABASE", "INIT DATABASE", "MAKE DATABASE"], correctAnswer: "CREATE DATABASE" },
//           { question: "What is the primary purpose of the SQL PRIMARY KEY constraint?", options: ["To allow duplicate values", "To uniquely identify each record", "To restrict null values", "To increase query speed"], correctAnswer: "To uniquely identify each record" },
//           { question: "Which SQL clause is used to sort the result set?", options: ["SORT BY", "ORDER BY", "GROUP BY", "FILTER BY"], correctAnswer: "ORDER BY" },
//           { question: "Which of the following is a valid SQL data type?", options: ["int", "string", "character", "byte"], correctAnswer: "int" },
//           { question: "Which SQL keyword is used to remove all records from a table without deleting the table itself?", options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"], correctAnswer: "TRUNCATE" },
//           { question: "Which SQL function returns the number of records in a result set?", options: ["SUM()", "COUNT()", "LENGTH()", "TOTAL()"], correctAnswer: "COUNT()" }
//         ]
//       },
//       {
//         id: "part2",
//         title: "SQL in Depth: Commands, Queries & Best Practices",
//         completed: true,
//         videos: [
//           {
//             title: "SQL in Depth: Commands, Queries & Best Practices",
//             url: "https://drive.google.com/file/d/1GD1gAt0gDx3KiXVe2R9HH5opQt7Q-xG-/preview"
//           }
//         ],
//         mcqs: [
//           { question: "Which SQL statement is used to insert new records into a table?", options: ["ADD", "INSERT INTO", "UPDATE", "CREATE"], correctAnswer: "INSERT INTO" },
//           { question: "Which SQL statement is used to modify existing records in a table?", options: ["MODIFY", "CHANGE", "UPDATE", "ALTER"], correctAnswer: "UPDATE" },
//           { question: "Which SQL clause is used to group results?", options: ["GROUP BY", "ORDER BY", "WHERE", "HAVING"], correctAnswer: "GROUP BY" },
//           { question: "Which SQL command is used to delete a table permanently?", options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"], correctAnswer: "DROP" },
//           { question: "What is the use of the SQL DISTINCT keyword?", options: ["To remove duplicate values", "To delete data", "To order results", "To count values"], correctAnswer: "To remove duplicate values" },
//           { question: "Which SQL operator is used to search for a specified pattern in a column?", options: ["LIKE", "FIND", "SEARCH", "MATCH"], correctAnswer: "LIKE" },
//           { question: "Which SQL constraint ensures that a column cannot have NULL values?", options: ["PRIMARY KEY", "NOT NULL", "UNIQUE", "FOREIGN KEY"], correctAnswer: "NOT NULL" },
//           { question: "Which SQL keyword is used to join two or more tables?", options: ["MERGE", "JOIN", "UNION", "COMBINE"], correctAnswer: "JOIN" },
//           { question: "Which of the following is NOT an SQL JOIN type?", options: ["INNER JOIN", "OUTER JOIN", "MIDDLE JOIN", "LEFT JOIN"], correctAnswer: "MIDDLE JOIN" },
//           { question: "Which SQL function is used to find the maximum value in a column?", options: ["MAX()", "GREATEST()", "TOP()", "LARGEST()"], correctAnswer: "MAX()" }
//         ]
//       },
//       {
//         id: "part3",
//         title: "Mastering SQL Queries: Filtering, Sorting & Aggregate Functions",
//         completed: true,
//         videos: [
//           {
//             title: "Mastering SQL Queries: Filtering, Sorting & Aggregate Functions",
//             url: "https://drive.google.com/file/d/14z1bDntVKvBubgnSCf6UkOLzf5uJfDaL/preview"
//           }
//         ],
//         mcqs: [
//           { question: "Which SQL function calculates the sum of a column?", options: ["SUM()", "TOTAL()", "ADD()", "COUNT()"], correctAnswer: "SUM()" },
//           { question: "Which SQL statement is used to return only different values?", options: ["FILTER", "DISTINCT", "ORDER BY", "GROUP BY"], correctAnswer: "DISTINCT" },
//           { question: "Which SQL function returns the smallest value in a column?", options: ["LEAST()", "MIN()", "LOWEST()", "BOTTOM()"], correctAnswer: "MIN()" },
//           { question: "Which SQL clause is used to filter aggregated data?", options: ["WHERE", "HAVING", "GROUP BY", "FILTER"], correctAnswer: "HAVING" },
//           { question: "Which SQL operator checks if a value falls within a given range?", options: ["BETWEEN", "WITHIN", "RANGE", "IN"], correctAnswer: "BETWEEN" },
//           { question: "Which SQL function counts the number of rows that match a condition?", options: ["SUM()", "COUNT()", "LENGTH()", "TOTAL()"], correctAnswer: "COUNT()" },
//           { question: "What does the SQL UNION operator do?", options: ["Combines results from multiple SELECT statements", "Deletes duplicate records", "Creates a new table", "Sorts records"], correctAnswer: "Combines results from multiple SELECT statements" },
//           { question: "Which SQL clause is used to limit the number of rows returned?", options: ["LIMIT", "MAX", "TOP", "FETCH"], correctAnswer: "LIMIT" },
//           { question: "Which SQL operator checks if a value exists in a list?", options: ["EXISTS", "IN", "LIKE", "BETWEEN"], correctAnswer: "IN" },
//           { question: "Which SQL clause is used to order the result set?", options: ["ORDER BY", "SORT BY", "GROUP BY", "LIMIT"], correctAnswer: "ORDER BY" }
//         ]
//       },
//       {
//         id: "part4",
//         title: "SQL Essentials: Data Manipulation, Relationships & Views",
//         completed: true,
//         videos: [
//           {
//             title: "SQL Essentials: Data Manipulation, Relationships & Views",
//             url: "https://drive.google.com/file/d/19_JcwMpEiM7HUY_JPnvBY4RcaDCOJ4hv/preview"
//           }
//         ],
//         mcqs: [
//   { question: "What does the SQL UPDATE statement do?", options: ["Deletes data", "Modifies existing data", "Creates a new table", "Adds a new column"], correctAnswer: "Modifies existing data" },
//   { question: "What is a SQL View?", options: ["A stored query", "A new table", "A copy of data", "A type of database"], correctAnswer: "A stored query" },
//   { question: "Which SQL command is used to remove a column from an existing table?", options: ["DELETE COLUMN", "REMOVE COLUMN", "ALTER TABLE DROP COLUMN", "DROP COLUMN"], correctAnswer: "ALTER TABLE DROP COLUMN" },
//   { question: "Which SQL JOIN returns only the matching rows from both tables?", options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL JOIN"], correctAnswer: "INNER JOIN" },
//   { question: "What is the purpose of the SQL HAVING clause?", options: ["Filter records after grouping", "Sort records", "Limit records", "Filter individual rows"], correctAnswer: "Filter records after grouping" },
//   { question: "Which SQL constraint ensures that values in a column are unique?", options: ["PRIMARY KEY", "FOREIGN KEY", "UNIQUE", "NOT NULL"], correctAnswer: "UNIQUE" },
//   { question: "What does the SQL DELETE statement do?", options: ["Removes all records from a table", "Deletes specified records", "Drops a table", "Removes all columns"], correctAnswer: "Deletes specified records" },
//   { question: "Which SQL command is used to create a relationship between two tables?", options: ["SET RELATION", "FOREIGN KEY", "PRIMARY RELATION", "LINK TABLE"], correctAnswer: "FOREIGN KEY" },
//   { question: "What is the default sorting order of the ORDER BY clause in SQL?", options: ["Ascending", "Descending", "Random", "None"], correctAnswer: "Ascending" },
//   { question: "Which SQL function returns the current date and time?", options: ["CURDATE()", "NOW()", "CURRENT_TIMESTAMP", "DATE()"], correctAnswer: "NOW()" }
// ]
