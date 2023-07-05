const router = require("express").Router();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: "dqt1e2g5d",
  api_key: "961323489459656",
  api_secret: "7R-Z6O4JdhFfDqCoyUirDCBa_SI",
});

router.post("/uploadfoto", async (req, res) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    const base64Data = req.body.file; // Dados em base64 da imagem

    const response = await cloudinary.uploader.upload(base64Data, options);
    console.log("Imagem enviada com sucesso:", response.secure_url);

    res.status(200).json({ success: true, url: response.secure_url });
  } catch (error) {
    console.error("Erro ao enviar a imagem:", error);
    res.status(500).json({ success: false, error: "Erro ao enviar a imagem" });
  }
});

module.exports = router;
