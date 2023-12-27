require('@babel/register');
module.exports = {
    default: `--require src/tests/integration/*.steps.js src/tests/integration/*.feature`,
  };
  