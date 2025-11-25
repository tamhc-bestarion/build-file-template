import type { InvoiceDataType, DataType } from "../types"

function ZmiRender(invData: InvoiceDataType): string {
  const ZmiFields = {
    "Invoice ID": "^", // column_0 -- 2500837
    "Invoice IDB": "|", // column_1 -- 1270
    "Invoice Number": "|", // column_2 -- 44966978
    "Invoice Date": "|", // column_3 -- 20141007000000
    "Invoice Type" : "|", // column_4 -- P
    "Corporation Account Number" : "|", // column_5 - 10
    "Vendor Code" : "|", // column_6 -- 2271
    "Due Date" : "|", // column_7 -- 20141206000000
    "Voucher Number" : "|", // column_8 -- 2447316
    "Gross Invoice Amount" : "|", // column_9 -- 3766.4000
    "Net Invoice Amount" : "|",  // column_10 -- 3716.4000
    "Short Pay Amount" : "|", // column_11 -- 0.0000
    "Vendor Term Amount" : "|", // column_12 -- 0.0000
    "Freight Amount" : "|", // column_13 -- 50.0000
    "State Tax and Provincial Refundable Tax Amount" : "|", // column_14 -- 0.00
    "County Tax Amount" : "|", // column_15 -- 0.0000
    "City Tax Amount" : "|", // column_16 -- 0.0000
    "Miscellaneous Amount" : "|", // column_17 -- 0.0000
    "Batch Number" : "|", // column_18 -- 0
    "PO Record ID" : "^", // column_19 -- 325616
    "PO Record IDB" : "|", // column_20 -- 1270
    "PO Number" : "|", // column_21 -- 325630
    "Note" : "|", // column_22 -- &quot;&quot;
    "Code 1099" : "|", // column_23 -- &quot;&quot;
    "Amount 1099" : "|", // column_24 -- 0.0000
    "User Name" : "|", // column_25 -- tyoung2
    "Account Group Record ID" : "^", // column_26 -- 1001
    "Account Group Record IDB" : "|", // column_27 -- 1270
    "Bank Account" : "|", // column_28 -- OPERATE
    "Check Number" : "|", // column_29 -- 0
    "Reference Number" : "|", // column_30 -- &quot;&quot;
    "Check Date" : "|", // column_31 -- 20141015090335
    "Check Amount" : "|", // column_32 -- 0.0000
    "Check Name" : "|", // column_33 -- &quot;&quot;
    "Vendor Remit Code" : "^", // column_34 -- BAX005
    "Vendor Remit Name" : "|", // column_35 -- BAXTER HEALTHCARE CORP
    "Vendor Term Code" : "|", // column_36 -- NET 60
    "Single Check Indicator" : "|", // column_37 -- N
    "Fiscal Period" : "|", // column_38 -- 01262015
    "Discount Date" : "|", // column_39 -- 20141206000000
    "Invoice Discount Amount" : "|", // column_40 -- 0.0000
    "Invoice Status Field" : "|", // column_41 -- 1
    "Interface Status Change Date" : "|", // column_42 -- 20150126082109
    "Record Created Date" : "|", // column_43 -- 20141015090355
    "Record Create User ID" : "^", // column_44 -- 1013
    "Record Create User IDB" : "|", // column_45 -- 1270
    "Record Updated Date" : "|", // column_46 -- 20150126082109
    "Record Update User ID" : "^", // column_47 -- 1385
    "Record Update User IDB" : "|", // column_48 -- 1270
    "User Defined Text Name" : "^", // column_49
    "User Defined Text Value" : "|", // column_50
    "User Defined Memo Name" : "^", // column_51
    "User Defined Memo Value" : "|", // column_52
    "User Defined Date Name" : "^", // column_53
    "User Defined Date Value" : "|", // column_54
    "Miscellaneous Discount Amount" : "|", // column_55 -- 0.0000
    "Net Payment Amount" : "|", // column_56 -- 3766.4000
    "Remit Vendor Net Due Days" : "|", // column_57 -- 60
    "Vendor Discount Rate" : "|", // column_58 -- 0.0000
    "Remit Vendor Discount Due Days" : "|", // column_59 -- 0
    "End Month Indicator" : "|", // column_60 -- N
  };

  const emptyFields = ["User Defined Text Name", "User Defined Memo Name", "User Defined Date Name"];

  const valuesDoubled = Object.entries(ZmiFields).map(([key, value], index) => {
    const valx = invData[key] ?? "";
    if (emptyFields.includes(key) && valx == "") {
        return "";
    }
    const val = Object.values(ZmiFields).length - 1 == index ? "" : value;
    return invData[key] + val;
  });
  return valuesDoubled.join("");
}

