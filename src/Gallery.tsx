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
  const [showImage, setShowImage] = useState<boolean>(false);
  const [currentFullImage, setCurrentFullImage] = useState<number>(0);

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
        console.log(`${newPage} / ${allPages}`)
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
      setImages(response.data.hits);
      setAllPages(Math.round(response.data.totalHits / cardsPerPage));
      setCompleted(true);
      console.log(response.data.hits);
    })
    .catch(error => console.error(error.message));
  }

  const showFullImage = (i: number) => {
    setShowImage(true)
    setCurrentFullImage(i);
  };

  useEffect(() => {
    getImages(page);
    setPage(1);
  }, [current, search])

  useEffect(() => {
    document.addEventListener("keydown", (event) => {if (event.key == "Escape") setShowImage(false)})
    return () => document.removeEventListener("keydown", (event) => {if (event.key == "Escape") setShowImage(false)})
  }, [])

  return (
    <>
      <div className="gallery">
        <div className={completed && images.length != 0 ? "images" : ""} style={{display: showImage ? "flex" : "grid"}}>
          { images.length == 0 ? (
              <div className="message">No results found for qiven query</div>
            ) : showImage ? (
              <>
                <img className="fullImg" src={images[currentFullImage].largeImageURL} style={{transform: `scale(${showImage ? 1 : 0})`}} alt={images[currentFullImage].pageURL.slice(27).slice(0, -9)}></img>
                <p className="close" onClick={() => setShowImage(false)}>x</p>
              </>
            ) : completed ? (
              images.map((_, i) => <img className="image" key={i} src={_.webformatURL} alt={_.pageURL.slice(27).slice(0, -9)} onClick={() => showFullImage(i)}/>)
            ) : (
              <div className="message">Loading images</div>
            )
          }
        </div>
        { !showImage && (
            <div className="buttons">
              <div className="button" onClick={() => changePage(-1)}></div>
              <p style={{textWrap: "nowrap"}}>{page} / {allPages}</p>
              <div className="button" onClick={() => changePage(1)}></div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Gallery;
