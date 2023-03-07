import { useState,useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOneShow } from "../../api/fetch";
import { destroyShow } from "../../api/fetch";

import "./Show.css";

import ErrorMessage from "../errors/ErrorMessage";

function Show() {
  const [show, setShow] = useState({});
  const [loadingError, setLoadingError] = useState(false);
  const { id } = useParams();
  const navegate = useNavigate()

  useEffect(()=>{
     getOneShow(id).then((reponse)=> {setShow(reponse); setLoadingError(false)}).catch((error)=> {setLoadingError(true)} )
  },[id])

  

  function handleDelete(id) {
    destroyShow(id).then(()=> { navegate("/shows") })
  }

  return (
    <section className="shows-show-wrapper">
      <h2>{show.title}</h2>
      <section className="shows-show">
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {show.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {show.listedIn}
              </p>
              <p>
                <span>Country:</span> {show.country}
              </p>
              <p>
                <span>Rating:</span> {show.rating}
              </p>
              <p>
                <span>Date Added:</span> {show.dateAdded}
              </p>
            </aside>
            <article>
              <p>{show.description}</p>
            </article>
            <aside>
              <button className="delete" onClick={() => handleDelete(show.id)}>
                Remove show
              </button>
              <Link to={`/shows/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  );
}

export default Show;
