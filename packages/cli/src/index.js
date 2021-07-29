#! /usr/bin/env node

import { Command } from 'commander';
import shell from 'shelljs';

import { SupoServer } from "@supojs/core";

const program = new Command();

program.command('create <name>')
  .description('Create a new SupoJS project')
  .option('-t, --template <template>', 'Using a template project', 'hello-world')
  .action((name, options) => {
    shell.exec('git clone --quiet https://github.com/supojs/supojs > /dev/null')
    shell.exec(`mv supojs/examples/${options.template} ${name}`)
    shell.exec(`rm -rf supojs`)
    console.log('Project created! Run it with:');
    console.log(`cd ${name}`);
    console.log(`supojs serve`);
  });

  program.command('serve')
  .description('Serve')
  .action((name) => {
    console.log('Starting server...');
    const server = new SupoServer(process.cwd());
  });

program.parse(process.argv);