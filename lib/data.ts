import type { ContractDataType, PODataType, IMDataType, InvoiceDataType } from "./types"

export const contractData: ContractDataType = {
  Action: "MAD",
  "Contract Number": "CNB10041025",
  "GPO ID": "GPO",
  Status: "A",
  "Contract Start Date": "20250410",
  "Contract End Date": "20260410",
  "GPO Name": "VIZIENTQC",
  "Supplier Type": "M",
  "Org Item ID": "102156",
  "Original Item Desc": "SET FLUID WARMING HOTLINE #L70",
  "MFR ID": "S34|1",
  "MFR Name": "SMITHS MEDICAL SIMMS/PORTEX",
  "MFR Item ID": "L-70",
  "Contract Item Start Date": "20250312",
  "Contract Item End Date": "20251215",
  "Vendor ID": "HMPGMS-P",
  "Vendor Name": "HMPG PHARMACY LLC (HMPGMS-P)",
  "Vendor Item ID": "VCN10102000NHUTPM",
  "Corp Number": "995",
  "Contract UOM": "EA",
  "Contract QOE": "1",
  "Contract Price": "90",
}

export const poData: PODataType = {
  "PO Number": "2025010444",
  "PO Date": "20250401",
  "PO Line Number": "1",
  "PO Qty": "9",
  "PO UOM": "EA",
  "PO Price": "99.9",
  "Vendor number": "V03775",
  "Item Vendor Name": "CARDINAL HEALTH TEST",
  "Item Vendor Item ID": "VCN202503242",
  "MFR ID": "1757",
  "Item MFR Name": "JOHNSON AND JOHNSON HOSPITAL SERV.",
  "Item MFR Item ID": "MCN202503242",
  "Org Item ID": "X2345",
  GL: "299-95001731-8303200",
  "Original Item Desc": "New item 2",
  "Received Qty": "9",
}

export const itemMasterData: IMDataType = {
  "Vendor ID": "91",
  "Vendor Name": "ACCUTOME INC",
  "Vendor Item ID": "250424015A",
  "Org Item ID": "ITM250424015",
  "Item Desc": "Item 250424015",
  "MFR ID": "1319",
  "MFR Name": "WILLIS PRINTING",
  "MFR Item ID": "250424015B",
  "UOM": "EA",
  "QOE": "1",
  "Price": "50",
  "Corp Number": "10",
  "Corp Name": "TIFT REGIONAL MED CENTER",
  "Expense Code Number": "70290",
  "Expense Code Name": "CONTRACT PERSONNEL",
  "Location ID": "2087"
}

