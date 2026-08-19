import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventImageById, mediaUrl } from '../../../services/eventService';
import Header from '../../Header';
import Footer from '../../Footer';
import '../../blog/BlogInfo.css';

const EventosInfo = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getImageData = async () => {
      const data = await fetchEventImageById(id);
      if (data) {
        setImage(data);
      }
    };

    getImageData();
  }, [id]);

  if (!image) {
    return <div className="p-4">Cargando...</div>;
  }

  return (
    <div className="news-info-page">
      <Header />

      <div className="news-info-container">
        <div className="news-info">
          {image.fields.ima_txt_urlpath && (
            <img
              src={mediaUrl(image.fields.ima_txt_urlpath)}
              alt={image.fields.ima_txt_name}
              className="news-image"
            />
          )}
          <h1 className="news-title">{image.fields.ima_txt_name}</h1>
          <div
            className="news-content"
            dangerouslySetInnerHTML={{ __html: image.fields.ima_txt_description }}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventosInfo;
