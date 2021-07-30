#! /usr/bin/env node

const Command = require('commander').Command;
const shell = require('shelljs');

const SupoServer = require("@supojs/core").SupoServer;

const program = new Command();
const repoFolder = 'xxxxxz-templates-repo';

program.command('create <name>')
  .description('Create a new SupoJS project')
  .option('-t, --template <template>', 'Using a template project', 'hello-world')
  .action((name, options) => {
    shell.exec(`git clone --quiet https://github.com/supojs/supojs ${repoFolder} > /dev/null`)
    shell.exec(`mv ${repoFolder}/examples/${options.template} ${name}`)
    shell.exec(`rm -rf ${repoFolder}`)
    
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