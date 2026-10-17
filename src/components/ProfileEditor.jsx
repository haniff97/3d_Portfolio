import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const groups = [
  ['Identity', [['name', 'Full name', 120], ['role', 'Role', 160], ['location', 'Location', 120]]],
  ['Homepage', [['headline', 'Headline — first line', 100], ['headlineAccent', 'Headline — second line', 100], ['intro', 'Introduction', 300], ['summary', 'Hero summary', 1200, true], ['homeAbout', 'Homepage About text', 2000, true]]],
  ['About page', [['aboutTitle', 'About heading', 120], ['aboutSubtitle', 'About subheading', 120], ['aboutBody', 'Biography — separate paragraphs with a blank line', 10000, true]]],
  ['Contact', [['email', 'Contact email', 254], ['contactIntro', 'Contact introduction', 500], ['contactTitle', 'Contact headline', 160]]],
];
export default function ProfileEditor() {
  const [form, setForm] = useState(null);
  const [revision, setRevision] = useState('');
  const [upload, setUpload] = useState('');
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('/__profile-editor').then(async response => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setForm(result.profile); setRevision(result.revision);
    }).catch(error => setError(error.message));
  }, []);
  useEffect(() => {
    const warn = event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  const change = event => { setForm({ ...form, [event.target.name]: event.target.value }); setDirty(true); setMessage(''); };
  const choosePhoto = async event => {
    const file = event.target.files[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) { setError('Choose a PNG, JPEG, or WebP under 5 MB.'); event.target.value = ''; return; }
    setBusy(true); setError('');
    try {
      const photo = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error('Could not read photo.'));
        reader.readAsDataURL(file);
      });
      await new Promise((resolve, reject) => { const image = new Image(); image.onload = resolve; image.onerror = () => reject(new Error('This image could not be decoded.')); image.src = photo; });
      setUpload(photo); setDirty(true); setMessage('');
    } catch (error) { setError(error.message); }
    finally { setBusy(false); }
  };
  const save = async event => {
    event.preventDefault(); setBusy(true); setError(''); setMessage('');
    try {
      const response = await fetch('/__profile-editor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ profile: form, revision, upload }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setForm(result.profile); setRevision(result.revision); setUpload(''); setDirty(false);
      setMessage('Profile saved. Commit the updated profile and photo, then deploy normally.');
    } catch (error) { setError(error.message); }
    finally { setBusy(false); }
  };
  const leave = event => { if (dirty && !window.confirm('Leave without saving your profile changes?')) event.preventDefault(); };
  return <section className="page-shell profile-editor">
    <p className="eyebrow">LOCAL EDITOR / PROFILE</p><h1>Your words.<br /><span>Your picture.</span></h1>
    <p className="editor-intro">Update your personal photo and page content here. Changes stay local until you deploy.</p>
    <div className="button-row"><Link className="text-link" to="/" onClick={leave}>← Preview homepage</Link><Link className="text-link" to="/manage-projects" onClick={leave}>Manage projects ↗</Link></div>
    {error && <p className="editor-error" role="alert">{error}</p>}{message && <p className="editor-success" role="status">{message}</p>}
    {!form ? <p>{error ? 'Reload to try again.' : 'Loading profile…'}</p> : <form className="profile-form" onSubmit={save}><fieldset disabled={busy}>
      <section className="photo-editor-panel"><div><p className="eyebrow">01 / PERSONAL PHOTO</p><h2>Put a face to the work.</h2><p>Your photo appears on Home and About. Until you add one, the Putrajaya artwork stays in its place.</p>
        <label>Choose a photo<input key={`${form.photo}-${upload ? 'selected' : 'empty'}`} type="file" accept="image/png,image/jpeg,image/webp" onChange={choosePhoto} /><small>PNG, JPEG or WebP · maximum 5 MB</small></label>
        <label>Photo description<input name="photoAlt" value={form.photoAlt} maxLength={200} onChange={change} required={Boolean(upload || form.photo)} /></label>
        <label>Photo framing<select name="photoPosition" value={form.photoPosition} onChange={change}><option value="50% 25%">Focus toward top</option><option value="50% 50%">Centered</option><option value="50% 75%">Focus toward bottom</option></select></label>
        {(upload || form.photo) && <button className="text-link" type="button" onClick={() => { setUpload(''); setForm({ ...form, photo: '' }); setDirty(true); setMessage(''); }}>Remove photo</button>}
      </div><div className="photo-preview">{upload || form.photo ? <img src={upload || form.photo} alt={form.photoAlt || 'Photo preview'} style={{ objectPosition: form.photoPosition }} /> : <div className="photo-empty"><span>HH</span><p>Your photo will appear here.</p></div>}</div></section>
      {groups.map(([group, fields], index) => <section className="profile-field-group" key={group}><div><p className="eyebrow">0{index + 2} / CONTENT</p><h2>{group}</h2></div><div>{fields.map(([name, label, maxLength, multiline]) => <label key={name}>{label}{multiline ? <textarea rows={name === 'aboutBody' ? 10 : 4} name={name} value={form[name]} maxLength={maxLength} onChange={change} required /> : <input type={name === 'email' ? 'email' : 'text'} name={name} value={form[name]} maxLength={maxLength} onChange={change} required />}</label>)}</div></section>)}
      <div className="profile-save"><p>{dirty ? 'You have unsaved changes.' : 'Your profile is up to date.'}</p><button className="button button-dark" type="submit">{busy ? 'Please wait…' : 'Save profile'}</button></div>
    </fieldset></form>}
  </section>;
}
