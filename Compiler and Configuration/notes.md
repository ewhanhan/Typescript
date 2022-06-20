### Watch Mode

- `tsc app.js --w` --> watch mode
  - Will start incremental compilation on file change

### TS Config File

- `tsc --init` --> create TS configuration file

  - can now run `tsc -w` which will watch all TS files and run incremental compilation

- exclude
  - can exclude specific TS files during compilation
- target
  - transcompile to specific JS version
- lib
  - specify specific Libraries you want to use
  - DOM API, etc...
- sourceMap
  - review TS code in debug console instead of just .js file
- outDir
  - where transpiled JS files should go
  - usually go to dist folder
- rootDir
  - specify root directory of TS files you want to compile
- noEmitOnError
  - true --> if TS files fail to compile it will not create the JS files
  - false by Default
- noImplicitAny
  - if true, we must declare the type for all parameters
- strictNullChecks
  - fail to compile variables that may or may not be `null` or `undefined`
- noUnusedLocals
  - no unused variables
- 