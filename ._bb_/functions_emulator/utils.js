import path from "path";

const getBlock = (url) => {
  const blocks = {
  "Member_Fn_Block": {
    "name": "Member_Fn_Block",
    "type": "function",
    "directory": "/home/ntpl-398/cli/dev/Test_Package_Block/Member_Fn_Block",
    "middlewares": [],
    "relativeDirectory": "Member_Fn_Block"
  }
};

  const block = blocks[url];
  const route = block && path.join(block.directory, "index.js");

  return { route, block };
};

const getMiddlewareBlock = (url) => {
  const blocks = {};

  const block = blocks[url];
  const route = block && path.join(block.directory, "index.js");

  return { route, block };
};

export { getBlock, getMiddlewareBlock };