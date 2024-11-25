#!/usr/bin/env node

import { Command }  from ('commander');
import genDiff from '../src/index.js';
const program = new Command();

program
  .version('1.0.0') 
  .description('Compares two configuration files and shows a difference.')
  .argument('<file1>', 'first configuration file')
  .argument('<file2>', 'second configuration file')
  .option('-h, --help', 'Output usage information')
  .action((file1, file2, options) => {
    const diff = genDiff(file1, file2, options.format);
    console.log(diff);
  });

program.parse(process.argv); 
