import { Link } from 'react-router-dom';
import { mediaUrl } from '../../services/newsService';

const NewsItem = ({ news }) => {
  // Verificamos si existe el pk antes de crear el enlace
  const pk = news?.pk;

  const truncateText = (text, length = 20) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };
  const truncateText1 = (text, length = 100) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  return (
    <div className="relative w-[292px] h-[251px]">
      {/* Solo agregamos el enlace si existe pk */}
      {pk ? (
        <Link to={`/news/${pk}`} className="block">
          <div className="w-[292px] h-[175px] bg-[#83CEE1] rounded-xl">
            <img
              src={mediaUrl(news.fields.new_txt_urlimage)}
              alt={news.fields.new_txt_tittle}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="w-[292px] h-[32px] text-black text-[19px] font-bold font-inter break-words">
            {truncateText(news.fields.new_txt_tittle)}
          </div>
          <div className="text-black text-[10px]">{truncateText1(news.fields.new_txt_description)}</div>
        </Link>
      ) : (
        <div className="w-[292px] h-[175px] bg-[#D3D3D3] rounded-xl">
          {/* Si no hay pk, mostramos una caja vacía */}
          <p className="text-center text-gray-500">ID no disponible</p>
        </div>
      )}
    </div>
  );
};

export default NewsItem;
