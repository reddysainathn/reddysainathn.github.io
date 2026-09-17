const yearsOfExperience = (experience = []) => {
  const years = (Array.isArray(experience) ? experience : [])
    .map(job => new Date(job.startDate).getFullYear())
    .filter(year => Number.isFinite(year));
  if (years.length === 0) return null;
  return new Date().getFullYear() - Math.min(...years);
};

const Snapshot = ({ data }) => {
  const years = yearsOfExperience(data.experience);
  const items = [
    data.location && `📍 ${data.location}`,
    Number.isFinite(years) && years > 0 && `💼 ${years}+ years experience`,
    data.availability && `🎯 ${data.availability}`,
    data.workAuthorization && `🛂 ${data.workAuthorization}`,
    data.remotePreference && `🏠 ${data.remotePreference}`,
  ].filter(Boolean);

  if (items.length === 0) return null;

  return (
    <div className="focus-tags snapshot" aria-label="At a glance">
      {items.map(item => <span key={item}>{item}</span>)}
    </div>
  );
};

export default Snapshot;
