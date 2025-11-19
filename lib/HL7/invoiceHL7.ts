import type { InvoiceDataType, DataType } from "../types"

function ZmiRender(invData: InvoiceDataType): string {
  const ZmiFields = [
    "Invoice ID",
    "Invoice IDB",
    "Invoice Number",
    "Invoice Date",
    "Invoice Type",
    "Corporation Account Number",
    "Vendor Code",
    "Due Date",
    "Voucher Number",
    "Gross Invoice Amount",
    "Net Invoice Amount",
    "Short Pay Amount",
    "Vendor Term Amount",
    "Freight Amount",
    "State Tax and Provincial Refundable Tax Amount",
    "County Tax Amount",
    "City Tax Amount",
    "Miscellaneous Amount",
    "Batch Number",
    "PO Record ID",
    "PO Record IDB",
    "PO Number",
    "Note",
    "Code 1099",
    "Amount 1099",
    "User Name",
    "Account Group Record ID",,
    "Account Group Record IDB",
    "Bank Account",
    "Check Number",
    "Reference Number",
    "Check Date",
    "Check Amount",
    "Check Name",,
    "Vendor Remit Code",
    "Vendor Remit Name",
    "Vendor Term Code",
    "Single Check Indicator",
    "Fiscal Period",
    "Discount Date",
    "Invoice Discount Amount",
    "Invoice Status Field",
    "Interface Status Change Date",
    "Record Created Date",
    "Record Create User ID",,
    // "Record Create User IDB",
    // "Record Updated Date",
    // "Record Update User ID",
    // "Record Update User IDB",
    // "User Defined Text Name",
    // "User Defined Text Value",
    // "User Defined Memo Name",
    // "User Defined Memo Value",
    // "User Defined Date Name",
    // "User Defined Date Value",
    // "Miscellaneous Discount Amount",
    // "Net Payment Amount",
    // "Remit Vendor Net Due Days",
    // "Vendor Discount Rate",
    // "Remit Vendor Discount Due Days",
    // "End Month Indicator",
  ];
  return ZmiFields.map((field) => invData[field]).join("|");
}

function ZmlRender(invData: InvoiceDataType): string {
  const ZmlFields = [
    "Invoice Line ID",
    "Invoice Line IDB",
    "Line Invoice ID",
    "Line Invoice IDB",
    "Invoice Line Number",
    "Line Description",
    "Invoice Line Quantity",
    "Invoice Line UOM",
    "Invoice Line Price",
    "Debit Amount Indicator",
    "Invoice Line Pay Price",
    "Line Corporation Account Number",
    "Freight Code",
    "Freight With Tax",
    "State Compound Tax",
    "County Compound Tax",
    "City Compound Tax",
    "Invoice Line Miscellaneous Amount",
    "Approved Price",
    "Approved Quantity",
    "PO Line Record ID",
    "PO Line Record IDB",
    "PO Line Number",
    "PO Price",
    "Item Number",
    "Sub Account Number",
    "Expense Code Account Number",,
    "Cost Center Account Number",
    "Line Code 1099",
    "Line Amount 1099",
    "Line Note",
    "Line Discount Amount",
    "Line Discount Rate",
    "Payment Quantity",
    "Payment UOM",
    "Interface Status",
    "Reviewed Date",
    "Discrepant Note Record ID",
    "Discrepant Note Record IDB",
    "Resolved Note Record ID",
    "Resolved Note Record IDB",
    "Deliver Location Record ID",
    "Deliver Location Record IDB",
    "Line Record Created Date",
    "Line Record Create User ID",
    "Line Record Create User IDB",
    "Line Record Updated Date",
    "Line Record Update User ID",
    "Line Record Update User IDB",
    "Misc Discount Amount",
    // "Invoice Extended Cost",
    // "Project Code",
    // "Project Name",
    // "Sub Project Code",
    // "Sub Project Name",
    // "State Province ACC AMT",
    // "County ACC AMT",
    // "City ACC AMT",
    // "FRT State Province ACC AMT",
    // "FRT County ACC AMT",
    // "FRT City ACC AMT",
  ];
  return ZmlFields.map((field) => invData[field]).join("|");
}

export function formatAsInvoiceHL7(data: DataType, duplicateCount: number = 1): string[] {
  const invoiceData = data as InvoiceDataType;
  const highlightedFields: (keyof InvoiceDataType)[] = [
    "Invoice ID",
    "INV Number",
    "PO Number",
    "Vendor Number",
    "Org Item ID"
  ];

  let blocks: string[] = [];
  for (let i = 1; i <= duplicateCount; i++) {
    const modifiedData = { ...invoiceData };
    highlightedFields.forEach((field) => {
      if (field === "INV Line Number") {
        const baseNumber = parseInt(invoiceData[field]) || 1;
        modifiedData[field] = (baseNumber + i - 1).toString();
      } else {
        modifiedData[field] =
          invoiceData[field] + (i > 1 ? `-${i-1}` : "");
      }
    });

    const lines = [
      `MSH|^~&|SupplyChain|send facility|||201501121040||MFN^MUP|1421080860|P|2.2`,
      `ZMI|${ZmiRender(modifiedData)}`,
      `ZML|${ZmlRender(modifiedData)}`,
    ];
    
    blocks.push(lines.join("\r\n"));
  }
  
  return blocks.join("\r\n").split("\r\n");
} 