import { useState } from 'react';
import './App.scss';

const lines_of_code = 20

const Levels = [
  {
    command: "You have three variables given: a, b and c. Calculate 10th element of the fibonacci sequence where a should be a result. Print a result in the console.",
    code:"let a = 1;\nlet b = 0;\nlet c = 0;\n// write your code here\n",
    protected_lines: 3,
    vars: "return [a, b, c];",
    checks: [
      {msg: "Is 'a' variable valid?", eval: "return res[0] == 89"},
      {msg: "Is value printed in the console?", eval: "for(let cmd of consoleLogs){if(cmd.value == res[0]){ return true;}}\nreturn false;"}
    ],
    page_content: false
  },
  {
    command: "You have three variables given: a, b and c. Calculate 10th element of the fibonacci sequence where a should be a result. Print a result in the console.",
    code:"let a = 1;\nlet b = 0;\nlet c = 0;\n// write your code here\n",
    protected_lines: 3,
    vars: "return [a, b, c];",
    checks: [
      {msg: "Is 'a' variable valid?", eval: "return res[0] == 89"},
      {msg: "Is value printed in the console?", eval: "for(let cmd of consoleLogs){if(cmd.value == res[0]){ return true;}}\nreturn false;"}
    ],
    page_content: (<div id="sample-page"><p>bajo jajo</p></div>)
  },
  {
    command: "You have three variables given: a, b and c. Calculate 10th element of the fibonacci sequence where a should be a result. Print a result in the console.",
    code:"let a = 1;\nlet b = 0;\nlet c = 0;\n// write your code here\n",
    protected_lines: 3,
    vars: "return [a, b, c];",
    checks: [
      {msg: "Is 'b' variable valid?", eval: "return res[0] == 89"},
      {msg: "Is value printed in the console?", eval: "for(let cmd of consoleLogs){if(cmd.value == res[0]){ return true;}}\nreturn false;"}
    ],
    page_content: (<div id="sample-page"><p>bajo jajo</p></div>)
  },
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
  }

  function ChangeLevel(id){
    if(id < 0 || id >= Levels.length){
      return
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

  return (
    <div id="main">
      <div id="page-controls">
        <button id="prev" style={{backgroundColor: CurrLevelId == 0 ? "silver" : "red"}} onClick={(ev) => ChangeLevel(CurrLevelId - 1)}>Previous page</button>
        <div>Page {CurrLevelId + 1} of {Levels.length}</div>
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
