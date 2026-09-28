import React, { useEffect, useRef } from 'react';

const MIN_THUMB = 32;

const Scrollbar = () => {
  const thumbRef = useRef(null);

  useEffect(() => {
    const doc = document.documentElement;
    const thumb = thumbRef.current;
    if (!thumb) return;

    const metrics = () => {
      const total = doc.scrollHeight - window.innerHeight;
      const ratio = window.innerHeight / Math.max(doc.scrollHeight, 1);
      const thumbHeight = Math.max(ratio * window.innerHeight, MIN_THUMB);
      return { total, thumbHeight, maxTop: window.innerHeight - thumbHeight };
    };

    const paint = () => {
      const { total, thumbHeight, maxTop } = metrics();
      thumb.style.display = total <= 0 ? 'none' : '';
      thumb.style.height = `${thumbHeight}px`;
      const y = total > 0 ? (window.scrollY / total) * maxTop : 0;
      thumb.style.transform = `translate(-50%, ${y}px)`;
    };

    let ticking = false;
    const requestPaint = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          paint();
        });
      }
    };

    const onDragMove = (startY, startScroll) => (event) => {
      const { total, maxTop } = metrics();
      if (total <= 0 || maxTop <= 0) return;
      window.scrollTo(0, startScroll + ((event.clientY - startY) / maxTop) * total);
    };

    const onThumbDown = (event) => {
      event.preventDefault();
      const startY = event.clientY;
      const startScroll = window.scrollY;
      const move = onDragMove(startY, startScroll);
      const up = () => {
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      };
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    };

    const onRailDown = (event) => {
      if (event.target !== event.currentTarget) return;
      const { total } = metrics();
      if (total <= 0) return;
      window.scrollTo(0, (event.clientY / window.innerHeight) * doc.scrollHeight - window.innerHeight / 2);
    };

    const rail = thumb.parentElement;
    thumb.addEventListener('mousedown', onThumbDown);
    rail.addEventListener('mousedown', onRailDown);
    window.addEventListener('scroll', requestPaint, { passive: true });
    window.addEventListener('resize', requestPaint);
    paint();

    return () => {
      thumb.removeEventListener('mousedown', onThumbDown);
      rail.removeEventListener('mousedown', onRailDown);
      window.removeEventListener('scroll', requestPaint);
      window.removeEventListener('resize', requestPaint);
    };
  }, []);

  return (
    <div
      className="fixed inset-y-0 right-0 z-[90] w-[18px] print:hidden before:absolute before:inset-y-0 before:left-1/2 before:w-[2px] before:-translate-x-1/2 before:bg-line before:content-['']"
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-0 w-2 cursor-pointer rounded-md bg-accent hover:bg-signal" ref={thumbRef} />
    </div>
  );
};

export default Scrollbar;
