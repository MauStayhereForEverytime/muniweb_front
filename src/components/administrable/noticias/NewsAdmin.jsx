import { FaEdit, FaTrash, FaSearchPlus } from 'react-icons/fa';
import { sanitizeHtml } from '../../../utils/sanitize';
import { pickValidImageFile } from '../../../utils/validateImage';
import { useState, useEffect } from 'react';
import { fetchNews, createNews, updateNews, deleteNews, mediaUrl } from '../../../services/newsService';
import QuillEditor from '../../noticias/QuillEditor';

const RECOMMENDED = { width: 1920, height: 1080 };
const MIN = { width: 1200, height: 675 };
const MAX = { width: 3840, height: 2160 };
const MAX_SIZE_KB = 3072;
const MIN_CONTENT_CHARS = 150;

const readDims = (file) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        sizeKb: Math.round(file.size / 1024),
      });
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => resolve(null);
    img.src = URL.createObjectURL(file);
  });

const stripHtml = (html) => (html || '').replace(/<[^>]*>/g, '').trim();

const normalize = (item) => ({
  pk: item.pk ?? item.new_int_id,
  fields: {
    new_txt_tittle: item.fields?.new_txt_tittle ?? item.new_txt_tittle ?? '',
    new_txt_description: item.fields?.new_txt_description ?? item.new_txt_description ?? '',
    new_txt_urlimage: item.fields?.new_txt_urlimage ?? item.new_txt_urlimage ?? '',
    new_txt_content: item.fields?.new_txt_content ?? item.new_txt_content ?? '',
    new_txt_state: item.fields?.new_txt_state ?? item.new_txt_state ?? '',
    ctn_int_id: item.fields?.ctn_int_id ?? item.ctn_int_id ?? null,
  },
});

const renderDimsBadge = (dims) => {
  if (!dims) return null;
  const bad =
    dims.width < MIN.width ||
    dims.height < MIN.height ||
    dims.width > MAX.width ||
    dims.height > MAX.height ||
    dims.sizeKb > MAX_SIZE_KB;
  let msg = 'tamaño adecuado.';
  if (dims.width < MIN.width || dims.height < MIN.height)
    msg = `menor al mínimo (${MIN.width}×${MIN.height}). Se verá pixelada.`;
  else if (dims.width > MAX.width || dims.height > MAX.height)
    msg = `excede el máximo (${MAX.width}×${MAX.height}). Redimensiona.`;
  else if (dims.sizeKb > MAX_SIZE_KB)
    msg = `peso alto (${(dims.sizeKb / 1024).toFixed(2)} MB > ${MAX_SIZE_KB / 1024} MB). Optimiza.`;
  return (
    <div
      className={`text-xs mb-2 px-2 py-1 rounded ${
        bad ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
      }`}
    >
      Detectado: {dims.width}×{dims.height} px, {(dims.sizeKb / 1024).toFixed(2)} MB — {msg}
    </div>
  );
};

const renderContentBadge = (chars, required) => {
  if (!required) {
    return (
      <div className="text-xs mb-2 px-2 py-1 rounded bg-gray-100 text-gray-600">
        Imagen autodescriptiva: contenido opcional.
      </div>
    );
  }
  if (chars === 0) {
    return (
      <div className="text-xs mb-2 px-2 py-1 rounded bg-red-100 text-red-700">
        Tienes título o descripción: el contenido es obligatorio (mín. {MIN_CONTENT_CHARS} caracteres).
      </div>
    );
  }
  if (chars < MIN_CONTENT_CHARS) {
    return (
      <div className="text-xs mb-2 px-2 py-1 rounded bg-yellow-100 text-yellow-700">
        {chars} / {MIN_CONTENT_CHARS} caracteres — faltan {MIN_CONTENT_CHARS - chars} para el mínimo.
      </div>
    );
  }
  return (
    <div className="text-xs mb-2 px-2 py-1 rounded bg-green-100 text-green-700">
      {chars} caracteres — cuerpo largo suficiente.
    </div>
  );
};

