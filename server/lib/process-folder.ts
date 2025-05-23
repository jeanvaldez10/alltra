import path from "path";
import fs from "fs";

interface MemoryPath {
    path: string;
    regex: RegExp;
    params: string[];
}

const memory: MemoryPath[] = [];

/**
 * Recursively processes a folder to import and register API routes.
 * @param {string} folderPath - The path to the folder to process.
 * @param {string} parentFolder - The base route path for the current folder.
 * @param {any} app - The Express app instance.
 */
function processFolder(folderPath: string, parentFolder: string, app: any) {
    if (!fs.existsSync(folderPath)) {
        console.log(`Folder does not exist: ${folderPath}`);
        return;
    }

    const items = fs.readdirSync(folderPath);
    if (!items || items.length === 0) {
        console.log(`Folder is empty: ${folderPath}`);
        return;
    }

    items.forEach((item) => {
        const itemPath = path.join(folderPath, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
            const routeSegment = item.replace(/\[([^\]]+)\]/g, ':$1');
            processFolder(itemPath, `${parentFolder}/${routeSegment}`, app);
        } else if (stat.isFile() && item.endsWith('.ts')) {
            let apiPath = `${parentFolder}/${item}`;
            
            if (item.toLowerCase() === 'index.ts') {
                apiPath = apiPath.replace(/index\.ts$/i, '');
            } else {
                apiPath = apiPath.replace(/\.ts$/, '');
            }

            apiPath = apiPath.replace(/\[([^\]]+)\]/g, ':$1');

            // Normalize: remove trailing slash unless it's the root
            if (apiPath !== '/') {
                apiPath = apiPath.replace(/\/$/, '');
            }

            // Extract params and create regex
            const params: string[] = [];
            const regexPattern = apiPath.replace(/:(\w+)/g, (match, param) => {
                params.push(param);
                return '([^/]+)'; // Capture any non-slash characters
            });
            const regex = new RegExp(`^${regexPattern}$`);

            try {
                const modulePath = path.resolve(itemPath);
                const module = require(modulePath);

                if (module && module.default) {
                    app.use(apiPath, module.default);
                    console.log(`Imported and using module from ${modulePath} at ${apiPath}`);
                    memory.push({ path: apiPath, regex, params });
                } else {
                    console.log(`Module at ${modulePath} has no default export`);
                }
            } catch (err) {
                console.error(`Error importing file at ${itemPath}:`, err);
            }
        }
    });
}

/**
 * Extracts route parameters from the request URL using the stored memory.
 * @param {any} req - The Express request object.
 * @returns {Record<string, string>} - An object containing parameter names and values.
 */
function useParams(req: any): Record<string, string> {
    // Construct the full request path and normalize it
    let requestPath = (req.baseUrl + req.path).replace(/\/$/, '');
    if (requestPath === '') requestPath = '/';

    // Find a matching route in memory
    for (const route of memory) {
        const match = requestPath.match(route.regex);
        if (match) {
            const paramsObj: Record<string, string> = {};
            route.params.forEach((param, index) => {
                paramsObj[param] = match[index + 1]; // Capture groups start at index 1
            });
            return paramsObj;
        }
    }
    return {}; // No match found
}

export { useParams };

export default processFolder;