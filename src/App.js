import { useState } from 'react';
import './App.scss';

const lines_of_code = 50

const Levels = [
  /* 1  */ {command: "You have a variable 'CurrDate' given. Write a JavaScript program to display the current day and time in the UTC. Write the result in the console.", code: "let CurrDate = new Date();\n// write your code here\n", protected_lines: 1, vars: "return [CurrDate];", checks: [ {msg: "Is the result printed in the console?", eval: "for(let cmd of consoleLogs){if(cmd.type == 'log' && cmd.value.includes(res[0].toUTCString())){ return true;}}\nreturn false;", }, ], page_content: false},
  /* 2  */ {command: "You have given a variable: 'Area'. Write a JavaScript program to find the area of a triangle where three sides are 5, 6, 7. Write the result in the console rounded to 2 decimal digits.", code: "let Area = 0;\n// write your code here\n", protected_lines: 1, vars: "return [Area]", checks: [ { msg: "Is 'Area' variable valid for the 5, 6, 7 triangle?", eval: "return Math.abs(res[0] - 14.6969384) < 0.001;", }, { msg: "Is the rounded value of 'Area' written in the console?", eval: "let roundedArea = Math.round(res[0] * 100) / 100;\nfor (let cmd of consoleLogs) { if (cmd.value.includes(roundedArea.toString())) { return true; }}\nreturn false;", }, ], page_content: false, },
  /* 3  */ {command: "Write a JavaScript program to rotate the string 'I hate JavaScript' in the right direction. This is done by periodically removing one letter from the string end and attaching it to the front. Write the result to the given 'result' variable.", code: "const inputValue = 'I hate JavaScript';\nlet result = '';\n// write your code here\n", protected_lines: 2, vars: "return [result];", checks: [ { msg: "Does 'result' have the correct rotated value?", eval: "return res[0] === 'tpircSavaJ etah I';", }, ], page_content: false, },
  /* 4  */ {command: "You have given input values in an array: [2000, 2012, 1993, 1900]. Write a JavaScript program to determine whether a given year is a leap year in the Gregorian calendar. Iterate the array and add to 'result' a string 'Given year is a leap year' if true, otherwise, 'Given year is not a leap year'.", code: "const years = [2000, 2012, 1993, 1900];\nlet result = [];\n// write your leap year determination logic here\n", protected_lines: 2, vars: "return [result, years];", checks: [ { msg: "Is 'result' correct for leap year determination?", eval: `return Array.isArray(res[0]) && res[0].length === res[1].length && res[0].every((value, index) => { const year = res[1][index]; if (value === 'Given year is a leap year') { return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0); } else { return !(year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)); } } );`, }, ], page_content: false, },
  /* 5  */ {command: "Write a JavaScript program to find out if 1st January will be a Sunday between 2014 and 2050. Write all found values in the 'result' variable.", code: "let result = [];\n// write your code here\n", protected_lines: 1, vars: "return [result];", checks: [ { msg: "Is 'result' an array containing years when 1st January is a Sunday?", eval: `return Array.isArray(res[0]) && res[0].every(year => { const januaryFirst = new Date(year, 0, 1); return januaryFirst.getDay() === 0 && year >= 2014 && year <= 2050; });`, }, ], page_content: false, },
  /* 6  */ {command: "Write a JavaScript program where the program takes a random integer between 1 and 10, and the user is then prompted to input a guess number. The program prints 'Good Work' to the console if the input matches the guess number; otherwise, it prints 'Not matched'. The randomly generated number should be written to the given 'num' variable, and the user prompt should be written to the 'prompt' variable.", code: "let num = 0;\nlet prompt = 0;\n// write your code here\n", protected_lines: 2, vars: "return [num, prompt];", checks: [ { msg: "Is the 'num' variable a random integer between 1 and 10?", eval: "return Number.isInteger(res[0]) && res[0] >= 1 && res[0] <= 10;", }, { msg: "Is value printed in the console?", eval: "for(let cmd of consoleLogs){if(cmd.value == (res[0] === res[1] ? 'Good Work' : 'Not matched')){ return true;}}\nreturn false;", }, ], page_content: false,},
  /* 7  */ {command: "Write a JavaScript program to calculate multiplication and division of two numbers (input from the user). The form has id='form1', the first number field is 'num1', the second number field is 'num2', and there are two buttons: one for multiplication ('mul') and one for division ('div'). Write the result to the paragraph with id='result'. If multiplying, it should be: 'Multiplication result: x', if dividing: 'Division result: x'", code: "// write your code here\n", protected_lines: 0, vars: "", checks: [ { msg: "Is multiplication button ('mul') onclick correct?", eval: ` document.getElementById('num1').value = 5; document.getElementById('num2').value = 3; document.getElementById('mul').click(); const resultText = document.getElementById('result').innerText; return resultText.includes('Multiplication result: 15');`, }, { msg: "Is division button ('div') onclick correct?", eval: ` document.getElementById('num1').value = 10; document.getElementById('num2').value = 2; document.getElementById('div').click(); const resultText = document.getElementById('result').innerText; return resultText.includes('Division result: 5');`, }, ], page_content: ( <div id="sample-page"> <form id="form1"> <label htmlFor="num1">Enter the first number:</label> <input type="number" id="num1" name="num1" required /><br /><br /> <label htmlFor="num2">Enter the second number:</label> <input type="number" id="num2" name="num2" required /><br /><br /> <button type="button" id="mul">Multiply</button> <button type="button" id="div">Divide</button> </form> <p id="result"></p> </div> ) },
  /* 8  */ {command: "Write a JavaScript program to convert temperatures to and from Celsius, Fahrenheit. [ Formula : c/5 = (f-32)/9 [ where c = temperature in Celsius and f = temperature in Fahrenheit ] In the given variable 'foo', you should store the function with one argument (temperature in Celsius) returning the converted temperature in Fahrenheit.", code: "const foo = function(celsius) { // write your temperature conversion code here\n\t\n};", protected_lines: 1, vars: "return [foo]", checks: [ { msg: "Is the 'foo' function defined and correctly converts Celsius to Fahrenheit?", eval: ` const celsius = 25; const expectedFahrenheit = 77; const resultFahrenheit = res[0](celsius); return Math.abs(resultFahrenheit - expectedFahrenheit) < 0.01;`, }, ], page_content: false, },
  /* 9  */ {command: "Write a JavaScript program to remove a character at the specified position in a given string and return the modified string. You are given three variables: 'userPrompt' storing the prompt from the user, 'characterPos' storing an integer value representing the position of the character to remove from the string, and 'result' storing the modified string. After modifying 'result', write it to the console.", code: `const userPrompt = window.prompt("Enter the prompt from the user:");\nconst characterPos = parseInt(window.prompt("Enter the position of the character to remove (as an integer):"));\nlet result = '';\n// Write your code here\n`, protected_lines: 3, vars: "return [userPrompt, characterPos, result];", checks: [{msg: "Does the code correctly remove the character at 'characterPos' and update 'result'?", eval: `const expected = res[0].slice(0, res[1]) + res[0].slice(res[1] + 1);const resultString = res[2];return resultString === expected;`,}, {msg: "Is 'result' written to the console?", eval: `const expectedOutput = res[2];let resultWritten = false;for (let log of consoleLogs) {if (log.type === "log" && log.value.includes(expectedOutput)) {resultWritten = true;break;}}return resultWritten;`,},], page_content: false,},
  /* 10 */ {command: "Write a JavaScript program to check whether two given integer values are in the range 50..99 (inclusive). Return true if either of them falls within the range. Store the function taking two arguments in the variable 'foo'.", code: "const foo = function(a, b){\n\t\n}", protected_lines: 1, vars: "return [foo];", checks: [{msg: "Does the code correctly define the 'foo' function?", eval: `const expected = (a, b) => a >= 50 && a <= 99 || b >= 50 && b <= 99;const fooFunction = res[0];const testCases = [ { a: 45, b: 60, expected: true }, { a: 70, b: 100, expected: true }, { a: 30, b: 40, expected: false }, ];return testCases.every(testCase => fooFunction(testCase.a, testCase.b) === testCase.expected);`,},], page_content: false,},
  /* 11 */ {command: "Write a JavaScript program to check whether a string 'Script' appears at the 5th (index 4) position in a given string. If 'Script' appears in the string, return the string without 'Script'; otherwise, return the original one. Write a function taking one argument and returning the modified string to the variable 'foo'.", code: "const foo = function(str){\n \n}", protected_lines: 1, vars: "return [foo];", checks: [{msg: "Does the code correctly define the 'foo' function?", eval: `const expected = (str) => {if (str.length >= 5 && str.substring(4, 9) === 'Script') {return str.substring(0, 4) + str.substring(9);}return str;};const fooFunction = res[0];const testCases = [ { input: "JavaScript", expected: "Java" }, { input: "Hello World", expected: "Hello World" }, { input: "This is Scripting", expected: "This is Scripting" }, ];return testCases.every(testCase => fooFunction(testCase.input) === testCase.expected);`,},], page_content: false,},
  /* 12 */ {command: "Write a JavaScript program to find the closest value to 100 from two numerical values. If both values are at the same distance from 100, return them in an array. You should store a function taking two positive integers in the 'foo' variable.",code: "const foo = function(a, b){\n \n}",protected_lines: 1,vars: "return [foo];",checks: [{msg: "Does the code correctly define the 'foo' function to find the closest value to 100?",eval: `const expected = (a, b) => {if (a < 0 || b < 0) return "Both values must be positive.";const distA = Math.abs(100 - a);const distB = Math.abs(100 - b);if (distA < distB) return a;if (distB < distA) return b;return [a, b]; // Return both values in an array if they are equidistant};const fooFunction = res[0];const testCases = [ { a: 90, b: 120, expected: 90 }, { a: 130, b: 80, expected: 80 }, { a: 50, b: 150, expected: [50, 150] },];return testCases.every(testCase => {const result = fooFunction(testCase.a, testCase.b);if (Array.isArray(testCase.expected)) {// Check for arraysreturn Array.isArray(result) && result.length === 2 && result.includes(testCase.expected[0]) && result.includes(testCase.expected[1]);}return result === testCase.expected;});`,},],page_content: false,},
  /* 13 */ {command: "Write a JavaScript program to sort an array of integers in the variable 'arr'. Initialize 'arr' with 10 random integers.",code: "let arr = [2, 5, 1, 8, 9, 4, 3, 3, 10, 7]\n// Write your code here",protected_lines: 1,vars: "return [arr];",checks: [{msg: "Does the code correctly initialize 'arr' with 10 random integers and sort it?",eval: `const arr = res[0];if (!Array.isArray(arr) || arr.length !== 10) {return false;}const sortedArr = [...arr].sort((a, b) => a - b);return JSON.stringify(arr) === JSON.stringify(sortedArr);`,},],page_content: false,},
  /* 14 */ {command: "Write a JavaScript program to reverse the order of bits in an 8-bit unsigned integer. Store your function in 'foo' variable taking one integer and returning it with reversed bits. If given integer is out of range, return false",code: "const foo = function(num){\n \n}",protected_lines: 1,vars: "return [foo]",checks: [{msg: "Does the code correctly reverse the order of bits in an 8-bit integer?",eval: `function reverseBits(num) {if (num < 0 || num > 255) return false;let reversed = 0;for (let i = 0; i < 8; i++) {reversed = (reversed << 1) | (num & 1);num >>= 1;}return reversed;}const testCases = [ { input: 14, expected: 112 }, { input: 56, expected: 28 }, { input: 234, expected: 87 }, { input: 300, expected: false }, { input: -14, expected: false }, ];return testCases.every(testCase => reverseBits(testCase.input) === testCase.expected);`,},],page_content: false,},
  /* 15 */ {command: "Write a JavaScript program to find all distinct prime factors of a given integer. Store your function in the 'foo' variable. The function should take one positive integer and return an array of prime factors. If it's out of range or an incorrect value is given (like a decimal), the function should return false.", code: "const foo = function(num){\n \n}", protected_lines: 1, vars: "return [foo]", checks: [ { msg: "Does the code correctly find all distinct prime factors of a given integer?", eval: ` function getPrimeFactors(num) { if (num <= 0 || !Number.isInteger(num)) return false; const factors = []; let divisor = 2; while (num > 1) { while (num % divisor === 0) { factors.push(divisor); num /= divisor; } divisor++; } return factors; } const testCases = [ { input: 12, expected: [2, 3] }, { input: 56, expected: [2, 7] }, { input: 37, expected: [37] }, { input: 1, expected: [] }, { input: 27, expected: [3] }, { input: 1.5, expected: false }, { input: -14, expected: false }, ]; return testCases.every(testCase => { const result = res[0](testCase.input); if (Array.isArray(testCase.expected)) { return Array.isArray(result) && result.length === testCase.expected.length && result.every(val => testCase.expected.includes(val)); } return result === testCase.expected; });`, }, ], page_content: false },
  /* 16 */ {command: "Write a JavaScript program to convert a comma-separated value (CSV) string to a 2D array of objects. The first row of the string is used as the title row. Store your function in the 'foo' variable. The function should take one CSV string and return an object with two keys: 'cols' storing an array of columns and 'rows', a 2D array of cells.", code: "const foo = function(csv){\n \n};", protected_lines: 1, vars: "return [foo]", checks: [ { msg: "Does the code correctly convert a CSV string to a 2D array of objects?", eval: `const testCSV = "Name, Age, City\\nJohn, 25, New York\\nAlice, 30, San Francisco\\nBob, 22, Los Angeles"; const expectedOutput = { cols: ['Name', 'Age', 'City'], rows: [['John', '25', 'New York'], ['Alice', '30', 'San Francisco'], ['Bob', '22', 'Los Angeles']] }; const result = res[0](testCSV); return JSON.stringify(result) === JSON.stringify(expectedOutput);`, }, ], page_content: false },
  /* 17 */ {command: "Write a JavaScript program to filter out the specified values from a specified array. Return the original array without filtered values. Store your function in the 'foo' variable. The function should take an array and a value to remove, and it should return a modified array.", code: "const foo=(a,v)=>a.filter(e=>e!==v);", protected_lines: 1, vars: "return [foo];", checks: [ {msg: "Does the code correctly filter out the specified values from the array?", eval: `const t=[1,2,3,4,2,5],v=2,e=[1,3,4,5],r=res[0](t,v);return JSON.stringify(r)===JSON.stringify(e);`, }, ], page_content: false },
  /* 18 */ {command: "Write a JavaScript program to split the values of two given arrays into two groups. If an element in the filter is true, the corresponding element in the collection belongs to the first group; otherwise, it belongs to the second group. Write your function to 'foo' variable. It should take an array and a callback with a condition returning a boolean. It should return an object with two keys: first (elements which passed the test) and second (elements which didn't).", code: "const foo=(a, f) => {\n \n};", protected_lines: 1, vars: "return [foo];", checks: [ {msg: "Does the code correctly split the values of two arrays into two groups based on the filter condition?", eval: `const c=[1,2,3,4,5],f=v=>v%2===0,e={first:[2,4],second:[1,3,5]},r=res[0](c,f);return JSON.stringify(r)===JSON.stringify(e);`, }, ], page_content: false },
  /* 19 */ {command: "Write a JavaScript program to compute the average of an array. Write your function to 'foo' variable. It should take an array and return the average of its elements. If any element is not a number, return false.", code: "const foo = (a) => {\n \n};", protected_lines: 1, vars: "return [foo];", checks: [ {msg: "Does the code correctly compute the average of an array and handle non-numeric elements?", eval: `const arr1 = [1, 2, 3, 4, 5], arr2 = [1, 2, 'three', 4, 5], avg1 = 3, avg2 = false, res1 = res[0](arr1), res2 = res[0](arr2); return res1 === avg1 && res2 === avg2;`, }, ], page_content: false },
  /* 20 */ {command: "Write a JavaScript program to create an object with the same keys as the provided object. It will also generate values generated by running the provided function for each value. Write your function to 'foo' variable. It should take an object and a predicate function. It should return an object with all of its keys altered by the given function. If a value is an array, alter its elements too.", code: "const foo = (obj, fn) => {\n \n}", protected_lines: 1, vars: "return [foo];", checks: [ {msg: "Does the code correctly alter object keys by converting values to strings?", eval: `const inputObj = { a: 1, b: 'hello', c: [1, 2, 3] }; const expectedOutput = { a: '1', b: 'hello', c: ['1', '2', '3'] }; const result = res[0](inputObj, String); return JSON.stringify(result) === JSON.stringify(expectedOutput);`, }, {msg: "Does the code correctly alter object keys by adding 2 to each value?", eval: `const inputObj = { a: 1, b: 3, c: [1, 2, 3] }; const expectedOutput = { a: 3, b: 5, c: [3, 4, 5] }; const result = res[0](inputObj, v => v + 2); return JSON.stringify(result) === JSON.stringify(expectedOutput);`, }, ], page_content: false },
  /* 21 */ {command: "Write a JavaScript program to unflatten an object with paths for keys. A flattened object is an object where objects as values are not allowed. Its keys store the path of an actual JSON separated by dots. For example, {'a.b.c': 1} should be unflattened to {'a': {'b': {'c': 1}}}. Write your function to the 'foo' variable. It should take an object and return its unflattened version.", code: "const foo = (obj) => {\n \n}", protected_lines: 1, vars: "return [foo];", checks: [ {msg: "Does the code correctly unflatten a flattened object?", eval: `const inputObj = { 'a.b.c': 1, 'a.b.d': 2, 'x.y.z': 3 }; const expectedOutput = { a: { b: { c: 1, d: 2 } }, x: { y: { z: 3 } } }; const result = res[0](inputObj); return JSON.stringify(result) === JSON.stringify(expectedOutput);`, }, ], page_content: false },
  /* 22 */ {command: "Here is a sample HTML DOM file. Now change the text color to red for all paragraphs with class='class1'. All <b> elements with class='class1' should have text-decoration: underline. All elements with only class='class2' but not 'class1' should have a blue background color.", code: "// Your code here", protected_lines: 0, vars: "", checks: [{msg: "Do all <p> elements with class='class1' have the correct style properties?", eval: `const class1Paragraphs = document.querySelectorAll('p.class1'); return [...class1Paragraphs].every(p => p.style.color === 'red');`, }, {msg: "Do all <b> elements with class='class1' have text-decoration: underline?", eval: `const class1BoldElements = document.querySelectorAll('b.class1'); return [...class1BoldElements].every(b => b.style.textDecoration === 'underline');`, }, {msg: "Do all elements with only class='class2' but not 'class1' have the proper attributes?", eval: `const class2Elements = document.querySelectorAll('.class2:not(.class1)'); return [...class2Elements].every(el => el.style.backgroundColor === 'blue');`, },], page_content: (<div id="sample-page"><p class="class1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><b class="class1">Suspendisse gravida velit non odio porta, eget laoreet libero gravida.</b><p class="class2">Nulla facilisi. Duis id mi et nulla fringilla lacinia.</p><p class="class2">Cras ut ligula nec urna semper volutpat.</p><b class="class2">Mauris non metus eu odio tincidunt scelerisque vel ac quam.</b><p class="class1 class2">Fusce venenatis, erat ac sagittis facilisis, augue nisi aliquam arcu.</p><p class="class2">Pellentesque suscipit, felis eget mattis sollicitudin, erat justo feugiat odio.</p><b class="class1 class2">Curabitur lacinia vehicula erat, in cursus orci pharetra nec.</b><p class="class2">Vestibulum tristique, mauris eu blandit volutpat, ligula risus tincidunt metus.</p><b class="class2">Sed eget libero ac purus lacinia commodo in ut ligula.</b></div>),}

]

function App() {
  let line_div_arr = []

  const [CurrLevel, SetCurrLevel] = useState(0)
  const [CurrLevelId, SetCurrLevelId] = useState(0)

  for(let i = 1; i <= lines_of_code; i++){
    line_div_arr.push((
      <div>{i}</div>
    ))
  }

  const [ConsoleEntry, SetConsoleEntry] = useState([])
  const [Checks, SetChecks] = useState([])

  function limitLines(e) {
    const str = document.getElementById("code-content").value
    const cursor = document.getElementById("code-content").selectionStart
    let NumOfLines = 0
    let ProtectedChars = 0;

    for(let c of str){
      if(NumOfLines < CurrLevel.protected_lines){
        ProtectedChars++
      }
      
      if(c == '\n'){
        NumOfLines++
      }
    }


    let keynum = 0
    if(window.event) {
      keynum = e.keyCode;
    // Netscape/Firefox/Opera
    } else if(e.which) {
      keynum = e.which;
    }

    if(keynum == 13) {
      if(NumOfLines >= lines_of_code) {
        e.preventDefault()
      }
    }

    if(cursor <= ProtectedChars && (keynum < 37 || keynum > 40)){
      e.preventDefault()
    }

    document.getElementById('code-content-sidebar').scrollTop = document.getElementById('code-content').scrollTop;
  }

  function ChangeLevel(id){
    let id_in_range = Math.max(0, Math.min(id, Levels.length - 1))
    if(document.getElementById("page-input")){
      document.getElementById("page-input").value = id_in_range + 1
    }

    if(id < 0 || id >= Levels.length){
      return
    }

    if(document.getElementById("code-content")){
      document.getElementById("code-content").value = Levels[id].code
    }

    SetCurrLevel(Levels[id])
    SetCurrLevelId(id)

    let check_arr = []

    for(let check of Levels[id].checks){
      check_arr.push((<div style={{backgroundColor: "#FFFFFF88"}}>{check.msg}</div>))
    }

    SetChecks(check_arr)
  }

  useState(()=>{
    ChangeLevel(0)
  }, [1])

  function execute(e){
    let code = document.getElementById("code-content").value
    console.clear()
    var consoleLogs = [];

    // Override console.log to capture logs
    var originalConsoleLog = console.log;
    console.log = function() {
      originalConsoleLog.apply(console, arguments);
      consoleLogs.push({type: "log", value: arguments[0].toString()});
    };
    var originalConsoleError = console.error;
    console.error = function() {
      originalConsoleError.apply(console, arguments);
      consoleLogs.push({type: "error", value: arguments[0].toString()});
    };
    var originalConsoleWarn = console.warn;
    console.warn = function() {
      originalConsoleWarn.apply(console, arguments);
      consoleLogs.push({type: "warn", value: arguments[0].toString()});
    };
    var originalConsoleDebug = console.debug;
    console.debug = function() {
      originalConsoleDebug.apply(console, arguments);
      consoleLogs.push({type: "debug", value: arguments[0].toString()});
    };

    const foo = new Function(code + "\n" + CurrLevel.vars)

    const res = foo()

    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.debug = originalConsoleDebug;

    let arr = []

    for(let entry of consoleLogs){
      if(entry.type == "log"){
        arr.push((<div style={{color: "black"}}>{" > " + entry.value}</div>))
      }else if(entry.type == "error"){
        arr.push((<div style={{color: "red"}}>{" > " + entry.value}</div>))
      }else if(entry.type == "warn"){
        arr.push((<div style={{color: "gold"}}>{" > " + entry.value}</div>))
      }else if(entry.type == "debug"){
        arr.push((<div style={{color: "silver"}}>{" > " + entry.value}</div>))
      }
    }

    let check_arr = [];
    for (let check of CurrLevel.checks) {
      const bar = new Function("res", "consoleLogs", check.eval);
      const result = bar(res, consoleLogs);
    
      const divStyle = result ? { backgroundColor: "#00FF0088" } : { backgroundColor: "#FF000088" };
      check_arr.push(<div style={divStyle}>{check.msg}</div>);
    }

    SetChecks(check_arr)
    SetConsoleEntry(arr)
  }

  function triggerInput(ev){
    if (ev.key === 'Enter') {
      ChangeLevel(document.getElementById("page-input").value - 1)
    }
  }

  return (
    <div id="main">
      <div id="page-controls">
        <button id="prev" style={{backgroundColor: CurrLevelId == 0 ? "silver" : "red"}} onClick={(ev) => ChangeLevel(CurrLevelId - 1)}>Previous page</button>
        <div>Page <input type="number" id="page-input" onKeyDown={(ev) => triggerInput(ev)}/> of {Levels.length}</div>
        <button id="next" style={{backgroundColor: (CurrLevelId == Levels.length - 1) ? "silver" : "green"}} onClick={(ev) => ChangeLevel(CurrLevelId + 1)}>Next page</button>
      </div>
      <div id="command">
        {CurrLevel.command}
      </div>
      <div id="content">
        <div id="code">
          <div id="code-header">
            <button id="code-execute" onClick={(ev) => execute(ev)}>Execute!</button>
            <div id="code-tools">
              
            </div>
          </div>
          <div id="code-content-div">
            <div id="code-content-sidebar">
              {line_div_arr}
            </div>
            <textarea id="code-content" rows={lines_of_code} onKeyDown={(ev) => limitLines(ev)}>
              {CurrLevel.code}
            </textarea>
          </div>
        </div>
        {CurrLevel.page_content ? CurrLevel.page_content : (
          <div id="console">
            <div id="console-header">
              Console:
            </div>
            <div id="console-content">
              {ConsoleEntry}
            </div>
          </div>
        )}
      </div>
      <div id="checks">
          {Checks}
      </div>
    </div>
  );
}

export default App;
