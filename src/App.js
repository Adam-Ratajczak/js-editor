import { useState } from 'react';
import './App.scss';

const lines_of_code = 20

const Level = {
  command: "You have three variables given: a, b and c. Calculate 10th element of the fibonacci sequence where a should be an result.",
  code:"// write your code here\nlet a = 1;\nlet b = 0;\nlet c = 0;\n"
}

function App() {
  let line_div_arr = []

  for(let i = 1; i <= lines_of_code; i++){
    line_div_arr.push((
      <div>{i}</div>
    ))
  }

  const [ConsoleEntry, SetConsoleEntry] = useState([])

  function limitLines(e) {
    const str = document.getElementById("code-content").value
    let NumOfLines = 0

    for(let c of str){
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
  }

  function execute(e){
    const str = document.getElementById("code-content").value
    console.clear()
    var consoleLogs = [];

    // Override console.log to capture logs
    var originalConsoleLog = console.log;
    console.log = function() {
      originalConsoleLog.apply(console, arguments);
      consoleLogs.push({type: "log", value: Array.from(arguments)});
    };
    var originalConsoleError = console.error;
    console.error = function() {
      originalConsoleError.apply(console, arguments);
      consoleLogs.push({type: "error", value: Array.from(arguments)});
    };
    var originalConsoleWarn = console.warn;
    console.warn = function() {
      originalConsoleWarn.apply(console, arguments);
      consoleLogs.push({type: "warn", value: Array.from(arguments)});
    };
    var originalConsoleDebug = console.debug;
    console.debug = function() {
      originalConsoleDebug.apply(console, arguments);
      consoleLogs.push({type: "debug", value: Array.from(arguments)});
    };

    eval(str)

    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.debug = originalConsoleDebug;

    let arr = []

    for(let entry of consoleLogs){
      if(entry.type == "log"){
        arr.push((<div style={{color: "black"}}>{" > " + entry.value[0]}</div>))
      }else if(entry.type == "error"){
        arr.push((<div style={{color: "red"}}>{" > " + entry.value[0]}</div>))
      }else if(entry.type == "warn"){
        arr.push((<div style={{color: "gold"}}>{" > " + entry.value[0]}</div>))
      }else if(entry.type == "debug"){
        arr.push((<div style={{color: "silver"}}>{" > " + entry.value[0]}</div>))
      }
    }

    SetConsoleEntry(arr)
  }

  return (
    <div id="main">
      <div id="command">
        {Level.command}
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
              {Level.code}
            </textarea>
          </div>
        </div>
        <div id="console">
          <div id="console-header">
            Console:
          </div>
          <div id="console-content">
            {ConsoleEntry}
          </div>
        </div>
      </div>
      <div id="checks">

      </div>
    </div>
  );
}

export default App;
