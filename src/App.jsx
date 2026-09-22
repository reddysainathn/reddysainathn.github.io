import './styles/App.css';
import resumeData from './content/resumeData.json';
import Hero from './components/Hero';
import Expertise from './components/Expertise';
import SelectedWork from './components/SelectedWork';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Footer from './components/Footer';
import PrintResume from './components/PrintResume';
import CommandPalette from './components/CommandPalette';
import Scrollbar from './components/Scrollbar';
import Testimonials from './components/Testimonials';

const App = () => {
  const data = resumeData;

  return (
    <>
      <a className="skip-link no-print" href="#expertise">
        Skip to content
      </a>
      <div className="portfolio">
        <Hero data={data} />
        <Expertise specialties={data.specialties} />
        <SelectedWork work={data.selectedWork} />
        <Skills skills={data.skills} />
        <Experience experience={data.experience} defaultLogo={data.defaultLogo} />
        <Testimonials testimonials={data.testimonials} />
        <Footer name={data.name} />
      </div>
      <PrintResume data={data} />
      <CommandPalette />
      <Scrollbar />
    </>
  );
};

export default App;
