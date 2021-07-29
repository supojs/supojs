#! /usr/bin/env node

import { Command } from 'commander';
import shell from 'shelljs';

const program = new Command();

program.command('create <name>')
  .description('start')
  .option('-t, --template <template>', 'Using a template project', 'hello-world')
  .action((name, options) => {
    console.log(name, options);
    shell.exec('git clone --quiet https://github.com/supojs/supojs > /dev/null')
    shell.exec(`mv supojs/examples/${options.template} ${name}`)
    shell.exec(`rm -rf supojs`)
  });

program.parse(process.argv);