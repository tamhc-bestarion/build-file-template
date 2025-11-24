export type ContractDataType = {
  Action: string
  "Contract Number": string
  "GPO ID": string
  Status: string
  "Contract Start Date": string
  "Contract End Date": string
  "GPO Name": string
  "Supplier Type": string
  "Org Item ID": string
  "Original Item Desc": string
  "MFR ID": string
  "MFR Name": string
  "MFR Item ID": string
  "Contract Item Start Date": string
  "Contract Item End Date": string
  "Vendor ID": string
  "Vendor Name": string
  "Vendor Item ID": string
  "Corp Number": string
  "Contract UOM": string
  "Contract QOE": string
  "Contract Price": string
}

export type PODataType = {
  "PO Number": string
  "PO Date": string
  "PO Line Number": string
  "PO Qty": string
  "PO UOM": string
  "PO Price": string
  "Vendor number": string
  "Item Vendor Name": string
  "Item Vendor Item ID": string
  "MFR ID": string
  "Item MFR Name": string
  "Item MFR Item ID": string
  "Org Item ID": string
  GL: string
  "Original Item Desc": string
  "Received Qty": string
}

export type IMDataType = {
  "Vendor ID": string
  "Vendor Name": string
  "Vendor Item ID": string
  "Org Item ID": string
  "Item Desc": string
  "MFR ID": string
  "MFR Name": string
  "MFR Item ID": string
  "UOM": string
  "QOE": string
  "Price": string
  "Corp Number": string
  "Corp Name": string
  "Expense Code Number": string
  "Expense Code Name": string
  "Location ID": string
}

export type InvoiceDataType = {
  "Invoice ID": string
  "Invoice IDB": string
  "Invoice Number": string
  "Invoice Date": string
  "Invoice Type": string
  "Corporation Account Number": string
  "Vendor Code": string
  "Due Date": string
  "Voucher Number": string
  "Gross Invoice Amount": string
  "Net Invoice Amount": string
  "Short Pay Amount": string
  "Vendor Term Amount": string
  "Freight Amount": string
  "State Tax and Provincial Refundable Tax Amount": string
  "County Tax Amount": string
  "City Tax Amount": string
  "Miscellaneous Amount": string
  "Batch Number": string
  "PO Record ID": string
  "PO Record IDB": string
  "PO Number": string
  "Note": string
  "Code 1099": string
  "Amount 1099": string
  "User Name": string
  "Account Group Record ID": string
  "Account Group Record IDB": string
  "Bank Account": string
  "Check Number": string
  "Reference Number": string
  "Check Date": string
  "Check Amount": string
  "Check Name": string
  "Vendor Remit Code": string
  "Vendor Remit Name": string
  "Vendor Term Code": string
  "Single Check Indicator": string
  "Fiscal Period": string
  "Discount Date": string
  "Invoice Discount Amount": string
  "Invoice Status Field": string
  "Interface Status Change Date": string
  "Record Created Date": string
  "Record Create User ID": string
  "Record Create User IDB": string
  "Record Updated Date": string
  "Record Update User ID": string
  "Record Update User IDB": string
  "User Defined Text Name": string
  "User Defined Text Value": string
  "User Defined Memo Name": string
  "User Defined Memo Value": string
  "User Defined Date Name": string
  "User Defined Date Value": string
  "Miscellaneous Discount Amount": string
  "Net Payment Amount": string
  "Remit Vendor Net Due Days": string
  "Vendor Discount Rate": string
  "Remit Vendor Discount Due Days": string
  "End Month Indicator": string
  // Invoice Line
  "Invoice Line ID": string
  "Invoice Line IDB": string
  "Line Invoice ID": string
  "Line Invoice IDB": string
  "Invoice Line Number": string
  "Item Description": string
  "Invoice Line Quantity": string
  "Invoice Line UOM": string
  "Invoice Line Price": string
  "Debit Amount Indicator": string
  "Invoice Line Pay Price": string
  "Line Corporation Account Number": string
  "Freight Code": string
  "Freight With Tax": string
  "State Compound Tax": string
  "County Compound Tax": string
  "City Compound Tax": string
  "Invoice Line Miscellaneous Amount": string
  "Approved Price": string
  "Approved Quantity": string
  "PO Line Record ID": string
  "PO Line Record IDB": string
  "PO Line Number": string
  "PO Price": string
  "Organization Item ID": string
  "Sub Account Number": string
  "Expense Code Account Number": string
  "Cost Center Account Number": string
  "Line Code 1099": string
  "Line Amount 1099": string
  "Line Notes": string
  "Invoice Line Discount Amount": string
  "Line Discount Rate": string
  "Payment Quantity": string
  "Payment UOM": string
  "Interface Status": string
  "Reviewed Date": string
  "Discrepant Note Record ID": string
  "Discrepant Note Record IDB": string
  "Resolved Note Record ID": string
  "Resolved Note Record IDB": string
  "Deliver Location Record ID": string
  "Deliver Location Record IDB": string
  "Line Record Created Date": string
  "Line Record Create User ID": string
  "Line Record Create User IDB": string
  "Line Record Updated Date": string
  "Line Record Update User ID": string
  "Line Record Update User IDB": string
  "Misc Discount Amount": string
  "Invoice Line Net Payment Amount": string
  "Project Code": string
  "Project Name": string
  "Sub-Project Code": string
  "Sub-Project Name": string
  "State Province Account Amount": string
  "Accrued County Tax Amount": string
  "Accrued City Tax Amount": string
  "FRT State Province Account Amount": string
  "FRT County Tax Amount": string
  "FRT City Tax Amount": string
}

export type DataType = ContractDataType | PODataType | IMDataType | InvoiceDataType

export type SectionType = "Home" |"Contract" | "POH" | "Item Master" | "Invoice"
