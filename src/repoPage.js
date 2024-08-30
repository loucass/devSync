/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { viewRepo2 } from "./handle_repo";
import "./repoPage.css";

export default function RepoPage() {
  let navigate = useNavigate();

  const { userName, repoName } = useParams();

  useEffect(() => {
    console.log("oo");
    viewRepo2(userName, repoName, (err, data) => {
      if (err) return console.log(err);
      setFiles(data);
    });
  }, []);
  const [files, setFiles] = useState([
    {
      name: "file.txt",
      type: "text",
      lastUpdated: "2 days ago",
    },
    {
      name: "image.jpg",
      type: "image",
      lastUpdated: "1 week ago",
    },
    {
      name: "document.pdf",
      type: "pdf",
      lastUpdated: "3 weeks ago",
    },
    {
      name: "presentation.pptx",
      type: "presentation",
      lastUpdated: "1 month ago",
    },
    {
      name: "spreadsheet.xlsx",
      type: "spreadsheet",
      lastUpdated: "2 months ago",
    },
    {
      name: "code.js",
      type: "code",
      lastUpdated: "3 months ago",
    },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [viewMode, setViewMode] = useState("cards");

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleViewModeToggle = () => {
    setViewMode(viewMode === "cards" ? "list" : "cards");
  };

  const handleAddFile = () => {
    navigate(`/${repoName}/addfile`);
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-gray-200 dark:bg-gray-800 dark:text-gray-200">
      <header className="bg-gray-700 border-b px-4 md:px-6 flex items-center h-14 shrink-0 dark:bg-gray-700 dark:border-gray-600">
        <a
          href="#"
          className="flex items-center gap-2 text-lg font-semibold sm:text-base"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          Acme Inc
        </a>
        <div className="ml-auto flex items-center gap-4">
          <button
            type="button"
            className="hidden md:inline-flex bg-gray-700 text-gray-300 border border-gray-600 rounded-md px-3 py-1 text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            onClick={handleEdit}
          >
            {editMode ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                  />
                </svg>
                Save
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
                  />
                </svg>
                Edit
              </>
            )}
          </button>
          <button
            type="button"
            className="hidden md:inline-flex bg-gray-700 text-gray-300 border border-gray-600 rounded-md px-3 py-1 text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            onClick={handleViewModeToggle}
          >
            {viewMode === "cards" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                List View
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                Grid View
              </>
            )}
          </button>
          <button
            onClick={(e) => {
              handleAddFile();
            }}
            type="button"
            className="bg-blue-600 text-white rounded-md px-3 py-1 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-600 dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add File
          </button>
        </div>
      </header>
      <main className="flex-1 bg-gray-800 dark:bg-gray-800 p-4 md:p-6 grid gap-6">
        {files[0].fileID ? (
          <>
            {viewMode === "cards" ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {files.map((file) => (
                    <>
                      <Link
                        to={`${document.documentURI}/${file.fileName}`}
                        variant="body1"
                        underline="hover"
                        style={{ height: "fit-content" }}
                        rel="noopener noreferrer"
                        key={file.fileID}
                      >
                        <div
                          key={file.fileID}
                          className="flex items-center justify-between p-4 overflow-hidden border-0 shadow-none transition-all duration-500 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:shadow-lg"
                        >
                          <div className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className={`w-5 h-5 ${
                                file.type === "text"
                                  ? "text-gray-400 dark:text-gray-400"
                                  : file.type === "image"
                                  ? "text-blue-400 dark:text-blue-400"
                                  : file.type === "pdf"
                                  ? "text-red-400 dark:text-red-400"
                                  : file.type === "presentation"
                                  ? "text-orange-400 dark:text-orange-400"
                                  : file.type === "spreadsheet"
                                  ? "text-green-400 dark:text-green-400"
                                  : "text-gray-400 dark:text-gray-400"
                              }`}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                              />
                            </svg>
                            <div className="grid gap-1">
                              <div className="font-medium dark:text-gray-200">
                                {file.fileName}
                              </div>
                            </div>
                          </div>
                          {editMode && (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                                onClick={() => handleDelete(file.fileID)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    className="text-red-800"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </Link>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="grid gap-4">
                  {files.map((file) => (
                    <Link
                      to={`${document.documentURI}/${file.fileName}`}
                      variant="body1"
                      underline="hover"
                      rel="noopener noreferrer"
                      style={{ height: "fit-content" }}
                      key={file.fileID}
                    >
                      <div
                        key={file.fileID}
                        className="group overflow-hidden border-0 shadow-none transition-all duration-500 hover:bg-gray-600 dark:hover:bg-gray-600 dark:hover:shadow-lg flex items-center justify-between p-4"
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                          </svg>
                          <div className="grid gap-1">
                            <div className="font-medium dark:text-gray-200">
                              {file.fileName}
                            </div>
                            <div className="text-xs text-gray-400 dark:text-gray-400">
                              Last updated {file.lastUpdated}
                            </div>
                          </div>
                        </div>
                        {editMode && (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              className="w-8 flex justify-center items-center h-8 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                              onClick={() => handleDelete(file.fileID)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  className="text-red-800"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <div className="w-100 flex text-green-500">
              <Link
                to={`/${repoName}/AddFile`}
                variant="body1"
                underline="hover"
                rel="noopener noreferrer"
                className="mx-auto"
              >
                add file
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
