module.exports = {
  process(src) {
    // react-static uses blob so let's encode the source for jest
    const newSrc = `data:text/plain:base64,${Buffer.from(src).toString('base64')}`;
    return `module.exports = '${newSrc}';`;
  },
};
