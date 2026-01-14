import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tempDir = path.join(__dirname, 'temp');

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
}

export const runCpp = async (code, testcases) => {
    return new Promise((resolve, reject) => {
        const jobId = Math.random().toString(36).substring(7);
        const sourcePath = path.join(tempDir, `${jobId}.cpp`);
        const outPath = path.join(tempDir, `${jobId}.exe`);

        fs.writeFileSync(sourcePath, code);

        // Compile
        exec(`g++ "${sourcePath}" -o "${outPath}"`, (compileError, stdout, stderr) => {
            if (compileError) {
                try { fs.unlinkSync(sourcePath); } catch (e) { }
                return resolve({
                    verdict: "Compilation Error",
                    output: stderr
                });
            }

            // Run
            const executionCommand = `"${outPath}"`;

            // Timeout handling could be added here
            exec(executionCommand, { timeout: 5000 }, (runError, runStdout, runStderr) => {
                try {
                    fs.unlinkSync(sourcePath);
                    fs.unlinkSync(outPath);
                } catch (e) { }

                if (runError) {
                    // Check for timeout
                    if (runError.killed) {
                        return resolve({
                            verdict: "Time Limit Exceeded",
                            output: "Process execution timed out."
                        });
                    }
                    return resolve({
                        verdict: "Runtime Error",
                        output: runStderr || runError.message
                    });
                }

                resolve({
                    verdict: "Accepted",
                    output: runStdout
                });
            });
        });
    });
};
