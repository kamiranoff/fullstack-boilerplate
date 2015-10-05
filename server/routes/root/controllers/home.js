
/*!
 * Module dependencies.
 */

exports.index = function (req, res) {
  res.render('root/views/home/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};
