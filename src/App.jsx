import React, { Suspense, lazy } from 'react';
import './styles/App.css';
import resumeData from './content/resumeData.json';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import SelectedWork from './components/SelectedWork';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Footer from './components/Footer';
import PrintResume from './components/PrintResume';
import Scrollbar from './components/Scrollbar';
import Testimonials from './components/Testimonials';

// Palette renders null until opened, so lazy keeps SSR/prerender HTML identical.
// Below-fold sections stay static: lazy would make renderToString emit fallbacks,
// stripping prerendered content and breaking SEO/first paint.
const CommandPalette = lazy(() => import('./components/CommandPalette'));

const App = () => {
  const data = resumeData;

  return (
    <>
      <div className="mx-auto max-w-[980px] px-7 pt-4 pb-6 text-left max-[1024px]:px-[22px] max-[1024px]:pt-4 max-[1024px]:pb-6 max-[768px]:px-[18px] max-[768px]:pt-4 max-[768px]:pb-8 print:hidden">
        <Hero data={data} />
        <Expertise specialties={data.specialties} />
        <SelectedWork work={data.selectedWork} />
        <Skills skills={data.skills} />
        <Experience experience={data.experience} defaultLogo={data.defaultLogo} />
        <Testimonials testimonials={data.testimonials} />
        <Footer name={data.name} />
      </div>
      <PrintResume data={data} />
      <Suspense fallback={null}>
        <CommandPalette />
      </Suspense>
      <Scrollbar />
    </>
  );
};

export default App;