function ZmlRender(invData: InvoiceDataType): string {
  const ZmlFields = {
    "Invoice Line ID": "^", // column_61 -- 10205387
    "Invoice Line IDB": "|", // column_62 -- 1270
    "Line Invoice ID": "^", // Line Invoice ID -- column_63 -- 2500837
    "Line Invoice IDB": "|", // column_64 -- 1270
    "Invoice Line Number": "|", // column_65 -- 1
    "Item Description": "|", // column_66 -- FLOSEAL (1503352) 10 ML BAXTER 6/CA
    "Invoice Line Quantity": "|", // column_67 -- 2.0000
    "Invoice Line UOM": "|", // column_68 -- CA
    "Invoice Line Price": "|", // column_69 -- 1858.2000
    "Debit Amount Indicator": "|", // column_70 -- &quot;&quot;
    "Invoice Line Pay Price": "|", // column_71 -- 1858.2000
    "Line Corporation Account Number": "|", // column_72 -- 10
    "Freight Code": "|", // column_73
    "Freight With Tax": "|", // column_74 -- 50.00
    "State Compound Tax": "|", // column_75 -- 0.00
    "County Compound Tax": "|", // column_76 -- 0.00
    "City Compound Tax": "|", // column_77 -- 37.16
    "Invoice Line Miscellaneous Amount": "|", // column_78 -- 0.0000
    "Approved Price": "|", // column_79 -- 1858.2000
    "Approved Quantity": "|", // column_80 -- 2.0000
    "PO Line Record ID": "^", // column_81 -- 1495150
    "PO Line Record IDB": "|", // column_82 -- 1270
    "PO Line Number": "|", // column_83 -- 1
    "PO Price": "|", // column_84 -- 1858.2000
    "Organization Item ID": "|", // column_85 -- 86804
    "Sub Account Number": "|", // column_86 -- &quot;&quot;
    "Expense Code Account Number": "|", // column_87 -- 6375
    "Cost Center Account Number": "|", // column_88 -- 800
    "Line Code 1099": "|", // column_89 -- &quot;&quot;
    "Line Amount 1099": "|", // column_90 -- &quot;&quot;
    "Line Notes": "|", // column_91 -- &quot;&quot;
    "Invoice Line Discount Amount": "|", // column_92 -- 0.0000
    "Line Discount Rate": "|", // column_93 -- 0.0000
    "Payment Quantity": "|", // column_94 -- 2.0000
    "Payment UOM": "|", // column_95 -- CA
    "Interface Status": "|", // column_96 -- 1
    "Reviewed Date": "|", // column_97 -- 20150126082107
    "Discrepant Note Record ID": "^", // column_98 -- &quot;&quot;
    "Discrepant Note Record IDB": "|", // column_99 -- &quot;&quot;
    "Resolved Note Record ID": "^", // column_100 -- &quot;&quot;
    "Resolved Note Record IDB": "|", // column_101 -- &quot;&quot;
    "Deliver Location Record ID": "^", // column_102 -- 1152
    "Deliver Location Record IDB": "|", // column_103 -- 1270
    "Line Record Created Date": "|", // column_104 -- 20141015090355
    "Line Record Create User ID": "^", // column_105 -- 1385
    "Line Record Create User IDB": "|", // column_106 -- 1270
    "Line Record Updated Date": "|", // column_107 -- 20150126082107
    "Line Record Update User ID": "^", // column_108 -- 1385
    "Line Record Update User IDB": "|", // column_109 -- 1270
    "Misc Discount Amount": "|", // column_110 -- 0.0000
    "Invoice Line Net Payment Amount": "|", // column_111 -- 3803.56
    "Project Code": "^", // column_112 -- 10
    "Project Name": "|", // column_113 -- &quot;&quot;
    "Sub-Project Code": "^", // column_114 -- &quot;&quot;
    "Sub-Project Name": "|", // column_115 -- &quot;&quot;
    "State Province Account Amount": "|", // column_116
    "Accrued County Tax Amount": "|", // column_117
    "Accrued City Tax Amount": "|", // column_118
    "FRT State Province Account Amount": "|", // column_119
    "FRT County Tax Amount": "|", // column_120
    "FRT City Tax Amount": "|", // column_121
  };

  const emptyFields = ["State Province Account Amount", "Accrued County Tax Amount", "Accrued City Tax Amount", "FRT State Province Account Amount", "FRT County Tax Amount", "FRT City Tax Amount"];

  const removeLastSepFields = ["Sub-Project Name"];

  const valuesDoubled = Object.entries(ZmlFields).map(([key, value], index) => {
    const valx = invData[key] ?? "";
    if (emptyFields.includes(key) && valx == "") {
        return "";
    }
    const val = (removeLastSepFields.includes(key) || Object.values(ZmlFields).length - 1 == index) ? "" : value;
    return invData[key] + val;
  });
  return valuesDoubled.join("");
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
      `MSH|^~\\\&|SupplyChain|001|||||MI|54c8150000000001|P|2.5`,
      `ZMI|${ZmiRender(modifiedData)}`,
      `ZML|${ZmlRender(modifiedData)}`,
    ];
    
    blocks.push(lines.join('\r'));
  }
  
  return blocks.join('\r').split('\r');
} 