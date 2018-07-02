module.exports = isDev => {
  return {
    preserveWhitepace: true,
    cssModules: {
      // <style module> / :class="$style.className" 生成指定类名
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true
    }
  }
};