export const invoiceData: InvoiceDataType = {
  "Invoice ID": "2500837", // column_0 -- 2500837
  "Invoice IDB": "1270", // column_1 -- 1270
  "Invoice Number": "44966978", // column_2 -- 44966978
  "Invoice Date": "20141007000000", // column_3 -- 20141007000000
  "Invoice Type" : "P", // column_4 -- P
  "Corporation Account Number" : "10", // column_5 - 10
  "Vendor Code" : "2271", // column_6 -- 2271
  "Due Date" : "20141206000000", // column_7 -- 20141206000000
  "Voucher Number" : "2447316", // column_8 -- 2447316
  "Gross Invoice Amount" : "3766.4000", // column_9 -- 3766.4000
  "Net Invoice Amount" : "3716.4000",  // column_10 -- 3716.4000
  "Short Pay Amount" : "0.0000", // column_11 -- 0.0000
  "Vendor Term Amount" : "0.0000", // column_12 -- 0.0000
  "Freight Amount" : "50.0000", // column_13 -- 50.0000
  "State Tax and Provincial Refundable Tax Amount" : "0.00", // column_14 -- 0.00
  "County Tax Amount" : "0.0000", // column_15 -- 0.0000
  "City Tax Amount" : "0.0000", // column_16 -- 0.0000
  "Miscellaneous Amount" : "0.0000", // column_17 -- 0.0000
  "Batch Number" : "0", // column_18 -- 0
  "PO Record ID" : "325616", // column_19 -- 325616
  "PO Record IDB" : "1270", // column_20 -- 1270
  "PO Number" : "325630", // column_21 -- 325630
  "Note" : "&quot;&quot;", // column_22 -- &quot;&quot;
  "Code 1099" : "&quot;&quot;", // column_23 -- &quot;&quot;
  "Amount 1099" : "0.0000", // column_24 -- 0.0000
  "User Name" : "tyoung2", // column_25 -- tyoung2
  "Account Group Record ID" : "1001", // column_26 -- 1001
  "Account Group Record IDB" : "1270", // column_27 -- 1270
  "Bank Account" : "OPERATE", // column_28 -- OPERATE
  "Check Number" : "0", // column_29 -- 0
  "Reference Number" : "&quot;&quot;", // column_30 -- &quot;&quot;
  "Check Date" : "20141015090335", // column_31 -- 20141015090335
  "Check Amount" : "0.0000", // column_32 -- 0.0000
  "Check Name" : "&quot;&quot;", // column_33 -- &quot;&quot;
  "Vendor Remit Code" : "BAX005", // column_34 -- BAX005
  "Vendor Remit Name" : "BAXTER HEALTHCARE CORP", // column_35 -- BAXTER HEALTHCARE CORP
  "Vendor Term Code" : "NET 60", // column_36 -- NET 60
  "Single Check Indicator" : "N", // column_37 -- N
  "Fiscal Period" : "01262015", // column_38 -- 01262015
  "Discount Date" : "20141206000000", // column_39 -- 20141206000000
  "Invoice Discount Amount" : "0.0000", // column_40 -- 0.0000
  "Invoice Status Field" : "1", // column_41 -- 1
  "Interface Status Change Date" : "20150126082109", // column_42 -- 20150126082109
  "Record Created Date" : "20141015090355", // column_43 -- 20141015090355
  "Record Create User ID" : "1013", // column_44 -- 1013
  "Record Create User IDB" : "1270", // column_45 -- 1270
  "Record Updated Date" : "20150126082109", // column_46 -- 20150126082109
  "Record Update User ID" : "1385", // column_47 -- 1385
  "Record Update User IDB" : "1270", // column_48 -- 1270
  "User Defined Text Name" : "", // column_49
  "User Defined Text Value" : "", // column_50
  "User Defined Memo Name" : "", // column_51
  "User Defined Memo Value" : "", // column_52
  "User Defined Date Name" : "", // column_53
  "User Defined Date Value" : "", // column_54
  "Miscellaneous Discount Amount" : "0.0000", // column_55 -- 0.0000
  "Net Payment Amount" : "3766.4000", // column_56 -- 3766.4000
  "Remit Vendor Net Due Days" : "60", // column_57 -- 60
  "Vendor Discount Rate" : "0.0000", // column_58 -- 0.0000
  "Remit Vendor Discount Due Days" : "0", // column_59 -- 0
  "End Month Indicator" : "N", // column_60 -- N

  "Invoice Line ID": "10205387", // column_61 -- 10205387
  "Invoice Line IDB": "1270", // column_62 -- 1270
  "Line Invoice ID": "2500837", // Line Invoice ID -- column_63 -- 2500837
  "Line Invoice IDB": "1270", // column_64 -- 1270
  "Invoice Line Number": "1", // column_65 -- 1
  "Item Description": "FLOSEAL (1503352) 10 ML BAXTER 6/CA", // column_66 -- FLOSEAL (1503352) 10 ML BAXTER 6/CA
  "Invoice Line Quantity": "2.0000", // column_67 -- 2.0000
  "Invoice Line UOM": "CA", // column_68 -- CA
  "Invoice Line Price": "1858.2000", // column_69 -- 1858.2000
  "Debit Amount Indicator": "&quot;&quot;", // column_70 -- &quot;&quot;
  "Invoice Line Pay Price": "1858.2000", // column_71 -- 1858.2000
  "Line Corporation Account Number": "10", // column_72 -- 10
  "Freight Code": "", // column_73
  "Freight With Tax": "50.00", // column_74 -- 50.00
  "State Compound Tax": "0.00", // column_75 -- 0.00
  "County Compound Tax": "0.00", // column_76 -- 0.00
  "City Compound Tax": "37.16", // column_77 -- 37.16
  "Invoice Line Miscellaneous Amount": "0.0000", // column_78 -- 0.0000
  "Approved Price": "1858.2000", // column_79 -- 1858.2000
  "Approved Quantity": "2.0000", // column_80 -- 2.0000
  "PO Line Record ID": "1495150", // column_81 -- 1495150
  "PO Line Record IDB": "1270", // column_82 -- 1270
  "PO Line Number": "1", // column_83 -- 1
  "PO Price": "1858.2000", // column_84 -- 1858.2000
  "Organization Item ID": "86804", // column_85 -- 86804
  "Sub Account Number": "&quot;&quot;", // column_86 -- &quot;&quot;
  "Expense Code Account Number": "6375", // column_87 -- 6375
  "Cost Center Account Number": "800", // column_88 -- 800
  "Line Code 1099": "&quot;&quot;", // column_89 -- &quot;&quot;
  "Line Amount 1099": "&quot;&quot;", // column_90 -- &quot;&quot;
  "Line Notes": "&quot;&quot;", // column_91 -- &quot;&quot;
  "Invoice Line Discount Amount": "0.0000", // column_92 -- 0.0000
  "Line Discount Rate": "0.0000", // column_93 -- 0.0000
  "Payment Quantity": "2.0000", // column_94 -- 2.0000
  "Payment UOM": "CA", // column_95 -- CA
  "Interface Status": "1", // column_96 -- 1
  "Reviewed Date": "20150126082107", // column_97 -- 20150126082107
  "Discrepant Note Record ID": "&quot;&quot;", // column_98 -- &quot;&quot;
  "Discrepant Note Record IDB": "&quot;&quot;", // column_99 -- &quot;&quot;
  "Resolved Note Record ID": "&quot;&quot;", // column_100 -- &quot;&quot;
  "Resolved Note Record IDB": "&quot;&quot;", // column_101 -- &quot;&quot;
  "Deliver Location Record ID": "1152", // column_102 -- 1152
  "Deliver Location Record IDB": "1270", // column_103 -- 1270
  "Line Record Created Date": "20141015090355", // column_104 -- 20141015090355
  "Line Record Create User ID": "1385", // column_105 -- 1385
  "Line Record Create User IDB": "1270", // column_106 -- 1270
  "Line Record Updated Date": "20150126082107", // column_107 -- 20150126082107
  "Line Record Update User ID": "1385", // column_108 -- 1385
  "Line Record Update User IDB": "1270", // column_109 -- 1270
  "Misc Discount Amount": "0.0000", // column_110 -- 0.0000
  "Invoice Line Net Payment Amount": "3803.56", // column_111 -- 3803.56
  "Project Code": "&quot;&quot;", // column_112 -- &quot;&quot;
  "Project Name": "&quot;&quot;", // column_113 -- &quot;&quot;
  "Sub-Project Code": "&quot;&quot;", // column_114 -- &quot;&quot;
  "Sub-Project Name": "&quot;&quot;", // column_115 -- &quot;&quot;
  "State Province Account Amount": "", // column_116
  "Accrued County Tax Amount": "", // column_117
  "Accrued City Tax Amount": "", // column_118
  "FRT State Province Account Amount": "", // column_119
  "FRT County Tax Amount": "", // column_120
  "FRT City Tax Amount": "", // column_121
}
