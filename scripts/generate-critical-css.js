import { generate } from "critical";
import fs from "fs";
import path from "path";
import process from "node:process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hugoSite = path.join(__dirname, "..", "test-site");
const configPath = path.join(__dirname, "..", "critical.config.json");
let userConfig = {};
if (fs.existsSync(configPath)) {
    userConfig = JSON.parse(fs.readFileSync(configPath, "utf8"));
}

const criticalConfig = userConfig.critical;
if (!criticalConfig) throw new Error("Missing 'critical' config");

const config = {
    base: hugoSite,
    ...criticalConfig,
};

const pages = userConfig.pages;

async function generateCriticalCSS() {
    console.log("Generating critical CSS...");

    for (const page of pages) {
        const pageConfig = {
            base: config.base,
            ...config,
            src: page.url,
            target: {
                css: `../assets/scss/critical-${page.name}.scss`,
                html: `${page.name}-critical.html`,
            },
        };

        console.log(
            `Generating critical CSS for ${page.name} page (${page.url})...`,
        );

        try {
            const sourcePath = path.join(config.base, page.url);
            if (!fs.existsSync(sourcePath)) {
                console.warn(
                    `Source file not found: ${sourcePath}, skipping...`,
                );
                continue;
            }

            const result = await generate(pageConfig);

            const criticalDir = path.join(__dirname, "..", "assets", "scss");
            if (!fs.existsSync(criticalDir)) {
                fs.mkdirSync(criticalDir, { recursive: true });
            }

            const criticalPath = path.join(
                criticalDir,
                `critical-${page.name}.scss`,
            );
            const scssContent = `// Auto-generated critical CSS for ${page.name} page
// Source: ${page.url}
${page.description ? `// ${page.description}` : ""}

${result.css}
`;

            fs.writeFileSync(criticalPath, scssContent);
            console.log(
                `Critical CSS saved to: assets/scss/critical-${page.name}.scss`,
            );
        } catch (pageError) {
            console.warn(
                `Failed to generate critical CSS for ${page.name}: ${pageError.message}`,
            );
        }
    }
}

if (import.meta.url === `file://${process.argv[1]}`) {
    generateCriticalCSS();
}

export { generateCriticalCSS, config };
