import React, { useState, useEffect, useRef } from 'react';
import { yearsOfExperience } from '../utils/dates';
import { pdfFileName } from '../utils/pdf';
import { trackEvent } from '../lib/events';
import { visitorNetwork, cachedNetwork, ALLOWED_COUNTRIES } from '../lib/geo';
import { encodeFingerprint } from '../lib/codec';
import { getPreferredTheme, applyTheme } from '../lib/theme';
import { TechIcon } from './TechIcon';

const FALLBACK_IMAGE = '/images/profile-fallback.svg';

const Hero = ({ data }) => {
  const [profileImage, setProfileImage] = useState(data.profileImage || FALLBACK_IMAGE);
  const heroYears = yearsOfExperience(data.experience);
  const [theme, setTheme] = useState(getPreferredTheme);
  const [copied, setCopied] = useState(false);
  const manualTheme = useRef(false);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const warmNetwork = () => visitorNetwork();
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(warmNetwork, { timeout: 3000 });
    } else {
      window.setTimeout(warmNetwork, 1500);
    }
  }, []);

  const emailRecruiter = (event) => {
    event.preventDefault();
    const SHOW_FINGERPRINT = false; // true = visible test line, false = invisible
    const net = cachedNetwork();
    const allowed = !!net?.country && ALLOWED_COUNTRIES.includes(net.country);
    const payload = allowed
      ? JSON.stringify({
          c: net.country,
          ci: net.city || null,
          i: net.ip || null,
          o: net.os || null,
          d: net.device || null,
        })
      : null;
    const now = new Date();
    const pad = (value) => String(value).padStart(2, '0');
    let tzName = '';
    try {
      tzName = ` ${now.toLocaleTimeString('en-US', { timeZoneName: 'short' }).split(' ').pop()}`;
    } catch {
      tzName = '';
    }
    const stamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(
      now.getHours()
    )}:${pad(now.getMinutes())}${tzName}`;
    const fingerprint = payload
      ? SHOW_FINGERPRINT
        ? `\n[fp: ${payload}]`
        : `\n${encodeFingerprint(payload)}`
      : SHOW_FINGERPRINT
        ? '\n[fp: unavailable - lookup blocked or failed]'
        : '';
    const body = `Hello Sainath,\n\nI came across your portfolio and would be glad to connect.\n\nKind regards${fingerprint}`;
    window.open(
      `mailto:${data.email}?subject=${encodeURIComponent(`Sainath Introduction : ${stamp}`)}&body=${encodeURIComponent(body)}`,
      '_blank',
      'noopener'
    );
  };

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event) => {
      if (!manualTheme.current) setTheme(event.matches ? 'dark' : 'light');
    };
    if (query.addEventListener) query.addEventListener('change', onChange);
    return () => {
      if (query.removeEventListener) query.removeEventListener('change', onChange);
    };
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
    setTheme((previous) => {
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
      try {
        document.execCommand('copy');
      } catch {
        /* ignore */
      }
      area.remove();
    }
    setCopied(true);
    trackEvent('contact_copy');
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="[border-bottom:1px_solid_var(--line)] pt-2 pb-3">
      <div className="flex items-center justify-start gap-5 print:gap-[20px] print:max-[768px]:gap-[20px] max-[1024px]:gap-5 max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-4">
        <div className="intro-content min-w-0">
          {data.eyebrow && (
            <p className="mt-0 mb-2 font-mono text-[0.62rem] font-bold uppercase tracking-[0.12em] text-accent">
              {data.eyebrow}
            </p>
          )}
          <div className="name-lockup flex flex-wrap items-baseline gap-x-3 gap-y-1 max-[768px]:gap-[9px]">
            <h1 className="m-0 font-display text-[clamp(1.5rem,4vw,2.4rem)] font-bold leading-none tracking-[-0.05em]">
              {data.name}
            </h1>
            {Array.isArray(data.mottoSteps) && (
              <span
                className="font-mono text-xs font-bold tracking-[0.01em] whitespace-nowrap text-muted max-[768px]:text-[0.66rem] max-[360px]:whitespace-normal leading-[1.2]"
                aria-label="Build, fix, repeat"
              >
                {data.mottoSteps.map((step, index) => (
                  <React.Fragment key={step.label}>
                    {index > 0 && (
                      <span
                        className="mx-[5px] text-[1.25em] leading-none text-muted max-[768px]:mx-[3px]"
                        aria-hidden="true"
                      >
                        -&gt;
                      </span>
                    )}
                    <span
                      className={`inline-flex gap-[3px] ${index === 0 ? 'text-accent' : index === 1 ? 'text-signal' : 'text-thumb'}`}
                    >
                      {step.emoji && (
                        <span className="text-[1.25em] leading-none" aria-hidden="true">
                          {step.emoji}
                        </span>
                      )}
                      {step.icon && (
                        <TechIcon name={step.icon} className="h-[1em] w-[1em] mr-[3px] align-[-2px] text-[1.25em]" />
                      )}{' '}
                      {step.label}
                    </span>
                  </React.Fragment>
                ))}
              </span>
            )}
          </div>
          <p className="mt-2 mb-1.5 max-w-[690px] font-display text-[clamp(1.05rem,1.8vw,1.35rem)] leading-[1.25]">
            {data.headline}{' '}
            <span className="ml-3 inline-flex gap-[10px] whitespace-nowrap align-baseline">
              <a
                href={data.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-ink hover:text-accent"
              >
                <TechIcon name="github" className="h-[1em] w-[1em] mr-[5px] align-[-2px]" />
                <span className="sr-only">GitHub profile</span>
              </a>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-ink hover:text-accent"
              >
                <TechIcon name="linkedin" className="h-[1em] w-[1em] mr-[5px] align-[-2px]" />
                <span className="sr-only">LinkedIn profile</span>
              </a>
            </span>
          </p>
          <div className="m-0 mb-2 flex flex-wrap items-center gap-2">
            {data.availability && (
              <span className="inline-block rounded-full bg-[rgba(8,127,140,0.08)] px-[10px] py-[7px] font-mono text-[0.7rem] font-bold uppercase tracking-[0.06em] text-accent [border:1px_solid_rgba(8,127,140,0.28)] dark:[border-color:rgba(255,255,255,0.6)]">
                {data.availability}
              </span>
            )}
            {Number.isFinite(heroYears) && heroYears > 0 && (
              <span className="rounded-full px-[10px] py-[7px] font-mono text-[0.7rem] font-bold uppercase tracking-[0.06em] text-ink [border:1px_solid_var(--line)] dark:[border-color:rgba(255,255,255,0.75)]">
                💼 {heroYears}+ years experience
              </span>
            )}
            <button
              type="button"
              className="print:hidden relative cursor-pointer overflow-hidden rounded-full bg-transparent px-[14px] py-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.06em] text-ink [border:1px_solid_var(--ink)] hover:bg-ink hover:text-invert dark:[border-color:rgba(255,255,255,0.75)] after:absolute after:inset-0 after:translate-x-[-120%] after:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.45)_50%,transparent_60%)] after:content-[''] after:[transition:transform_0.6s_ease] hover:after:translate-x-[120%]"
              onClick={printResume}
            >
              <TechIcon name="file-lines" className="h-[1em] w-[1em] align-[-0.125em]" /> Resume
            </button>
            <button
              type="button"
              className="print:hidden relative cursor-pointer overflow-hidden rounded-full bg-transparent px-[14px] py-2 font-mono text-[0.7rem] font-bold uppercase tracking-[0.06em] text-ink [border:1px_solid_var(--ink)] hover:bg-ink hover:text-invert dark:[border-color:rgba(255,255,255,0.75)] after:absolute after:inset-0 after:translate-x-[-120%] after:bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.45)_50%,transparent_60%)] after:content-[''] after:[transition:transform_0.6s_ease] hover:after:translate-x-[120%]"
              onClick={toggleTheme}
              aria-pressed={theme === 'dark'}
              suppressHydrationWarning
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <TechIcon name={theme === 'dark' ? 'sun' : 'moon'} className="h-[1em] w-[1em] align-[-0.125em]" />
            </button>
          </div>
          <p className="m-0 max-w-[720px] font-display text-base leading-[1.6] text-body underline decoration-[1px] underline-offset-[3px]">
            {data.intro.replace('{years}', heroYears ?? 10)}
          </p>
        </div>
        <div className="intro-media order-[-1] flex flex-none self-stretch max-[768px]:w-full max-[768px]:items-center max-[768px]:justify-start">
          <picture className="contents">
            <source srcSet={profileImage.replace(/\.jpg$/i, '.webp')} type="image/webp" />
            <img
              className="my-auto mx-0 aspect-square h-full w-auto max-h-[170px] max-w-full rounded-full object-cover object-[center_top] shadow-[0_18px_30px_rgba(23,33,38,0.08)] print:shadow-none max-[1024px]:max-h-[130px] max-[768px]:m-0 max-[768px]:aspect-auto max-[768px]:h-[120px] max-[768px]:max-h-none max-[768px]:w-[120px]"
              src={profileImage}
              alt="Photo of Sainath R"
              width="180"
              height="180"
              fetchPriority="high"
              loading="eager"
              decoding="async"
              onError={() => setProfileImage(FALLBACK_IMAGE)}
            />
          </picture>
        </div>
      </div>
      <div className="focus-tags mt-3 flex flex-wrap gap-1.5 pb-[2px]" aria-label="Core engineering strengths">
        {(data.focusAreas || []).map((area) => {
          const label = area.label || area;
          return (
            <span
              key={label}
              className="whitespace-nowrap px-[9px] py-[6px] font-mono text-[0.7rem] font-bold text-ink [border:1px_solid_var(--line)] dark:bg-card dark:[border-color:rgba(63,182,194,0.5)]"
            >
              {area.icon && <TechIcon name={area.icon} className="h-[0.95em] w-[0.95em] mr-[6px] align-[-2px]" />}
              {label}
            </span>
          );
        })}
      </div>
      <div className="contact-links mt-3 flex flex-nowrap items-center gap-x-3 gap-y-2 overflow-x-visible whitespace-nowrap pb-[2px] max-[1024px]:flex-wrap max-[1024px]:gap-y-2 max-[768px]:flex-wrap max-[768px]:gap-x-5 max-[768px]:gap-y-2 max-[768px]:overflow-visible max-[768px]:whitespace-normal">
        <a
          className="email-link flex-none inline-flex items-center text-[0.78rem]"
          href={`mailto:${data.email}`}
          onClick={emailRecruiter}
          data-tip="Click to say hello — opens your mail app"
        >
          <TechIcon name="envelope" /> {data.email}
        </a>
        <button
          type="button"
          className="print:hidden inline-flex flex-none cursor-pointer items-center justify-center rounded-lg bg-transparent px-2 py-[6px] text-xs text-muted [border:1px_solid_var(--line)] hover:border-accent hover:text-accent"
          onClick={copyEmail}
          aria-label={copied ? 'Email address copied' : 'Copy email address'}
        >
          <TechIcon name={copied ? 'check' : 'copy'} className="h-[1em] w-[1em] align-[-0.125em]" />
        </button>
        <span className="flex-none inline-flex items-center text-[0.78rem] font-semibold text-ink">
          <TechIcon name="location-dot" className="text-[#d93025]" /> {data.location}
        </span>
        <span className="flex min-w-0 flex-nowrap items-center gap-2 font-semibold text-muted max-[768px]:items-start">
          <TechIcon name="graduation-cap" className="text-signal" />
          <span className="text-[0.88rem]">
            {data.education.degree}
            {data.education.school && (
              <>
                {' · '}
                {data.education.schoolUrl ? (
                  <a
                    href={data.education.schoolUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-none font-bold text-accent underline decoration-[1px] underline-offset-[3px] dark:text-[#7fdae2]"
                  >
                    {data.education.school}
                  </a>
                ) : (
                  data.education.school
                )}
              </>
            )}
          </span>
        </span>
      </div>
    </section>
  );
};

export default Hero;
