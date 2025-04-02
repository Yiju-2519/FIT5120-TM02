/**
 * Simple test to ensure tRPC imports are working
 */

// Test @trpc/client import
import { createTRPCProxyClient } from '@trpc/client';
console.log('Successfully imported from @trpc/client:', !!createTRPCProxyClient);

// Test @trpc/server import
import { initTRPC } from '@trpc/server';
console.log('Successfully imported from @trpc/server:', !!initTRPC);

// Test @trpc/react-query import
import { createTRPCReact } from '@trpc/react-query';
console.log('Successfully imported from @trpc/react-query:', !!createTRPCReact); 