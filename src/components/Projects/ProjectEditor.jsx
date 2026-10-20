import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectImage } from '../../data/projectImages';

const blank = { title: '', description: '', image: '', ghLink: '', demoLink: '', notionLink: '', blogLink: '' };
export default function ProjectEditor() {
  const [data, setData] = useState(null);
  const [form, setForm] = useState(blank);
  const [upload, setUpload] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [reading, setReading] = useState(false);
  const [dirty, setDirty] = useState(false);
  useEffect(() => {
    fetch('/__project-editor').then(async response => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setData(result);
    }).catch(error => setError(error.message));
  }, []);
  useEffect(() => {
    const warn = event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  const change = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setDirty(true); setMessage('');
  };
  const select = project => {
    if (dirty && !window.confirm('Discard your unsaved changes?')) return;
    setForm(project ? { ...blank, ...project } : blank);
    setUpload(''); setDirty(false); setError(''); setMessage('');
  };
  const chooseImage = event => {
    const file = event.target.files[0];
    if (!file) return;
    setError('');
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError('Choose a PNG, JPEG, or WebP image smaller than 5 MB.');
      event.target.value = ''; return;
    }
    setReading(true);
    const reader = new FileReader();
    reader.onload = () => { setUpload(reader.result); setDirty(true); setReading(false); };
    reader.onerror = () => { setError('Could not read the image. Please try again.'); setReading(false); };
    reader.readAsDataURL(file);
  };
  const save = async event => {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      const response = await fetch('/__project-editor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ project: form, upload, revision: data.revision }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setData(result); setForm(blank); setUpload(''); setDirty(false);
      setMessage('Saved to your project files. Deploy normally to publish this change.');
    } catch (error) { setError(error.message); }
    finally { setBusy(false); }
  };
  return <section className="page-shell">
    <p className="eyebrow">LOCAL WORKSPACE</p><h1>Manage projects<span className="accent-dot">.</span></h1>
    <p className="editor-intro">Create and edit cards here. Save them to this project, then deploy your portfolio as usual.</p>
    <Link className="text-link" to="/projects" onClick={event => { if (dirty && !window.confirm('Leave without saving?')) event.preventDefault(); }}>← View project page</Link>
    {error && <p className="editor-error" role="alert">{error}</p>}
    {message && <p className="editor-success" role="status">{message}</p>}
    {!data ? <p>{error ? 'Reload this page to try again.' : 'Loading projects…'}</p> : <div className="editor-layout">
      <aside className="editor-list"><button type="button" className="button button-dark" disabled={busy || reading} onClick={() => select(null)}>+ New project</button><p>{data.projects.length} projects</p>{data.projects.map(project => <button type="button" disabled={busy || reading} key={project.id} onClick={() => select(project)} aria-pressed={form.id === project.id}>{project.title}</button>)}</aside>
      <form onSubmit={save} className="editor-form"><h2>{form.id ? 'Edit project' : 'New project'}</h2>
        <fieldset disabled={busy || reading}>
          <label>Title<input name="title" value={form.title} onChange={change} maxLength={120} required /></label>
          <label>Description<textarea name="description" value={form.description} onChange={change} rows={5} maxLength={3000} required /></label>
          <label>Upload image <small>PNG, JPEG or WebP · up to 5 MB</small><input key={`${form.id || 'new'}-${upload ? 'uploaded' : 'empty'}`} type="file" accept="image/png,image/jpeg,image/webp" onChange={chooseImage} /></label>
          {upload ? <button type="button" className="text-link" onClick={() => setUpload('')}>Remove selected upload</button> : <label>Image URL or existing image path<input name="image" value={form.image} onChange={change} placeholder="https://example.com/project.png" required /></label>}
          {(upload || form.image) && <img className="editor-image" src={upload || projectImage(form.image)} alt="Project image preview" />}
          {[['ghLink', 'GitHub URL'], ['demoLink', 'Live demo URL'], ['notionLink', 'Notion URL'], ['blogLink', 'Blog URL']].map(([name, label]) => <label key={name}>{label} <small>optional</small><input type="url" name={name} value={form[name] || ''} onChange={change} placeholder="https://" /></label>)}
          <button className="button button-dark" type="submit">{busy ? 'Saving…' : reading ? 'Reading image…' : 'Save project'}</button>
        </fieldset>
      </form>
    </div>}
  </section>;
}
