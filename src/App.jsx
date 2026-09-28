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
      <div className="mx-auto max-w-[980px] px-7 pt-[18px] pb-9 text-left max-[1024px]:px-[22px] max-[1024px]:pt-[18px] max-[1024px]:pb-8 max-[768px]:px-[18px] max-[768px]:pt-6 max-[768px]:pb-14 print:hidden">
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
