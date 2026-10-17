import profile from '../data/profile.json';
import putrajaya from '../assets/putrajaya-nightlights.png';

export default function ProfilePortrait() {
  return <figure className={`profile-portrait ${profile.photo ? 'has-photo' : 'place-photo'}`}>
    <img src={profile.photo || putrajaya} alt={profile.photo ? profile.photoAlt : 'Putrajaya illustration with an illuminated red bridge and reflections on the water'} style={{ objectPosition: profile.photo ? profile.photoPosition : '55% 55%' }} />
    <figcaption><span>{profile.photo ? profile.name : profile.location}</span><span>{profile.photo ? 'A little about me ↗' : 'A little perspective ↗'}</span></figcaption>
  </figure>;
}
