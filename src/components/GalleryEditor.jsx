import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function GalleryEditor() {
  const [data, setData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('/__gallery-editor').then(async response => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setData(result);
    }).catch(error => setError(error.message));
  }, []);
  const save = async payload => {
    const response = await fetch('/__gallery-editor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);
    setData(result);
    return result;
  };
  const upload = async event => {
    const files = Array.from(event.target.files);
    event.target.value = '';
    if (!files.length) return;
    setError(''); setMessage('');
    if (files.some(file => !['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024)) {
      setError('Choose PNG, JPEG or WebP photos under 5 MB each.'); return;
    }
    setBusy(true);
    let current = data;
    let completed = 0;
    try {
      for (const file of files) {
        const encoded = await new Promise((resolve, reject) => {
          const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error('Could not read photo.')); reader.readAsDataURL(file);
        });
        await new Promise((resolve, reject) => { const image = new Image(); image.onload = resolve; image.onerror = () => reject(new Error('Invalid image.')); image.src = encoded; });
        current = await save({ action: 'add', revision: current.revision, upload: encoded });
        completed++;
        setMessage(`Saved ${completed} of ${files.length} photos.`);
      }
      setMessage(`Saved ${completed} photos. Deploy normally to publish your gallery.`);
    } catch (error) { setError(`${error.message} ${completed} photos were saved; the remaining photos were not uploaded.`); }
    finally { setBusy(false); }
  };
  const remove = async id => {
    if (!window.confirm('Remove this photo from the gallery? The original file will be kept.')) return;
    setBusy(true); setError(''); setMessage('');
    try { await save({ action: 'remove', id, revision: data.revision }); setMessage('Photo removed from the gallery.'); }
    catch (error) { setError(error.message); }
    finally { setBusy(false); }
  };
  return <section className="page-shell">
    <p className="eyebrow">LOCAL EDITOR / GALLERY</p><h1>Manage photos<span className="accent-dot">.</span></h1>
    <p className="editor-intro">Upload multiple photos. The public gallery shows images only, without titles or captions.</p>
    <Link className="text-link" to="/personal-photo">← View gallery</Link>
    {error && <p className="editor-error" role="alert">{error}</p>}{message && <p className="editor-success" role="status">{message}</p>}
    {data ? <><label className="gallery-upload">Add photos<input type="file" accept="image/png,image/jpeg,image/webp" multiple disabled={busy} onChange={upload} /><small>PNG, JPEG or WebP · up to 5 MB each · saves immediately</small></label>
      <p role="status">{busy ? 'Saving… Please keep this page open.' : `${data.photos.length} photos`}</p>
      <div className="gallery-editor-grid">{data.photos.map((photo, index) => <div key={photo.id}><img src={photo.src} alt={`Gallery photo ${index + 1}`} loading="lazy" /><button className="text-link" disabled={busy} onClick={() => remove(photo.id)}>Remove photo {index + 1}</button></div>)}</div></> : <p>{error ? 'Reload to try again.' : 'Loading photos…'}</p>}
  </section>;
}
