const {
  degrees,
  PDFDocument,
  PDFImage,
  rgb,
  StandardFonts,
} = require("pdf-lib");
// const { degrees, PDFDocument, rgb, StandardFonts } require("pdf-lib");
const fs = require("fs").promises;

const pdf = "sample.pdf";
const img = "cat.jpeg";
const out = "out.pdf";

const main = async () => {
  const pdfBuf = await fs.readFile(pdf);
  const imgBuf = await fs.readFile(img);
  const pdfDoc = await PDFDocument.load(pdfBuf);
  const jpgImg = await pdfDoc.embedJpg(imgBuf);

  const pages = pdfDoc.getPages();
  if (pages.length < 1) {
    console.log("pages count is 0");
    return;
  }
  const firstPage = pages[0];

  const { width, height } = firstPage.getSize();

  firstPage.drawImage(jpgImg, {
    x: 25,
    y: 25,
    width: 100,
    height: 100,
  });

  const outBuf = await pdfDoc.save();
  fs.writeFile(out, outBuf);
};

main();
