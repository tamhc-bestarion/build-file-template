import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const FILE_TYPE_NAME_MAP: Record<string, string> = {
  contract: "Contract",
  POH: "POH",
  IM: "IM",
  Invoice: "Invoice",
};

interface ModalCreateFileProps {
  typeFile: "contract" | "POH" | "IM" | "Invoice";
  open: boolean;
  onClose: () => void;
  data: any;
  numbers_created?: number;
}

// Tạo schema validation với yup
const schema = yup.object({
  fileName: yup
    .string()
    .required("File name cannot be empty")
    .matches(
      /^[a-zA-Z0-9._-]+$/,
      "File name can only contain letters, numbers, and special characters . _ -"
    )
    .max(100, "File name cannot exceed 100 characters")
}).required();

type FormValues = {
  fileName: string;
};

export default function ModalCreateFile({ typeFile, open, onClose, data, numbers_created = 1 }: ModalCreateFileProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      fileName: ""
    }
  });

  if (!open) return null;

  // Format data as "key: value" per line
  function formatDataToText(data: Record<string, any>) {
    return Object.entries(data)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
  }

  const onSubmit = async (formData: FormValues) => {
    const text = typeof data === "string" ? data : JSON.stringify(data);

    try {
      const fileTypeName = FILE_TYPE_NAME_MAP[typeFile] ?? "Contract";
      const res = await fetch("/api/build_file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileTypeName,
          content: text,
          numbers_created: numbers_created ?? 1,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to save to database");
      }
    } catch (e) {
      toast({
        title: "Lỗi lưu database",
        description: e instanceof Error ? e.message : "Không thể lưu file vào bảng FileType/FileBuild",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = formData.fileName.endsWith(".txt") ? formData.fileName : `${formData.fileName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "File đã tạo và lưu",
      description: "Nội dung đã được tải xuống và lưu vào database.",
      duration: 2000,
    });

    reset();
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
        <div className="relative p-4 w-full max-w-lg max-h-full" onClick={e => e.stopPropagation()}>
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Create file
              </h3>
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <form 
                className="space-y-4" 
                onSubmit={handleSubmit(onSubmit)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                  }
                }}
              >
                <div>
                  <label htmlFor="fileName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File name</label>
                  <input
                    {...register("fileName")}
                    type="text"
                    id="fileName"
                    className={`bg-gray-50 border ${
                      errors.fileName ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white`}
                    placeholder=""
                    autoFocus
                  />
                  {errors.fileName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fileName.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Tạo file
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
