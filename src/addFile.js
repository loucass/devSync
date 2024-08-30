import Button from "@mui/material/Button";
import { handleAddFile } from "./handle_addFile";
import { useParams } from "react-router-dom";
import "./AddFile.css";

export default function AddFile() {
  const { repoName } = useParams();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <div className="bg-card p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Upload Files</h1>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddFile(repoName);
          }}
        >
          <div>
            <label
              htmlFor="file-input"
              className="block mb-1 text-sm font-medium text-card-foreground"
            >
              Select Files
            </label>
            <input
              id="file-input"
              name="files"
              type="file"
              multiple
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
          </div>
          <div className="text-black">each file up to 10MB</div>
          <Button
            type="submit"
            className="w-full bg-primary text-black font-medium rounded-full px-4 py-2 hover:bg-primary/90 transition-colors duration-300"
          >
            Upload
          </Button>
        </form>
      </div>
    </div>
  );
}
