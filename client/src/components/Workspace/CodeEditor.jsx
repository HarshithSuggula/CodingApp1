// import React, { useState } from "react";
// import "./Workspace.css";
// import Editor from "@monaco-editor/react";

// const CodeEditor = ({ onChange }) => {
//   const [value, setValue] = useState("");

//   const handleEditorChange = (value) => {
//     setValue(value);
//     onChange(value);
//   };

//   return (
//     <div className="editor-container">
//       <div className="code-editor-heading">JavaScript</div>
//       <Editor
//         width={`100%`}
//         language={"javascript"}
//         value={value}
//         defaultValue="// Write Your Code Here...
//         // You have to write a code with function and calling it with required parameters...
//         // Work on process for dynamic experience."
//         onChange={handleEditorChange}
//       />
//     </div>
//   );
// };

// export default CodeEditor;



import React, { useState, useEffect } from "react";
import "./Workspace.css";
import Editor from "@monaco-editor/react";
import * as monaco from "monaco-editor";

const LANGUAGES = {
  javascript: {
    label: "JavaScript",
    monaco: "javascript",
    starter: `// JavaScript Starter Code
function main() {
  // write your code here
}

main();
`,
  },
  python: {
    label: "Python",
    monaco: "python",
    starter: `# Python Starter Code
def main():
    # write your code here
    pass

main()
`,
  },
  cpp: {
    label: "C++",
    monaco: "cpp",
    starter: `// C++ Starter Code
#include <bits/stdc++.h>
using namespace std;

int main() {
    // write your code here
    return 0;
}
`,
  },
};

const CodeEditor = ({ onChange }) => {
  const [language, setLanguage] = useState("javascript");
  const [value, setValue] = useState(LANGUAGES.javascript.starter);

  /* ---------- JavaScript IntelliSense Setup ---------- */
  useEffect(() => {
    if (language === "javascript") {
      monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        allowNonTsExtensions: true,
      });

      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });

      monaco.languages.typescript.javascriptDefaults.addExtraLib(
        `
        declare var console: {
          log(message?: any, ...optionalParams: any[]): void;
          error(message?: any, ...optionalParams: any[]): void;
        };
        `,
        "ts:globals.d.ts"
      );

      // Custom snippets
      monaco.languages.registerCompletionItemProvider("javascript", {
        provideCompletionItems: () => ({
          suggestions: [
            {
              label: "for-loop",
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                "for (let i = 0; i < ${1:n}; i++) {",
                "  ${2}",
                "}",
              ].join("\n"),
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            },
            {
              label: "console.log",
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: "console.log($1);",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            },
          ],
        }),
      });
    }
  }, [language]);

  /* ---------- Language Switch ---------- */
  useEffect(() => {
    setValue(LANGUAGES[language].starter);
    onChange(LANGUAGES[language].starter);
  }, [language]);

  const handleEditorChange = (val) => {
    setValue(val);
    onChange(val);
  };

  return (
    <div className="editor-container">
      {/* Header */}
      <div className="code-editor-header">
        <span className="code-editor-heading">
          {LANGUAGES[language].label}
        </span>

        <select
          className="language-dropdown"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {Object.entries(LANGUAGES).map(([key, lang]) => (
            <option key={key} value={key}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Editor */}
      <Editor
        height="100%"
        width="100%"
        language={LANGUAGES[language].monaco}
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          automaticLayout: true,

          // Suggestions
          quickSuggestions: language === "javascript",
          suggestOnTriggerCharacters: language === "javascript",
          wordBasedSuggestions: true,
          parameterHints: { enabled: language === "javascript" },
          tabCompletion: "on",

          // Editor UX
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          formatOnType: true,
          formatOnPaste: true,
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
};

export default CodeEditor;