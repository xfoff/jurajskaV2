import './Gallery.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface GalleryProps {
  current: number;
}

const Gallery: React.FC<GalleryProps> = (props) => {
  const [page, setPage] = useState<number>(0);
  var current:any = props.current;
  const options: string[] = ["animal", "landscape", "city", "flower", "asdf"];
  const [images, setImages] = useState<any[]>([]);

  const cssVar = (variable: string): number => {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
    return parseFloat(value) || 0;
  }

  const cardsPerPage = cssVar("--columns") * cssVar("--rows");

  const changePage = (by:number) => {
    setPage(prevPage => {
      const newPage = ((prevPage + by) % (Math.floor(images.length / cardsPerPage) + 1) +
                      (Math.floor(images.length / cardsPerPage) + 1)) % (Math.floor(images.length / cardsPerPage) + 1);
      return newPage;
    })
  }

  const getImages = async() => {
    axios.get('https://pixabay.com/api/', {
      params: {
        key: "48880203-d106dba0fb91b0c5359b22cc6",
        q: options[current],
        orientation: "horizontal",
        per_page: cardsPerPage,
      }
    })
    .then(response => {
      setImages(response.data.hits);
    })
    .catch(error => console.error(error));
  }

  useEffect(() => {
    getImages();
  }, [current])

  useEffect(() => {
    getImages();
  }, [])
  return (
    <>
      <div className="gallery">
        <div className="images">
          { images.length != 0 ? (
              images.map((_, i) => <img className="image" key={i} src={_.webformatURL}/>)
            ) : (
              Array.from({ length: cardsPerPage }, (_, i) => <div key={i} className="image"/>)
            )
          }
        </div>
      </div>
    </>
  )
}

export default Gallery;
