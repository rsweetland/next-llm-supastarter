// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
// https://github.com/prisma/prisma/issues/8558#issuecomment-1102176746
global.setImmediate = global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));
global.clearImmediate = global.clearImmediate || ((fn) => global.clearTimeout(fn));
