import path from "path";
import ejs from "ejs";
import puppeteer from "puppeteer";
import { fileURLToPath } from "url";

// ESM workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateInvoice = async (invoiceData) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../Templates/invoiceTemplate.ejs"
    );
    const htmlContent = await ejs.renderFile(templatePath, {
      invoice: invoiceData,
    });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfPath = path.join(
      __dirname,
      `../invoices/invoice-${invoiceData.invoiceNumber}.pdf`
    );

    // Ensure invoices directory exists
    const fs = await import("fs/promises");
    await fs.mkdir(path.dirname(pdfPath), { recursive: true });

    await page.pdf({ path: pdfPath, format: "A4" });
    await browser.close();

    return pdfPath;
  } catch (error) {
    console.log("Error generating invoice: ", error);
    throw error;
  }
};

export default generateInvoice;
