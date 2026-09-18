import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy, faEnvelope, faFileLines, faGraduationCap, faLocationDot, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { yearsOfExperience } from '../utils/dates';
import { pdfFileName } from '../utils/pdf';
import { trackEvent } from '../lib/events';
import { getPreferredTheme, applyTheme } from '../lib/theme';
import { TechIcon } from './TechIcon';

const FALLBACK_IMAGE = '/images/profile-fallback.svg';

const Hero = ({ data }) => {
  const [profileImage, setProfileImage] = useState(data.profileImage || FALLBACK_IMAGE);
  const heroYears = yearsOfExperience(data.experience);
  const [theme, setTheme] = useState(getPreferredTheme);
  const [copied, setCopied] = useState(false);
  const manualTheme = useRef(false);

  useEffect(() => { applyTheme(theme); }, [theme]);

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = event => {
      if (!manualTheme.current) setTheme(event.matches ? 'dark' : 'light');
    };
    if (query.addEventListener) query.addEventListener('change', onChange);
    return () => {     if (query.removeEventListener) query.removeEventListener('change', onChange); };
  }, []);

  useEffect(() => {
    const onPrint = () => printResume();
    const onCopy = () => copyEmail();
    const onTheme = () => toggleTheme();
    window.addEventListener('portfolio:print', onPrint);
    window.addEventListener('portfolio:copy-email', onCopy);
    window.addEventListener('portfolio:toggle-theme', onTheme);
    return () => {
      window.removeEventListener('portfolio:print', onPrint);
      window.removeEventListener('portfolio:copy-email', onCopy);
      window.removeEventListener('portfolio:toggle-theme', onTheme);
    };
  }, []);

  const toggleTheme = () => {
    manualTheme.current = true;
    setTheme(previous => {
      const next = previous === 'dark' ? 'light' : 'dark';
      trackEvent('theme_toggle', { theme: next });
      return next;
    });
  };

  const printResume = () => {
    trackEvent('print_resume_click');
    const prevTitle = document.title;
    document.title = pdfFileName();
    window.print();
    document.title = prevTitle;
  };

  const copyEmail = async () => {
    try {
      await window.navigator.clipboard.writeText(data.email);
    } catch {
      const area = document.createElement('textarea');
      area.value = data.email;
      document.body.appendChild(area);
      area.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      area.remove();
    }
    setCopied(true);
    trackEvent('contact_copy');
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="introduction">
      <div className="intro-layout">
        <div className="intro-content">
          {data.eyebrow && <p className="eyebrow">{data.eyebrow}</p>}
          <div className="name-lockup">
            <h1>{data.name}</h1>
            {Array.isArray(data.mottoSteps) && <span className="motto" aria-label="Build, fix, repeat">
              {data.mottoSteps.map((step, index) => (
                <React.Fragment key={step.label}>
                  {index > 0 && <span className="motto-arrow" aria-hidden="true">-&gt;</span>}
                  <span className={`motto-step motto-step-${index + 1}`}>{step.emoji && <span aria-hidden="true">{step.emoji}</span>}{step.icon && <TechIcon name={step.icon} />}{' '}{step.label}</span>
                </React.Fragment>
              ))}
            </span>}
          </div>
          <p className="headline">{data.headline}</p>
          <div className="badge-row">
            {data.availability && <span className="availability-badge">{data.availability}</span>}
            {Number.isFinite(heroYears) && heroYears > 0 && <span className="years-pill">💼 {heroYears}+ years experience</span>}
            <button type="button" className="print-button no-print" onClick={printResume}><FontAwesomeIcon icon={faFileLines} /> Resume</button>
            <button type="button" className="print-button no-print" onClick={toggleTheme} aria-pressed={theme === 'dark'} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} title="Toggle theme"><FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} /></button>
          </div>
          <p className="intro-copy">{data.intro.replace('{years}', heroYears ?? 10)}</p>
        </div>
        <div className="intro-media">
          <picture style={{ display: 'contents' }}>
            <source srcSet={profileImage.replace(/\.jpg$/i, '.webp')} type="image/webp" />
            <img
              className="profile-image"
              src={profileImage}
              alt="Photo of Sainath R"
              width="180"
              height="180"
              fetchPriority="high"
              decoding="async"
              onError={() => setProfileImage(FALLBACK_IMAGE)}
            />
          </picture>
        </div>
      </div>
      <div className="focus-tags" aria-label="Core engineering strengths">
        {(data.focusAreas || []).map(area => {
          const label = area.label || area;
              return <span key={label}>{area.icon && <TechIcon name={area.icon} />}{label}</span>;
        })}
      </div>
      <div className="contact-links">
        <a className="email-link" href={`mailto:${data.email}?subject=Hello%20Sainath`}><FontAwesomeIcon icon={faEnvelope} /> {data.email}</a>
        <button type="button" className="icon-button no-print" onClick={copyEmail} aria-label={copied ? 'Email address copied' : 'Copy email address'} title={copied ? 'Copied!' : 'Copy email'}><FontAwesomeIcon icon={copied ? faCheck : faCopy} /></button>
        <a className="icon-link" href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub"><TechIcon name="github" /></a>
        <a className="icon-link" href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn"><TechIcon name="linkedin" /></a>
        <span><FontAwesomeIcon icon={faLocationDot} /> {data.location}</span>
        <span className="education-inline"><FontAwesomeIcon icon={faGraduationCap} /><span>{[data.education.degree, data.education.school].filter(Boolean).join(' · ')}</span></span>
      </div>
    </section>
  );
};

export default Hero;
