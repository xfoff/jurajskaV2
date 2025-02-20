import './Gallery.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface GalleryProps {
  current: number;
  search: string;
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [allPages, setAllPages] = useState<number>(0);
  var current = props.current;
  var search = props.search;
  const options: string[] = ["animals", "landscape", "city", "flower", "void"];
  const [images, setImages] = useState<any[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);

  const cssVar = (variable: string): number => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
    return parseFloat(value) || 0;
  }

  const cardsPerPage = cssVar("--columns") * cssVar("--rows");

  const changePage = (by:number) => {
    if (completed == true) {
      setPage(prevPage => {
        const newPage = ((prevPage + by - 1) % allPages + allPages) % allPages + 1;
        setCompleted(false);
        getImages(newPage);
        return newPage;
      })
    }
  }

  const getImages = async(currentPage: number) => {
    axios.get('https://pixabay.com/api/', {
      params: {
        key: "48880203-d106dba0fb91b0c5359b22cc6",
        q: `${options[current]}+${search}`,
        orientation: "horizontal",
        per_page: cardsPerPage,
        page: currentPage
      }
    })
    .then(response => {
      setPage(1);
      setImages(response.data.hits);
      setAllPages(Math.round(response.data.totalHits / cardsPerPage));
      setCompleted(true);
    })
    .catch(error => console.error(error.message));
  }

  useEffect(() => {
    getImages(page);
  }, [current, search])

  return (
    <>
      <div className="gallery">
        <div className={completed && images.length != 0 ? "images" : ""}>
          { images.length == 0 ? (
              <div className="message">No results found for qiven query</div>
            ) : completed ? (
              images.map((_, i) => <img className="image" key={i} src={_.webformatURL} alt={_.pageURL.replace("https://pixabay.com/photos/", "").slice(0, -9)} onClick={() => console.log(i)}/>)
            ) : (
              <div className="message">Loading images</div>
            )
          }
        </div>
        <div className="buttons">
          <div className="button" onClick={() => changePage(-1)}></div>
          <div className="button" onClick={() => changePage(1)}></div>
        </div>
      </div>
    </>
  )
}

export default Gallery;
