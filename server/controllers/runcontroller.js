import { runJs } from "../executors/jsExecutor.js";

export const runCode = async (req, res) => {
    const { code, language, testcases } = req.body;

    try {
        let result;
        if (language === "js") {
            result = await runJs(code, testcases);
        }

        return res.json(result);
    } catch (err) {
        return res.json({
            verdict: "Runtime Error",
            message: err.message
        });
    }
};
