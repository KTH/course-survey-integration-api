#!/usr/bin/env npx ts-node
import fs from 'fs/promises';
import path from 'path';
import YAML from 'yaml';

/*
 * Helper functions
 */

let _assertFailed = false;
function assert(condition: any, message: string): asserts condition {
  if (!condition) {
    console.error(`Error: ${message}`);
    _assertFailed = true;
  }
}

function abortIfAssertFailed() {
  if (_assertFailed) {
    process.exit(1);
  }
}

/*
 * Here comes the actual script
 */

async function convertYamlToJson(sourcePath: string, destinationPath: string) {
  const yamlString = await fs.readFile(path.resolve(sourcePath), 'utf-8');
  const jsonObject = YAML.parse(yamlString);
  const jsonString = JSON.stringify(jsonObject, null, 2);
  await fs.writeFile(path.resolve(destinationPath), jsonString);
}

(async function main() {
  // Get source and destination paths from command line arguments
  const [sourcePath, destinationPath] = process.argv.slice(2);
  assert(sourcePath, 'Source path is required');
  assert(destinationPath, 'Destination path is required');
  abortIfAssertFailed();

  try {
    await convertYamlToJson(sourcePath, destinationPath);
    console.log('YAML file converted to JSON');
  } catch (error) {
    console.error('Error converting YAML to JSON:', error);
  }
})()
