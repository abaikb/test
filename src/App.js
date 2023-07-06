import ContributionGraph from './components/contribut/ContributionGraph';
import "./App.css";

function App() {

  return (
    <div className='box'>
      <div className='month'>
        <div>Апр.</div>
        <div>Май</div>
        <div>Июнь</div>
        <div>Июль</div>
        <div>Авг.</div>
        <div>Сент.</div>
        <div>Окт.</div>
        <div>Нояб.</div>
        <div>Дек.</div>
        <div>Янв.</div>
        <div>Февр.</div>
        <div>Март</div>
      </div>
      <div className='week'>
        <div>Пн</div>
        <div>Ср</div>
        <div>Пт</div>
      </div>
       <ContributionGraph /> 
    </div>
  );
}

export default App;
