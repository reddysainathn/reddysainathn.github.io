import './styles/App.css';
import resumeData from './content/resumeData.json';
import Hero from './components/Hero';
import Snapshot from './components/Snapshot';
import Expertise from './components/Expertise';
import SelectedWork from './components/SelectedWork';
import Skills from './components/Skills';
import Experience from './components/Experience';

const App = () => {
  const data = resumeData;

  return (
    <div className="portfolio">
      <Hero data={data} />
      <Snapshot data={data} />
      <Expertise specialties={data.specialties} />
      <SelectedWork work={data.selectedWork} />
      <Skills skills={data.skills} />
      <Experience experience={data.experience} defaultLogo={data.defaultLogo} />
    </div>
  );
};

export default App;
