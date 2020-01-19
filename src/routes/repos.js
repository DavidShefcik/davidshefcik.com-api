/*
* David Shefcik 2020
*/

/* Imports */
// Modules
const axios = require("../axios/config");

// Route middleware
const TokenCheck = require("../middleware/TokenCheck");

// Mongoose
const ProjectModel = require("../mongoose/models/Projects");

/* Route */
// GET: github/repos
module.exports = app => {
  app.post("/github/repos", (req, res, next) => {
    TokenCheck(req, res, next, app["token"]);
  }, async (req, res) => {
    // Get my public repos from GitHub
    let reposFromGitHub = await axios.get("/user/repos").catch(error => {
      if(process.env.NODE_ENV === "dev") {
        console.log(error);
      }
      return res.status(500).json({
        "code": 500,
        "message": "GitHub API request failed."
      });
    });
    reposFromGitHub = reposFromGitHub["data"];

    // Parse repos
    let repos = [];
    reposFromGitHub.forEach(repo => {
      if(repo["private"] === false) {
        let parsedRepo = {
          "id": repo["id"],
          "name": repo["name"],
          "description": repo["description"],
          "technology": [],
          "openSource": true,
          "repositoryURL": repo["url"],
          "live": false,
          "liveURL": "",
          "authors": []
        };
        repos.push(parsedRepo);
      }
    });

    // Get collaborators from GitHub
    for(let i = 0; i < repos.length; i++) {
      // Get collaborators for the given repo
      let collaboratorsFromGitHub = await axios.get(`/repos/DavidShefcik/${repos[i]["name"]}/collaborators`).catch(error => {
        if(process.env.NODE_ENV === "dev") {
          console.log(error);
        }
        return res.status(500).json({
          "code": 500,
          "message": "GitHub API request failed."
        });
      });
      collaboratorsFromGitHub = collaboratorsFromGitHub["data"];

      let authors = [];
      collaboratorsFromGitHub.forEach(collaborator => {
        if(collaborator["type"] === "User") {
          let parsedCollaborator = {
            "id": collaborator["id"],
            "name": collaborator["login"],
            "github": collaborator["html_url"]
          };
          authors.push(parsedCollaborator);
        }
      });

      repos[i]["authors"] = authors;
    }

    // Get more information about each public repo from a GitHub gist
    let publicRepoGist = await axios.get("/gists/0925c83d40afbab86e1f3230ad2e77ac").catch(error => {
      if(process.env.NODE_ENV === "dev") {
        console.log(error);
      }
      return res.status(500).json({
        "code": 500,
        "message": "GitHub API request failed."
      });
    });
    publicRepoGist = publicRepoGist["data"]["files"]["open_source_projects.json"];

    // Parse JSON
    publicRepoGist = JSON.parse(publicRepoGist["content"]);
    publicRepoGist = publicRepoGist["projects"];

    // Loop through the gist's content
    publicRepoGist.forEach(repo => {
      for(let i = 0; i < repos.length; i++) {
        if(repo["name"].toUpperCase() === repos[i]["name"].toUpperCase()) {
          repos[i]["technology"] = repo["technology"];
          repos[i]["live"] = repo["live"],
          repos[i]["liveURL"] = repo["liveURL"];
        }
      }
    });

    // Get private projects from a GitHub gist
    let privateRepoGist = await axios.get("/gists/e1e5453b65c19c058eed089b924db255").catch(error => {
      if(process.env.NODE_ENV === "dev") {
        console.log(error);
      }
      return res.status(500).json({
        "code": 500,
        "message": "GitHub API request failed."
      });
    });
    privateRepoGist = privateRepoGist["data"]["files"]["closed_source_projects.json"];

    // Parse JSON
    privateRepoGist = JSON.parse(privateRepoGist["content"]);
    privateRepoGist = privateRepoGist["projects"];

    repos.push(...privateRepoGist);

    // Database update/insert
    repos.forEach(async repo => {
      await ProjectModel.findOneAndUpdate({id: repo["id"]}, repo, {
        new: true,
        upsert: true,
        useFindAndModify: false
      }).catch(error => {
        if(process.env.NODE_ENV === "dev") {
          console.log(error);
        }
        return res.status(500).json({
          "code": 500,
          "message": "Database update failed."
        });
      });
    });

    // Database remove if not in repos array
    let reposFromDB = await ProjectModel.find({});
    let reposToDelete = [];
    
    for(let i = 0; i < reposFromDB.length; i++) {
      let remove = true;
      repos.forEach(repo => {
        if(repo["name"].toUpperCase() === reposFromDB[i]["name"].toUpperCase()) {
          remove = false;
        }
      });
      if(remove) {
        reposToDelete.push(reposFromDB[i]);
      }
    }

    if(reposToDelete.length > 0) {
      reposToDelete.forEach(async repo => {
        await ProjectModel.deleteOne({ name: repo["name"] }).catch(error => {
          if(process.env.NODE_ENV === "dev") {
            console.log(error);
          }
          return res.status(500).json({
            "code": 500,
            "message": "Database remove failed."
          });
        });;
      });
    }

    // Response
    return res.status(200).json({reposInDB: repos, reposRemoved: reposToDelete});
  });
};