import Button from "@mui/material/Button";
import "./ViewFile.css";
import { useEffect } from "react";
import { downloadFile, handleViewFile } from "./handle_viewFile";
import { useParams } from "react-router-dom";

export default function ViewFile() {
  const { userName, repoName, fileName } = useParams();

  useEffect(() => {
    handleViewFile(userName, repoName, fileName);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow">
        <h1 className="text-2xl font-bold">File Preview</h1>
      </header>
      <main className="flex-1 bg-background px-4 md:px-8 py-8">
        <div className="grid gap-8 max-w-4xl mx-auto">
          <div className="grid gap-4">
            <div className="bg-card rounded-lg overflow-hidden shadow">
              <div className="px-6 py-4">
                <h2 className="text-xl font-semibold">index.js</h2>
              </div>
              <div className="bg-background px-6 py-4">
                <pre className="text-sm">
                  <img src={``} alt="" />
                  <code className="language-javascript"></code>
                </pre>
              </div>
              <div className="px-6 py-4 flex justify-end">
                <Button
                  size="sm"
                  onClick={() => {
                    downloadFile(userName, repoName, fileName);
                  }}
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
