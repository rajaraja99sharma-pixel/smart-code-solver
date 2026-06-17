
self.onmessage = function (e) {
  try {
    let output = "";

    // console.log support
    const console = {
      log: (...args) => {
        output += args.join(" ") + "\n";
      }
    };

    const { code, input } = e.data;

    // user code wrap
    const wrappedCode = `
      (function(){
        let input = \`${input}\`;

        ${code}
      })()
    `;

    let result = eval(wrappedCode);

    if (result !== undefined) {
      output += result;
    }

    self.postMessage(output || "No Output");

  } catch (err) {
    self.postMessage("Error: " + err.message);
  }
};