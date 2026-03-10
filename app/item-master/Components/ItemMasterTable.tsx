"use client";

import type React from "react";
import type { DataType } from "@/lib/types";
import { useState } from "react";
import ModalCreateFile from "@/components/modal-create-file";
import ViewDataModal from "@/components/modal-view-data";
import {
  formatAsPipeDelimited,
  formatAsItemMaster
} from "@/lib/formatter";
import { toast } from "@/components/ui/use-toast";
import { parseItemMasterHL7 } from "@/lib/data";


interface ItemMasterTableProps {
  data: DataType;
  selectedRow: number | null;
  onSelectRow: (index: number) => void;
  onValueChange: (key: string, value: string) => void;
  activeFileType: any;
}

export default function ItemMasterTable({
  data,
  selectedRow,
  onSelectRow,
  onValueChange,
  activeFileType,
}: ItemMasterTableProps) {
  const highlightedFields = [
    "Vendor Item ID",
    "Org Item ID",
    "MFR Item ID",
    "Item Desc"
  ];
  const [editingCell, setEditingCell] = useState<string | null>(null);

  const [numberOfItems, setNumberOfItems] = useState<number>(1);

  const [usePeopleSoft, setUsePeopleSoft] = useState(false);

  const handleNumberOfItemsChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num > 0) setNumberOfItems(num);
    else if (value === "") setNumberOfItems(1);
  };

  const handlePeopleSoftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsePeopleSoft(e.target.checked);
  };

  const [showModal, setShowModal] = useState(false);
  const [showViewDataModal, setShowViewDataModal] = useState(false);
  const [loadedFileContent, setLoadedFileContent] = useState<string | null>(null);

  const openViewDataModal = () => {
    setLoadedFileContent(null);
    setShowViewDataModal(true);
  };
  const closeViewDataModal = () => setShowViewDataModal(false);

  const handleLoadFile = async () => {
    try {
      const res = await fetch("/api/build_file?fileTypeName=IM");
      const json = await res.json();
      const content = json?.data?.content;
      const imData = parseItemMasterHL7(content ?? "");
      Object.entries(imData as object).forEach(([key, value]) => {
        onValueChange(key, value as string);
      });
      if (content != null) {
        setLoadedFileContent(content);
        setShowViewDataModal(true);
        toast({ title: "Đã tải file IM", description: "Nội dung file đã lưu được hiển thị.", duration: 2000 });
      } else {
        toast({
          title: "Chưa có file",
          description: "Chưa có file Item Master (IM) nào được lưu.",
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

  const handleValueChange = (key: string, value: string) => {
    onValueChange(key, value);
    switch (key) {
      case "Vendor Item ID":
        onValueChange("MFR Item ID", value);
        onValueChange("Org Item ID", `ITEM${value}`);
        onValueChange("Item Desc", `Item ${value}`);
        break;
      case "MFR Item ID":
        onValueChange("Vendor Item ID", value);
        onValueChange("Org Item ID", `ITEM${value}`);
        onValueChange("Item Desc", `Item ${value}`);
        break;
      case "Org Item ID":
        onValueChange("Vendor Item ID", value);
        onValueChange("MFR Item ID", value);
        onValueChange("Item Desc", `Item ${value}`);
        break;
    
      default:
        break;
    }
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
    switch (activeFileType) {
      case "HL7":
        return formatAsItemMaster(data, numberOfItems, usePeopleSoft);
      default:
        return formatAsPipeDelimited(data);
    }
  };
  
  const formattedData = getFormattedData();
  const resultHL7Text = formattedData.join("\r\n").replace(/\n/g, '');

  return (
    <>
      <div className="w-full">
        <form className="mb-[10px] flex items-end gap-4">
          <div className="w-full max-w-sm relative mt-4">
            <label className="block mb-2 text-sm text-slate-600">Number of Items to Create</label>
            <input
              type="text"
              onChange={(e) => handleNumberOfItemsChange(e.target.value)}
              onBlur={handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="1"
            />
          </div>

          <div className="flex items-center pb-2.5">
            <input
              id="usePeopleSoft"
              type="checkbox"
              checked={usePeopleSoft}
              onChange={handlePeopleSoftChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="usePeopleSoft" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Use PeopleSoft
            </label>
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
          Load
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
            typeFile="IM"
            data={resultHL7Text}
            numbers_created={numberOfItems}
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