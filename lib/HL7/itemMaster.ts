import type { IMDataType, DataType } from "../types"

export function formatAsItemMaster(data: DataType, duplicateCount: number = 1, usePeopleSoft: boolean = false): string[] {
  const item = data as IMDataType;
  const highlightedFields: (keyof IMDataType)[] = [
    "Vendor Item ID",
    "Item Desc",
    "Org Item ID", 
    "MFR Item ID"
  ];

  let blocks: string[] = [];
  const incrementWithPrefix = (prefix: string, index: number): string => {
    let number = 1;
    if (prefix) {
      // Extract the number from the previous value
      const match = prefix.match(/\d+$/);
      if (match) {
        const n = match[0];
        const number = parseInt(n, 10) + index;
        const padLength = prefix.length - (match.index ?? 0);
        return prefix.replaceAll(n, number.toString().padStart(padLength || 1, '0'));
      }
    }
    return `${prefix}${number}`;
  }

  for (let i = 1; i <= duplicateCount; i++) {
    const modifiedData = { ...item };
    if (i > 1) {
      highlightedFields.forEach((field) => {
        // modifiedData[field] =
          // item[field] + (i > 1 ? `-${i}` : "");
          modifiedData[field] = incrementWithPrefix(modifiedData[field], i);
      });
    }

    const baseLines = [
      `MSH|^~\\&amp;|SupplyChain|send facility|||541750311414||MFN^MAD|1549478123|P|2.2`,
      `ZIT|${modifiedData["Vendor ID"]}^${modifiedData["Vendor Item ID"]}^${modifiedData["Price"]}^${modifiedData["UOM"]}|${modifiedData["QOE"]}|||${modifiedData["Item Desc"]}|||||||EA^${modifiedData["QOE"]}^${modifiedData["Price"]}^${modifiedData["Vendor Item ID"]}^|${modifiedData["MFR ID"]}|${modifiedData["MFR Item ID"]}|||||0001|4.2540|||||||||${modifiedData["Org Item ID"]}|||N|IMPLANT|${modifiedData["Org Item ID"]}||${modifiedData["Vendor Name"]}||||||U|N||${modifiedData["MFR Name"]}||${modifiedData["Corp Number"]}|${modifiedData["UOM"]}`,
      `ZIN|${modifiedData["Location ID"]}^150 PERRY ROAD SJB|||||EA|CA|||||N|||||||||1|||||||||||${modifiedData["Vendor Name"]}`,
    ];

    // Only include ZIA segment if usePeopleSoft is false
    if (!usePeopleSoft) {
      baseLines.push(`ZIA|${modifiedData["Org Item ID"]}|${modifiedData["Corp Number"]}^${modifiedData["Corp Name"]}||${modifiedData["Expense Code Number"]}^${modifiedData["Expense Code Name"]}|||`);
    }

    blocks.push(baseLines.join("\r\n"));
  }
  return blocks.join("\r\n").split("\r\n");
} 