import fs from "fs";
import { spawnSync } from "child_process";

export const runJs = async (code, testcases) => {
    console.log(code, testcases);

    // 🔧 Normalize testcases
    if (Array.isArray(testcases[0])) {
        testcases = testcases.flat();
    }

    const filename = `temp_${Date.now()}.js`;

    fs.writeFileSync(filename, code);

    try {
        for (let tc of testcases) {
            const result = spawnSync(
                "node",
                [filename],
                {
                    input: tc.input,
                    timeout: 2000,
                    encoding: "utf-8"
                }
            );

            if (result.error) {
                if (result.error.code === "ETIMEDOUT") {
                    return { verdict: "Time Limit Exceeded" };
                }
                return {
                    verdict: "Runtime Error",
                    message: result.error.message
                };
            }

            const output = (result.stdout || "").trim();
            const expected = tc.output.trim();

            if (output !== expected) {
                return {
                    verdict: "Wrong Answer",
                    input: tc.input,
                    expected,
                    got: output
                };
            }
        }

        return { verdict: "Accepted" };

    } finally {
        if (fs.existsSync(filename)) {
            fs.unlinkSync(filename);
        }
    }
};
