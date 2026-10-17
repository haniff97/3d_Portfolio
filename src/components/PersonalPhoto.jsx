import { Link } from 'react-router-dom';
import photos from '../data/photos.json';

export default function PersonalPhoto() {
  return <section className="page-shell photo-gallery-page">
    <div className="section-heading"><h1>Personal photo<span className="accent-dot">.</span></h1>{import.meta.env.DEV && <Link className="button button-dark" to="/manage-photos">Manage photos ↗</Link>}</div>
    {photos.length ? <div className="photo-gallery">{photos.map((photo, index) => <a key={photo.id} href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`Open photo ${index + 1} full size`}><img src={photo.src} alt={`Personal photo ${index + 1}`} loading="lazy" /></a>)}</div> : <p className="gallery-empty">Photos coming soon.</p>}
  </section>;
}
