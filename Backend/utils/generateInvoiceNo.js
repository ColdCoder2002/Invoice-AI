import Invoice from "../models/invoice.model.js";

const generateInvoiceNo = async (orgId) => {
    const year = new Date().getFullYear();

    const count = await Invoice.countDocuments({
        org: orgId,
        invoiceNo: { $regex: `^INV-${year}-` }
    })

    const nextNo = String(count + 1).padStart(4, "0")
    
    return `INV-${year}-${nextNo}`
}

export default generateInvoiceNo
