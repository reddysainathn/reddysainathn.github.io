export const yearsOfExperience = (experience = []) => {
  const starts = (Array.isArray(experience) ? experience : [])
    .map((job) => new Date(job.startDate))
    .filter((date) => !Number.isNaN(date.getTime()));
  if (starts.length === 0) return null;
  const earliest = new Date(Math.min(...starts));
  const now = new Date();
  let years = now.getFullYear() - earliest.getFullYear();
  if (
    now.getMonth() < earliest.getMonth() ||
    (now.getMonth() === earliest.getMonth() && now.getDate() < earliest.getDate())
  ) {
    years -= 1;
  }
  return years;
};

export const roleTenure = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (end.getDate() < start.getDate()) months -= 1;
  months = Math.max(months, 0);
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  const parts = [];
  if (yrs) parts.push(`${yrs} yr${yrs === 1 ? '' : 's'}`);
  if (mos || !yrs) parts.push(`${mos} mo${mos === 1 ? '' : 's'}`);
  return parts.join(' ');
};
