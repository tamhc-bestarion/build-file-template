"use client";

import type React from "react";
import type { DataType, InvoiceDataType } from "@/lib/types";
import { useState } from "react";
import ModalCreateFile from "@/components/modal-create-file";
import ViewDataModal from "@/components/modal-view-data";
import {
  formatAsPipeDelimited,
  formatAsInvoiceHL7
} from "@/lib/formatter";

import { formatNumberShort } from "@/constants/FormatData"
import { toast } from "@/components/ui/use-toast"
import { parseInvoiceHL7 } from "@/lib/data";

interface InvoiceTableProps {
  data: DataType;
  selectedRow: number | null;
  onSelectRow: (index: number) => void;
  onValueChange: (key: string, value: string) => void;
  activeFileType: any;
}

export default function InvoiceTable({
  data,
  selectedRow,
  onSelectRow,
  onValueChange,
  activeFileType,
}: InvoiceTableProps) {
  const highlightedFields = [
    "Invoice ID", // Invoice ID
    "Invoice Date", // INV Date
    "Invoice Number", // INV Number
    "Corporation Account Number", // Corp Number
    "Cost Center Account Number", // Cost Center
    "Expense Code Account Number",  // Expense Code
    "PO Number",
    "PO Line Number",
    "Vendor Code", // Vendor Number
    "Vendor Remit Name", // Vendor Name
    "PO Line Record ID",  // PO ID DB
    "PO Line Record IDB",
    "Organization Item ID"
  ];
  const autoMappingFields: { [key: string]: string; } = {
    "Invoice ID": "Line Invoice ID",
    "PO Line Record ID": "Invoice Line ID"
  };
  const autoMappingByInvoiceDate = ["Invoice ID", "Line Invoice ID", "PO Line Record ID", "Invoice Line ID"];

  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [invData, setInvData] = useState<InvoiceDataType | null>(data as InvoiceDataType);

  const [duplicateOption, setDuplicateOption] = useState<"Normal" | number>(
    "Normal"
  );

  const handleDuplicateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === "Normal") setDuplicateOption("Normal");
    else
      setDuplicateOption(
        Number(val.replace("Create-", "").replace("k", "000"))
      );
  };

  const [showModal, setShowModal] = useState(false);
  const [showViewDataModal, setShowViewDataModal] = useState(false);
  const [loadedFileContent, setLoadedFileContent] = useState<string | null>(null);
  const [numberOfInvoiceLineNumbers, setNumberOfInvoiceLineNumbers] = useState(1);
  const [numberOfInvoices, setNumberOfInvoices] = useState(1);
  const [numberOfItems, setNumberOfItems] = useState(1);

  const openViewDataModal = () => {
    setLoadedFileContent(null);
    setShowViewDataModal(true);
  };
  const closeViewDataModal = () => setShowViewDataModal(false);

  const handleLoadFile = async () => {
    try {
      const res = await fetch("/api/build_file?fileTypeName=Invoice");
      const json = await res.json();
      const content = json?.data?.content;
      const invData = parseInvoiceHL7(content);
      Object.entries(invData as Object).map(([key, value], index) => (
        onValueChange(key, value)
      ));
      // setInvData(invData);
      if (content != null) {
        setLoadedFileContent(content);
        setShowViewDataModal(true);
        toast({ title: "Đã tải file Invoice", description: "Nội dung file đã lưu được hiển thị.", duration: 2000 });
      } else {
        toast({
          title: "Chưa có file",
          description: "Chưa có file Invoice nào được lưu.",
          variant: "destructive",
          duration: 3000,
        });
      }
    } catch {
      toast({
        title: "Lỗi tải file",
        description: "Không thể tải nội dung file từ server.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleValueClick = (key: string) => {
    setEditingCell(key);
  };

  const handleNumberOfInvoiceLineNumbers = (number: int) => {
    setNumberOfInvoiceLineNumbers(parseInt(number));
  };

  const handleNumberOfInvoices = (number: int) => {
    setNumberOfInvoices(parseInt(number));
  };

  const handleNumberOfItems = (number: int) => {
    setNumberOfItems(parseInt(number));
  };

  const handleValueChange = (key: string, value: string) => {
    onValueChange(key, value);
    const kk = autoMappingFields[key];
    if (kk) onValueChange(kk, value);
    if (key == 'Invoice Date') {
      autoMappingByInvoiceDate.forEach((keyMap) => {
        onValueChange(keyMap, value);
      });
    }
  };

  const handleTextValueChange = (value: string) => {
    handleNumberOfInvoice(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent, key: string) => {
    if (e.key === "Enter") {
      setEditingCell(null);
    }
  };

  const handleBlur = () => {
    setEditingCell(null);
  };

  const getFormattedData = () => {
    const duplicateCount = duplicateOption === "Normal" ? 1 : duplicateOption;
    switch (activeFileType) {
      case "HL7":
        return formatAsInvoiceHL7(data, numberOfInvoiceLineNumbers, numberOfInvoices, numberOfItems);
      default:
        return formatAsPipeDelimited(data, duplicateCount);
    }
  };
  
  const formattedData = getFormattedData();
  const resultHL7Text = formattedData.join('\r')

  return (
    <>
      <div className="w-full">
        <form className="max-w-xs mb-[10px] flex items-center gap-4">
          <div class="flex flex-row w-full min-w-full">
            <div class="basis-1/4">
              <div class="w-full max-w-sm relative mt-4 mr-2">
                <label class="block mb-2 text-sm text-slate-600">Number of Invoice Line Numbers</label>
                <input type="email"
                  onChange={(e) => handleNumberOfInvoiceLineNumbers(e.target.value)} onKeyDown={(e) => handleNumberOfInvoiceLineNumbers(e.target.value)} onBlur={handleBlur}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your text"
                />
                {/*<select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={
                    duplicateOption === "Normal"
                      ? "Normal"
                      : `Create-${formatNumberShort(duplicateOption)}`
                  }
                  onChange={handleDuplicateChange}
                >
                  <option value="Normal">Normal</option>
                  <option value="Create-10k">Create 10k item</option>
                  <option value="Create-50k">Create 50k item</option>
                  <option value="Create-100k">Create 100k item</option>
                  <option value="Create-200k">Create 200k item</option>
                </select>*/}
              </div>
            </div>
            <div class="basis-1/4">
              <div class="w-full max-w-sm relative mt-4 ml-2 mr-2">
                <label class="block mb-2 text-sm text-slate-600">Number of Invoices</label>
                <input type="email"
                  onChange={(e) => handleNumberOfInvoices(e.target.value)} onKeyDown={(e) => handleNumberOfInvoices(e.target.value)} onBlur={handleBlur}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your text"
                />
              </div>
            </div>
            {/*<div class="basis-1/4">
              <div class="w-full max-w-sm min-w-[180px] relative mt-4 ml-2 mr-2">
                <label class="block mb-2 text-sm text-slate-600">Number of Items</label>
                <input type="email"
                  onChange={(e) => handleNumberOfItems(e.target.value)} onKeyDown={(e) => handleNumberOfItems(e.target.value)} onBlur={handleBlur}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your text"
                />
              </div>
            </div>*/}
          </div>
        </form>
        <table className="w-full border-collapse table-fixed">
          <thead>
            <tr>
              <th className="bg-orange-500 text-white p-2 border border-gray-300 w-1/3">
                Column
              </th>
              <th className="bg-orange-500 text-white p-2 border border-gray-300 w-2/3">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {/*{Array.from({ length: numberOfInvoices }).map((_, idx) => (
              <div>{idx}</div>
            ))}*/}
            {Object.entries(data).map(([key, value], index) => (
              <tr
                key={key}
                className={`${
                  selectedRow === index ? "bg-blue-100" : ""
                } hover:bg-gray-100`}
                onClick={() => onSelectRow(index)}
              >
                <td
                  className={`p-2 border border-gray-300 ${
                    highlightedFields.includes(key) ? "bg-yellow-300" : ""
                  } break-words`}
                >
                  {key}
                </td>
                <td
                  className={`p-2 border border-gray-300 ${
                    highlightedFields.includes(key) ? "bg-yellow-300" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleValueClick(key);
                  }}
                >
                  {editingCell === key ? (
                    <textarea
                      value={value}
                      onChange={(e) => handleValueChange(key, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, key)}
                      onBlur={handleBlur}
                      className="w-full p-1 border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={Math.max(1, Math.ceil(value.length / 40))}
                      autoFocus
                      style={{ minHeight: "24px", maxHeight: "120px" }}
                    />
                  ) : (
                    <div className="cursor-text break-words whitespace-pre-wrap">
                      {value}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex">
        <button
          onClick={openModal}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Create file
        </button>
        <button
          onClick={handleLoadFile}
          className="text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-4 focus:ring-amber-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-amber-600 dark:hover:bg-amber-700 dark:focus:ring-amber-800"
          type="button"
        >
          Load file
        </button>
        <button
          onClick={openViewDataModal}
          className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="button"
        >
          View data
        </button>
        {showModal && (
          <ModalCreateFile
            onClose={closeModal}
            open={showModal}
            typeFile="Invoice"
            data={resultHL7Text}
            numbers_created={duplicateOption === "Normal" ? 1 : duplicateOption}
          />
        )}
        {showViewDataModal && (
          <ViewDataModal
            onClose={closeViewDataModal}
            open={showViewDataModal}
            data={data}
            rawContent={loadedFileContent}
          />
        )}
      </div>
    </>
  );
}