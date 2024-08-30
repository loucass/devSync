import "bootstrap/dist/css/bootstrap.min.css";
import { handleCreateRepoRequest } from "./handle_createRepo";

function CreateRepo() {
  return (
    <div className="userInfo-container">
      <h1>create new repo</h1>

      <form onSubmit={handleCreateRepoRequest}>
        <>
          <label htmlFor="userName" className="form-label">
            repo name
          </label>
          <input
            className="form-control"
            type="text"
            id="repoName"
            name="repoName"
            placeholder="set your repo name"
            required
          />
        </>
        <label htmlFor="email" className="form-label">
          about
        </label>
        <input
          className="form-control"
          type="text"
          id="repoAbout"
          name="repoAbout"
          placeholder="Enter your repo about"
        />

        <button type="submit" className="btn btn-success w-100 d-block">
          create
        </button>
      </form>
    </div>
  );
}

export default CreateRepo;
