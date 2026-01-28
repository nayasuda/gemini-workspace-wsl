/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Manual verification script for MCP tool name normalization.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from 'zod';

function testSeparator(useDotNames: boolean) {
    const separator = useDotNames ? '.' : '_';
    console.log(`Testing with separator: "${separator}" (useDotNames: ${useDotNames})`);
    
    // Mock McpServer
    const server = {
        registerTool: (name: string, schema: any, handler: any) => {
            console.log(`Registered tool: "${name}"`);
            if (useDotNames && !name.includes('.')) {
                throw new Error(`Expected name to contain "." but got "${name}"`);
            }
            if (!useDotNames && name.includes('.')) {
                throw new Error(`Expected name not to contain "." but got "${name}"`);
            }
        }
    } as unknown as McpServer;

    // Apply the wrapper logic from index.ts
    const originalRegisterTool = server.registerTool;
    (server as any).registerTool = function(...args: any[]) {
        const [name, ...rest] = args;
        const normalizedName = name.replace(/\./g, separator);
        return (originalRegisterTool as any).apply(server, [normalizedName, ...rest]);
    };

    server.registerTool("test.tool", { inputSchema: z.object({}) }, async () => {});
}

try {
    testSeparator(false);
    testSeparator(true);
    console.log("Verification successful!");
} catch (error) {
    console.error("Verification failed:", error);
    process.exit(1);
}
