import { defineConfig } from "vite";

function moduleIdToChunks(id) {
    const nodules = "node_modules";

	if (id.includes(nodules)) {
		/**
         * E.g. /home/sole/project/node_modules/barcode-detector/dist/es/pure.js
         * splits into
         * [
         *      '/home/sole/project/',
         *      '/barcode-detector/dist/es/pure.js'
         * ]
		*/
        
		let parts = id.split(nodules);
		let modulePath = parts[1];
        // Remove the initial / if present
		if (modulePath.startsWith("/")) {
			modulePath = modulePath.slice(1);
		}

        // Split the rest by '/'
        // so you get barcode-detector, dist, es, pure.js
		let moduleParts = modulePath.split("/");

		if (moduleParts.length > 0) {
            // Returns barcode-detector
            // So all related imports are packaged together
			return moduleParts[0];
		}

		// and if we can't figure it out, we return 'vendor'
		return "vendor";
	}

    return 'rest';
}

function verboseModuleIdToChunks(id) {
    let chunkName = moduleIdToChunks(id);

    console.log(`id2chunks: ${id} => ${chunkName}`);

    return chunkName;
}


export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: verboseModuleIdToChunks
            }
        }
    }
});