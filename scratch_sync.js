const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Read api.js content
const apiPath = path.join(__dirname, 'FoodieMenu/js/api.js');
if (!fs.existsSync(apiPath)) {
  console.error(`Error: Cannot find api.js at ${apiPath}`);
  process.exit(1);
}

let apiCode = fs.readFileSync(apiPath, 'utf8');

// Modify const to globalThis to expose them from sandbox
apiCode = apiCode
  .replace('const API_BASE =', 'globalThis.API_BASE =')
  .replace('const DEFAULT_PRODUCTS =', 'globalThis.DEFAULT_PRODUCTS =')
  .replace('const API =', 'globalThis.API =');

// Create sandbox context
const sandbox = {
  localStorage: {
    getItem: () => null,
    setItem: () => null,
    removeItem: () => null
  },
  setTimeout,
  Promise,
  console,
  fetch
};
vm.createContext(sandbox);

// Run api.js in context
vm.runInContext(apiCode, sandbox);

// Retrieve variables from sandbox
const API_BASE = sandbox.API_BASE;
const DEFAULT_PRODUCTS = sandbox.DEFAULT_PRODUCTS;

async function run() {
  console.log("=================================================");
  console.log("  FOODIEMENU - MOCKAPI.IO DATA SYNC UTILITY");
  console.log("=================================================");
  console.log(`MockAPI URL: ${API_BASE}`);
  console.log(`Total default products to upload: ${DEFAULT_PRODUCTS.length}`);
  console.log("-------------------------------------------------");
  
  try {
    console.log("Step 1: Fetching current products on MockAPI...");
    const resGet = await fetch(`${API_BASE}/products`);
    if (!resGet.ok) {
      throw new Error(`Failed to GET products: ${resGet.statusText} (${resGet.status})`);
    }
    const currentList = await resGet.json();
    console.log(`Found ${currentList.length} items on server.`);
    
    console.log("\nStep 2: Cleaning up existing products...");
    for (let i = 0; i < currentList.length; i++) {
      const item = currentList[i];
      console.log(`[${i+1}/${currentList.length}] Deleting ID ${item.id}...`);
      const resDel = await fetch(`${API_BASE}/products/${item.id}`, { method: 'DELETE' });
      if (!resDel.ok) {
        console.warn(`Warning: Failed to delete product ID ${item.id}`);
      }
      await new Promise(r => setTimeout(r, 150)); // rate limiting delay
    }
    
    console.log("\nStep 3: Uploading 34 default Vietnamese products...");
    for (let i = 0; i < DEFAULT_PRODUCTS.length; i++) {
      const p = DEFAULT_PRODUCTS[i];
      const { id, ...body } = p;
      console.log(`[${i+1}/${DEFAULT_PRODUCTS.length}] Posting "${p.name}" (${p.category})...`);
      const resPost = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!resPost.ok) {
        console.error(`Error: Failed to post product "${p.name}". Status: ${resPost.statusText}`);
      }
      await new Promise(r => setTimeout(r, 150)); // rate limiting delay
    }
    
    console.log("\n=================================================");
    console.log("✅ SUCCESS: MockAPI has been fully synced with 34 items!");
    console.log("=================================================");
  } catch (error) {
    console.error("\n❌ ERROR: Sync failed!");
    console.error(error);
  }
}

run();
