/* 
    Fotoğoraf ile işlemlerin yapıldığı rutlar için gerekli
    fonksiyonları bu bölümde bulabilirsiniz.
*/

const Photo = require('../Models/Photo');
const fs = require('fs');

exports.getPhoto = async (req, res) => {
  // console.log(req.paramas.id);
  const photo = await Photo.findById({ _id: req.params.id });
  res.render('photos', { photo });
};

exports.getAllPhotos = async (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'temp/index.html'));
  const photos = await Photo.find().sort('-createdDate');
  res.render('index', { photos });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`/photos/${req.params.id}`);
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  const uploadedPhoto = req.files.photo;
  const uploadPath = __dirname + '/../public/uploads/' + uploadedPhoto.name;

  uploadedPhoto.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedPhoto.name,
    });
    res.redirect('/');
  });
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  const uploadPath = __dirname + '/public' + photo.image;
  if (fs.existsSync(uploadPath))
    fs.unlinkSync(__dirname + '/../public' + photo.image);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
