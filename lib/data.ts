import type { ContractDataType, PODataType, IMDataType, InvoiceDataType } from "./types"

export const contractData: ContractDataType = {
  Action: "MAD",
  "Contract Number": "CNB10041025",
  "GPO ID": "GPONV",
  Status: "A",
  "Contract Start Date": "20250410",
  "Contract End Date": "20260410",
  "GPO Name": "GPONV",
  "Supplier Type": "D",
  "Org Item ID": "102156",
  "Original Item Desc": "SET FLUID WARMING HOTLINE #L70",
  "MFR ID": "7255",
  "MFR Name": "ASSOCIATED BAG",
  "MFR Item ID": "251216001",
  "Contract Item Start Date": "20250820",
  "Contract Item End Date": "20261215",
  "Vendor ID": "976",
  "Vendor Name": "FISHER HEALTHCARE INC",
  "Vendor Item ID": "251216001",
  "Corp Number": "11300",
  "Contract UOM": "EA",
  "Contract QOE": "1",
  "Contract Price": "20",
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

/**
 * Parse HL7 invoice string (MSH + ZMI + ZML segments) into InvoiceDataType.
 *
 * ZMI pipe positions → column mapping:
 *   [1]  col0^col1   Invoice ID ^ Invoice IDB
 *   [2]  col2        Invoice Number
 *   [3]  col3        Invoice Date
 *   [4]  col4        Invoice Type
 *   [5]  col5        Corporation Account Number
 *   [6]  col6        Vendor Code
 *   [7]  col7        Due Date
 *   [8]  col8        Voucher Number
 *   [9]  col9        Gross Invoice Amount
 *   [10] col10       Net Invoice Amount
 *   [11] col11       Short Pay Amount
 *   [12] col12       Vendor Term Amount
 *   [13] col13       Freight Amount
 *   [14] col14       State Tax and Provincial Refundable Tax Amount
 *   [15] col15       County Tax Amount
 *   [16] col16       City Tax Amount
 *   [17] col17       Miscellaneous Amount
 *   [18] col18       Batch Number
 *   [19] col19^col20 PO Record ID ^ PO Record IDB
 *   [20] col21       PO Number
 *   [21] col22       Note
 *   [22] col23       Code 1099
 *   [23] col24       Amount 1099
 *   [24] col25       User Name
 *   [25] col26^col27 Account Group Record ID ^ IDB
 *   [26] col28       Bank Account
 *   [27] col29       Check Number
 *   [28] col30       Reference Number
 *   [29] col31       Check Date
 *   [30] col32       Check Amount
 *   [31] col33       Check Name
 *   [32] col34^col35 Vendor Remit Code ^ Vendor Remit Name
 *   [33] col36       Vendor Term Code
 *   [34] col37       Single Check Indicator
 *   [35] col38       Fiscal Period
 *   [36] col39       Discount Date
 *   [37] col40       Invoice Discount Amount
 *   [38] col41       Invoice Status Field
 *   [39] col42       Interface Status Change Date
 *   [40] col43       Record Created Date
 *   [41] col44^col45 Record Create User ID ^ IDB
 *   [42] col46       Record Updated Date
 *   [43] col47^col48 Record Update User ID ^ IDB
 *   [44] col49       User Defined Text Name
 *   [45] col50       User Defined Text Value
 *   [46] col51       User Defined Memo Name
 *   [47] col52       User Defined Memo Value
 *   (col53/col54 omitted when empty — trailing HL7 fields)
 *   [48] col55       Miscellaneous Discount Amount
 *   [49] col56       Net Payment Amount
 *   [50] col57       Remit Vendor Net Due Days
 *   [51] col58       Vendor Discount Rate
 *   [52] col59       Remit Vendor Discount Due Days
 *   [53] col60       End Month Indicator
 *
 * ZML pipe positions → column mapping:
 *   [1]  col61^col62  Invoice Line ID ^ Invoice Line IDB
 *   [2]  col63^col64  Line Invoice ID ^ Line Invoice IDB
 *   [3]  col65        Invoice Line Number
 *   [4]  col66        Item Description
 *   [5]  col67        Invoice Line Quantity
 *   [6]  col68        Invoice Line UOM
 *   [7]  col69        Invoice Line Price
 *   [8]  col70        Debit Amount Indicator
 *   [9]  col71        Invoice Line Pay Price
 *   [10] col72        Line Corporation Account Number
 *   [11] col73        Freight Code
 *   [12] col74        Freight With Tax
 *   [13] col75        State Compound Tax
 *   [14] col76        County Compound Tax
 *   [15] col77        City Compound Tax
 *   [16] col78        Invoice Line Miscellaneous Amount
 *   [17] col79        Approved Price
 *   [18] col80        Approved Quantity
 *   [19] col81^col82  PO Line Record ID ^ PO Line Record IDB
 *   [20] col83        PO Line Number
 *   [21] col84        PO Price
 *   [22] col85        Organization Item ID
 *   [23] col86        Sub Account Number
 *   [24] col87        Expense Code Account Number
 *   [25] col88        Cost Center Account Number
 *   [26] col89        Line Code 1099
 *   [27] col90        Line Amount 1099
 *   [28] col91        Line Notes
 *   [29] col92        Invoice Line Discount Amount
 *   [30] col93        Line Discount Rate
 *   [31] col94        Payment Quantity
 *   [32] col95        Payment UOM
 *   [33] col96        Interface Status
 *   [34] col97        Reviewed Date
 *   [35] col98^col99  Discrepant Note Record ID ^ IDB
 *   [36] col100^col101 Resolved Note Record ID ^ IDB
 *   [37] col102^col103 Deliver Location Record ID ^ IDB
 *   [38] col104       Line Record Created Date
 *   [39] col105^col106 Line Record Create User ID ^ IDB
 *   [40] col107       Line Record Updated Date
 *   [41] col108^col109 Line Record Update User ID ^ IDB
 *   [42] col110       Misc Discount Amount
 *   [43] col111       Invoice Line Net Payment Amount
 *   [44] col112^col113 Project Code ^ Project Name
 *   [45] col114^col115 Sub-Project Code ^ Sub-Project Name
 *   [46] col116       State Province Account Amount
 *   [47] col117       Accrued County Tax Amount
 *   [48] col118       Accrued City Tax Amount
 *   [49] col119       FRT State Province Account Amount
 *   [50] col120       FRT County Tax Amount
 *   [51] col121       FRT City Tax Amount
 */
export function parseInvoiceHL7(hl7: string): InvoiceDataType {
  const zmiRaw = hl7.match(/ZMI\|[^\r\n]*/)?.[0] ?? ""
  const zmlRaw = hl7.match(/ZML\|[^\r\n]*/)?.[0] ?? ""

  const zmi = zmiRaw.split("|")
  const zml = zmlRaw.split("|")

  const p = (arr: string[], idx: number) => arr[idx] ?? ""
  const pc = (arr: string[], idx: number, part: number) => (arr[idx] ?? "").split("^")[part] ?? ""

  return {
    // --- ZMI: Invoice Header ---
    "Invoice ID":                                      pc(zmi,  1, 0), // col0
    "Invoice IDB":                                     pc(zmi,  1, 1), // col1
    "Invoice Number":                                   p(zmi,  2),    // col2
    "Invoice Date":                                     p(zmi,  3),    // col3
    "Invoice Type":                                     p(zmi,  4),    // col4
    "Corporation Account Number":                       p(zmi,  5),    // col5
    "Vendor Code":                                      p(zmi,  6),    // col6
    "Due Date":                                         p(zmi,  7),    // col7
    "Voucher Number":                                   p(zmi,  8),    // col8
    "Gross Invoice Amount":                             p(zmi,  9),    // col9
    "Net Invoice Amount":                               p(zmi, 10),    // col10
    "Short Pay Amount":                                 p(zmi, 11),    // col11
    "Vendor Term Amount":                               p(zmi, 12),    // col12
    "Freight Amount":                                   p(zmi, 13),    // col13
    "State Tax and Provincial Refundable Tax Amount":   p(zmi, 14),    // col14
    "County Tax Amount":                                p(zmi, 15),    // col15
    "City Tax Amount":                                  p(zmi, 16),    // col16
    "Miscellaneous Amount":                             p(zmi, 17),    // col17
    "Batch Number":                                     p(zmi, 18),    // col18
    "PO Record ID":                                    pc(zmi, 19, 0), // col19
    "PO Record IDB":                                   pc(zmi, 19, 1), // col20
    "PO Number":                                        p(zmi, 20),    // col21
    "Note":                                             p(zmi, 21),    // col22
    "Code 1099":                                        p(zmi, 22),    // col23
    "Amount 1099":                                      p(zmi, 23),    // col24
    "User Name":                                        p(zmi, 24),    // col25
    "Account Group Record ID":                         pc(zmi, 25, 0), // col26
    "Account Group Record IDB":                        pc(zmi, 25, 1), // col27
    "Bank Account":                                     p(zmi, 26),    // col28
    "Check Number":                                     p(zmi, 27),    // col29
    "Reference Number":                                 p(zmi, 28),    // col30
    "Check Date":                                       p(zmi, 29),    // col31
    "Check Amount":                                     p(zmi, 30),    // col32
    "Check Name":                                       p(zmi, 31),    // col33
    "Vendor Remit Code":                               pc(zmi, 32, 0), // col34
    "Vendor Remit Name":                               pc(zmi, 32, 1), // col35
    "Vendor Term Code":                                 p(zmi, 33),    // col36
    "Single Check Indicator":                           p(zmi, 34),    // col37
    "Fiscal Period":                                    p(zmi, 35),    // col38
    "Discount Date":                                    p(zmi, 36),    // col39
    "Invoice Discount Amount":                          p(zmi, 37),    // col40
    "Invoice Status Field":                             p(zmi, 38),    // col41
    "Interface Status Change Date":                     p(zmi, 39),    // col42
    "Record Created Date":                              p(zmi, 40),    // col43
    "Record Create User ID":                           pc(zmi, 41, 0), // col44
    "Record Create User IDB":                          pc(zmi, 41, 1), // col45
    "Record Updated Date":                              p(zmi, 42),    // col46
    "Record Update User ID":                           pc(zmi, 43, 0), // col47
    "Record Update User IDB":                          pc(zmi, 43, 1), // col48
    "User Defined Text Name":                           p(zmi, 44),    // col49
    "User Defined Text Value":                          p(zmi, 45),    // col50
    "User Defined Memo Name":                           p(zmi, 46),    // col51
    "User Defined Memo Value":                          p(zmi, 47),    // col52
    "User Defined Date Name":                          "",             // col53 (omitted when empty)
    "User Defined Date Value":                         "",             // col54 (omitted when empty)
    "Miscellaneous Discount Amount":                    p(zmi, 48),    // col55
    "Net Payment Amount":                               p(zmi, 49),    // col56
    "Remit Vendor Net Due Days":                        p(zmi, 50),    // col57
    "Vendor Discount Rate":                             p(zmi, 51),    // col58
    "Remit Vendor Discount Due Days":                   p(zmi, 52),    // col59
    "End Month Indicator":                              p(zmi, 53),    // col60

    // --- ZML: Invoice Line ---
    "Invoice Line ID":                                 pc(zml,  1, 0), // col61
    "Invoice Line IDB":                                pc(zml,  1, 1), // col62
    "Line Invoice ID":                                 pc(zml,  2, 0), // col63
    "Line Invoice IDB":                                pc(zml,  2, 1), // col64
    "Invoice Line Number":                              p(zml,  3),    // col65
    "Item Description":                                 p(zml,  4),    // col66
    "Invoice Line Quantity":                            p(zml,  5),    // col67
    "Invoice Line UOM":                                 p(zml,  6),    // col68
    "Invoice Line Price":                               p(zml,  7),    // col69
    "Debit Amount Indicator":                           p(zml,  8),    // col70
    "Invoice Line Pay Price":                           p(zml,  9),    // col71
    "Line Corporation Account Number":                  p(zml, 10),    // col72
    "Freight Code":                                     p(zml, 11),    // col73
    "Freight With Tax":                                 p(zml, 12),    // col74
    "State Compound Tax":                               p(zml, 13),    // col75
    "County Compound Tax":                              p(zml, 14),    // col76
    "City Compound Tax":                                p(zml, 15),    // col77
    "Invoice Line Miscellaneous Amount":                p(zml, 16),    // col78
    "Approved Price":                                   p(zml, 17),    // col79
    "Approved Quantity":                                p(zml, 18),    // col80
    "PO Line Record ID":                               pc(zml, 19, 0), // col81
    "PO Line Record IDB":                              pc(zml, 19, 1), // col82
    "PO Line Number":                                   p(zml, 20),    // col83
    "PO Price":                                         p(zml, 21),    // col84
    "Organization Item ID":                             p(zml, 22),    // col85
    "Sub Account Number":                               p(zml, 23),    // col86
    "Expense Code Account Number":                      p(zml, 24),    // col87
    "Cost Center Account Number":                       p(zml, 25),    // col88
    "Line Code 1099":                                   p(zml, 26),    // col89
    "Line Amount 1099":                                 p(zml, 27),    // col90
    "Line Notes":                                       p(zml, 28),    // col91
    "Invoice Line Discount Amount":                     p(zml, 29),    // col92
    "Line Discount Rate":                               p(zml, 30),    // col93
    "Payment Quantity":                                 p(zml, 31),    // col94
    "Payment UOM":                                      p(zml, 32),    // col95
    "Interface Status":                                 p(zml, 33),    // col96
    "Reviewed Date":                                    p(zml, 34),    // col97
    "Discrepant Note Record ID":                       pc(zml, 35, 0), // col98
    "Discrepant Note Record IDB":                      pc(zml, 35, 1), // col99
    "Resolved Note Record ID":                         pc(zml, 36, 0), // col100
    "Resolved Note Record IDB":                        pc(zml, 36, 1), // col101
    "Deliver Location Record ID":                      pc(zml, 37, 0), // col102
    "Deliver Location Record IDB":                     pc(zml, 37, 1), // col103
    "Line Record Created Date":                         p(zml, 38),    // col104
    "Line Record Create User ID":                      pc(zml, 39, 0), // col105
    "Line Record Create User IDB":                     pc(zml, 39, 1), // col106
    "Line Record Updated Date":                         p(zml, 40),    // col107
    "Line Record Update User ID":                      pc(zml, 41, 0), // col108
    "Line Record Update User IDB":                     pc(zml, 41, 1), // col109
    "Misc Discount Amount":                             p(zml, 42),    // col110
    "Invoice Line Net Payment Amount":                  p(zml, 43),    // col111
    "Project Code":                                    pc(zml, 44, 0), // col112
    "Project Name":                                    pc(zml, 44, 1), // col113
    "Sub-Project Code":                                pc(zml, 45, 0), // col114
    "Sub-Project Name":                                pc(zml, 45, 1), // col115
    "State Province Account Amount":                    p(zml, 46),    // col116
    "Accrued County Tax Amount":                        p(zml, 47),    // col117
    "Accrued City Tax Amount":                          p(zml, 48),    // col118
    "FRT State Province Account Amount":                p(zml, 49),    // col119
    "FRT County Tax Amount":                            p(zml, 50),    // col120
    "FRT City Tax Amount":                              p(zml, 51),    // col121
  }
}

// const highlightedFields: (keyof InvoiceDataType)[] = [
//     "Invoice ID",
//     "Invoice Date", // INV Date
//     "Invoice Number",
//     "Corporation Account Number",
//     "Cost Center Account Number",
//     "Expense Code Account Number",
//     "PO Number",
//     "Vendor Code",
//     "Vendor Remit Name",
//     "PO Line Record ID",
//     "PO Line Record IDB",
//     "Organization Item ID"
//   ];

export const invoiceData: InvoiceDataType = {
  "Invoice ID": "2500837", // column_0 -- 2500837
  "Invoice Date": "20141007000000", // column_3 -- 20141007000000
  "Invoice Number": "44966978", // column_2 -- 44966978
  "Corporation Account Number" : "10", // column_5 - 10
  "PO Number" : "325630", // column_21 -- 325630
  "Vendor Code" : "2271", // column_6 -- 2271
  "Vendor Remit Name" : "BAXTER HEALTHCARE CORP", // column_35 -- BAXTER HEALTHCARE CORP
  "PO Line Record ID": "1495150", // column_81 -- 1495150
  "PO Line Record IDB": "1270", // column_82 -- 1270
  "PO Line Number": "1", // column_83 -- 1
  "Organization Item ID": "86804", // column_85 -- 86804
  "Expense Code Account Number": "6375", // column_87 -- 6375
  "Cost Center Account Number": "800", // column_88 -- 800
  "Invoice IDB": "1270", // column_1 -- 1270
  "Invoice Type" : "P", // column_4 -- P

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

  "PO Price": "1858.2000", // column_84 -- 1858.2000

  "Sub Account Number": "&quot;&quot;", // column_86 -- &quot;&quot;

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
