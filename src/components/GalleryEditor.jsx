import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUploadCloud, FiImage, FiTrash2, FiArrowUpRight } from 'react-icons/fi';

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
      setMessage(`Saved ${completed} ${completed === 1 ? 'photo' : 'photos'}. Deploy normally to publish your gallery.`);
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
  return <section className="page-shell gallery-manager">
    <p className="eyebrow">LOCAL EDITOR / GALLERY</p><h1>Manage photos<span className="accent-dot">.</span></h1>
    <p className="editor-intro">Upload multiple photos. The public gallery shows images only, without titles or captions.</p>
    <Link className="text-link" to="/personal-photo">← View gallery</Link>
    {error && <p className="editor-error" role="alert">{error}</p>}{message && <p className="editor-success" role="status">{message}</p>}
    {data ? <>
      <div className="gallery-upload-panel" aria-busy={busy}>
        <div className="gallery-upload-symbol"><FiUploadCloud aria-hidden="true" /></div>
        <div className="gallery-upload-copy"><p className="eyebrow">A NEW PERSPECTIVE</p><h2>Add to your collection.</h2><p>Choose a few moments worth sharing. Upload one photo or several at once.</p><small>PNG, JPEG or WebP · up to 5 MB each</small></div>
        <div className="gallery-upload-action"><label className={`gallery-file-button ${busy ? 'is-disabled' : ''}`}><input type="file" accept="image/png,image/jpeg,image/webp" multiple disabled={busy} onChange={upload} aria-label="Choose photos" /><FiImage aria-hidden="true" /><span>{busy ? 'Saving…' : 'Choose photos'}</span><FiArrowUpRight aria-hidden="true" /></label><span>Saves to your local project</span></div>
      </div>
      <div className="gallery-collection-heading"><h2>Your collection <span>{data.photos.length}</span></h2><p role="status">{busy ? 'Saving… Please keep this page open.' : 'Ready for your next upload'}</p></div>
      {!data.photos.length && <p className="gallery-manager-empty">Your collection starts here. Add your first photo above.</p>}
      <div className="gallery-editor-grid">{data.photos.map((photo, index) => <article className="gallery-manager-card" key={photo.id}><img src={photo.src} alt={`Gallery photo ${index + 1}`} loading="lazy" /><div><span>PHOTO {String(index + 1).padStart(2, '0')}</span><button type="button" disabled={busy} onClick={() => remove(photo.id)} aria-label={`Remove photo ${index + 1}`}><FiTrash2 aria-hidden="true" /> Remove</button></div></article>)}</div></> : <p>{error ? 'Reload to try again.' : 'Loading photos…'}</p>}
  </section>;
}