const NewsAdmin = () => {
  const [news, setNews] = useState([]);
  const [form, setForm] = useState({
    new_txt_tittle: '',
    new_txt_description: '',
    new_txt_content: '',
    new_txt_urlimage: null,
  });
  const [preview, setPreview] = useState(null);
  const [dims, setDims] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingItem, setViewingItem] = useState(null);

  useEffect(() => {
    fetchNews().then((data) => {
      if (Array.isArray(data)) setNews(data.map(normalize));
    });
  }, []);

  useEffect(() => {
    if (!viewingItem) return undefined;
    const handleKey = (e) => {
      if (e.key === 'Escape') setViewingItem(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [viewingItem]);

  const resetForm = () => {
    setForm({ new_txt_tittle: '', new_txt_description: '', new_txt_content: '', new_txt_urlimage: null });
    setPreview(null);
    setDims(null);
    setEditingId(null);
  };

  const handleFileChange = async (e) => {
    const file = pickValidImageFile(e);
    if (!file) return;
    setForm({ ...form, new_txt_urlimage: file });
    setPreview(URL.createObjectURL(file));
    setDims(await readDims(file));
  };

  const hasText = (f) =>
    (f.new_txt_tittle && f.new_txt_tittle.trim()) || (f.new_txt_description && f.new_txt_description.trim());

  const contentChars = (f) => stripHtml(f.new_txt_content).length;

  const isFormValid = (f) => {
    if (editingId) return true;
    if (!f.new_txt_urlimage) return false;
    if (hasText(f)) {
      return contentChars(f) >= MIN_CONTENT_CHARS;
    }
    return true;
  };

  const handleAdd = async () => {
    if (!form.new_txt_urlimage) {
      alert('Sube una imagen para la noticia.');
      return;
    }
    if (!isFormValid(form)) {
      alert(
        hasText(form)
          ? `El contenido debe tener al menos ${MIN_CONTENT_CHARS} caracteres cuando hay título o descripción.`
          : 'Sube una imagen para la noticia.'
      );
      return;
    }
    const result = await createNews(form);
    if (result) {
      setNews([normalize(result), ...news]);
      resetForm();
    }
  };

  const openEdit = (item) => {
    setEditingId(item.pk);
    setForm({
      new_txt_tittle: item.fields.new_txt_tittle || '',
      new_txt_description: item.fields.new_txt_description || '',
      new_txt_content: item.fields.new_txt_content || '',
      new_txt_urlimage: null,
    });
    setPreview(null);
    setDims(null);
    setIsModalOpen(true);
  };

  const handleEdit = async () => {
    if (!isFormValid(form)) {
      alert(
        hasText(form)
          ? `El contenido debe tener al menos ${MIN_CONTENT_CHARS} caracteres cuando hay título o descripción.`
          : 'Sube una imagen para la noticia.'
      );
      return;
    }
    const result = await updateNews(editingId, form);
    if (result) {
      setNews(news.map((n) => (n.pk === editingId ? normalize(result) : n)));
      resetForm();
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (pk) => {
    if (!window.confirm('¿Eliminar esta noticia?')) return;
    const ok = await deleteNews(pk);
    if (ok) setNews(news.filter((n) => n.pk !== pk));
  };

  return (
    <div className="bg-white-100 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Administrar Últimas Noticias</h1>

      <div className="bg-white shadow-xl border-2 border-gray-400 rounded-lg p-4 w-full max-w-2xl mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Agregar Noticia</h3>
        <input
          className="w-full p-2 mb-2 border rounded"
          type="text"
          placeholder="Título (opcional si la imagen es autodescriptiva)"
          value={form.new_txt_tittle}
          onChange={(e) => setForm({ ...form, new_txt_tittle: e.target.value })}
        />
        <textarea
          className="w-full p-2 mb-2 border rounded"
          rows="3"
          placeholder="Descripción corta (opcional)"
          value={form.new_txt_description}
          onChange={(e) => setForm({ ...form, new_txt_description: e.target.value })}
        />
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Contenido (cuerpo largo)
        </label>
        <QuillEditor value={form.new_txt_content} onChange={(v) => setForm({ ...form, new_txt_content: v })} />
        {renderContentBadge(contentChars(form), !editingId && hasText(form))}
        <input
          className="w-full p-2 mb-2 mt-2 border rounded"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
        <p className="text-xs text-gray-500 mb-2">
          Recomendado: <strong>{RECOMMENDED.width}×{RECOMMENDED.height} px</strong> (16:9), mín.{' '}
          {MIN.width}×{MIN.height}, máx. {MAX.width}×{MAX.height}, &lt; {MAX_SIZE_KB / 1024} MB.
        </p>
        {renderDimsBadge(dims)}
        {preview && (
          <img src={preview} alt="Previsualización" className="w-full h-32 object-cover rounded mb-2" />
        )}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={handleAdd}
          disabled={!isFormValid(form)}
        >
          Agregar Noticia
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-3 text-gray-700">
        Noticias publicadas ({news.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item) => {
          const hasTextCard =
            (item.fields.new_txt_tittle && item.fields.new_txt_tittle.trim()) ||
            (item.fields.new_txt_description && item.fields.new_txt_description.trim());
          return (
            <div
              key={item.pk}
              className="bg-white shadow-xl border-2 border-gray-300 rounded-lg overflow-hidden flex flex-col"
            >
              <div className="relative w-full aspect-video bg-gray-100">
                {item.fields.new_txt_urlimage && (
                  <img
                    src={mediaUrl(item.fields.new_txt_urlimage)}
                    alt={item.fields.new_txt_tittle || 'Noticia'}
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
              {hasTextCard && (
                <div className="p-4 flex-1">
                  {item.fields.new_txt_tittle && (
                    <h4 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                      {item.fields.new_txt_tittle}
                    </h4>
                  )}
                  {item.fields.new_txt_description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {item.fields.new_txt_description}
                    </p>
                  )}
                </div>
              )}
              <div className="px-4 pb-3 flex gap-2 justify-end flex-wrap">
                <button
                  type="button"
                  className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded hover:bg-blue-600 transition duration-150"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setViewingItem(item);
                  }}
                  title="Ver detalle completo en popup"
                >
                  <FaSearchPlus /> Ver más
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 bg-yellow-500 text-white px-3 py-1.5 rounded hover:bg-yellow-600 transition duration-150"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openEdit(item);
                  }}
                >
                  <FaEdit /> Editar
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600 transition duration-150"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(item.pk);
                  }}
                >
                  <FaTrash /> Eliminar
                </button>
              </div>
            </div>
          );
        })}
        {news.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-8">
            No hay noticias todavía. Agrega la primera usando el formulario.
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3">Editar Noticia</h3>
            <input
              className="w-full p-2 mb-2 border rounded"
              type="text"
              placeholder="Título"
              value={form.new_txt_tittle}
              onChange={(e) => setForm({ ...form, new_txt_tittle: e.target.value })}
            />
            <textarea
              className="w-full p-2 mb-2 border rounded"
              rows="3"
              placeholder="Descripción"
              value={form.new_txt_description}
              onChange={(e) => setForm({ ...form, new_txt_description: e.target.value })}
            />
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Contenido (cuerpo largo)
            </label>
            <QuillEditor
              value={form.new_txt_content}
              onChange={(v) => setForm({ ...form, new_txt_content: v })}
            />
            {renderContentBadge(contentChars(form), !editingId && hasText(form))}
            <input
              className="w-full p-2 mb-2 mt-2 border rounded"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mb-2">
              Si no subes imagen nueva, se mantiene la actual.
            </p>
            {renderDimsBadge(dims)}
            {preview && (
              <img src={preview} alt="Previsualización" className="w-full h-32 object-cover rounded mb-2" />
            )}
            {!preview && editingId && news.find((n) => n.pk === editingId)?.fields.new_txt_urlimage && (
              <img
                src={mediaUrl(news.find((n) => n.pk === editingId).fields.new_txt_urlimage)}
                alt="Actual"
                className="w-full h-32 object-cover rounded mb-2"
              />
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                onClick={handleEdit}
                disabled={!isFormValid(form)}
              >
                Guardar
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => {
                  resetForm();
                  setIsModalOpen(false);
                }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {viewingItem && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
          onClick={() => setViewingItem(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {viewingItem.fields.new_txt_urlimage && (
              <div className="relative w-full max-h-[60vh] bg-gray-100 flex items-center justify-center flex-shrink-0">
                <img
                  src={mediaUrl(viewingItem.fields.new_txt_urlimage)}
                  alt={viewingItem.fields.new_txt_tittle || 'Noticia'}
                  className="max-h-[60vh] w-auto max-w-full object-contain rounded-t-lg"
                />
                <button
                  className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center text-lg leading-none"
                  onClick={() => setViewingItem(null)}
                  aria-label="Cerrar"
                  title="Cerrar (Esc)"
                >
                  ×
                </button>
              </div>
            )}
            <div className="p-6 overflow-y-auto flex-1">
              {viewingItem.fields.new_txt_tittle && (
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {viewingItem.fields.new_txt_tittle}
                </h2>
              )}
              {viewingItem.fields.new_txt_description && (
                <p className="text-gray-600 italic mb-4">
                  {viewingItem.fields.new_txt_description}
                </p>
              )}
              {viewingItem.fields.new_txt_content && (
                <div
                  className="prose max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(viewingItem.fields.new_txt_content) }}
                />
              )}
            </div>
            <div className="p-4 border-t flex justify-between items-center flex-shrink-0 bg-gray-50">
              <span className="text-xs text-gray-500">
                Pulsa <kbd className="px-1 py-0.5 bg-gray-200 rounded">Esc</kbd> o haz clic fuera para cerrar
              </span>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setViewingItem(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsAdmin;