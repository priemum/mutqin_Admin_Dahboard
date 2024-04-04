import { useParams } from 'react-router-dom';
import EditUserSettingform from './EditUserSettingform';
import EditUserform from './EditUserform';
import './useredit.css'

function UserEdit() {

  let { id } = useParams();
  let { username } = useParams();
  let { name } = useParams();
  let { is_active } = useParams();
  let {is_staff} = useParams();
  let {phone_number} = useParams();
  let {email} = useParams();


  return (
    <div className="container">
      <div className="row gap-5">
        <div className="col-xl-8 col-lg-3 col-xxl-8 col-md-12 shadow bg-white py-3 rounded-5">
          <h5 className="fw-bold ms-2 p-3">Edit User Information</h5>
          <hr />
          <div>
          <EditUserform Id={id} Username={username} Name={name} Phone_number={phone_number} Email={email}/>
          </div>
        </div>
        <div className='col-xl-3 col-xxl-3 col-lg-3 col-md-12 shadow bg-white py-3 rounded-5'>
        
        <h5 className="fw-bold ms-2 p-3">Edit User Settings</h5>
        <hr />
    <EditUserSettingform Id={id} Is_active={is_active} Is_staff={is_staff}/>
        
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
