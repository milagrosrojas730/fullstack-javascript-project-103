#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .description('Compares two configuration files and shows a difference.')
  .argument('<filepath1>', 'path to the first file')
  .argument('<filepath2>', 'path to the second file')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format (default: stylish)', 'stylish')
  .action((file1, file2, options) => {
    const diff = genDiff(file1, file2, options.format);
    console.log(diff);
  });

program.parse(process.argv);
