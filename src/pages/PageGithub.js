import React, { useEffect, useState } from "react";
import { useCustomData } from "../utils/CustomData";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BiGitRepoForked } from "react-icons/bi";

export default function PageDisplayGithub() {
  const [repo, setRepo] = useState([]);

  const customData = useCustomData();

  useEffect(() => {
    fetch(customData.apiToConsume.github)
      .then((res) => res.json())
      .then((res) => {
        setRepo(res);
      });
  }, []);

  return (
    <>
      <main className="page">
        <h2 className="page_title">Code Samples</h2>
        <p>{customData.gitHubPageDesc}</p>

        <section className="grid">
          {repo.map((repo) => {
            return (
              <article key={repo.id} className="grid_item">
                <ul className="grid_item_tags">
                  <li className="grid_item_tags_tag">{repo.topics} </li>
                </ul>

                <Link to={repo.svn_url} className="grid_item_title">
                  {repo.name}
                </Link>
                <p>{repo.description}</p>

                <div className="grid_item_buttons">
                  <ul className="grid_item_tags">
                    <li className="grid_item_tags_star">
                      <AiFillStar />
                      <p>{repo.stargazers_count}</p>
                    </li>

                    <li className="grid_item_tags_fork">
                      <BiGitRepoForked />
                      <p>{repo.forks_count}</p>
                    </li>
                  </ul>
                </div>

                <div className="grid_item_buttons">
                  <Link to={repo.svn_url} className="front_button">
                    View on Github
                  </Link>
                </div>
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}
