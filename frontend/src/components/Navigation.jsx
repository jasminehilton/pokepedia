import '../styles/Navigation.css';
import Regions from './Regions';
import TypeButton from './TypeButton';

const Navigation = () => {
  return (
    <div className="navbar" >
      <div>my collection</div>
      <div>region button</div>
      {/* <Regions/>  */}
      <div>type button</div>
      {/* <TypeButton/> */}
      <div>search bar</div>
      <div>login/register</div>
    </div>
  )
}

export default Navigation