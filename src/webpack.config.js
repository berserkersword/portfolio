module.exports = {
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif)$/i,
         dependency: { not: ['url'] },
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
          ],
        },
      ],
    }
  }