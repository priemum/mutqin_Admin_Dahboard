import { Formik, Form, Field } from 'formik';
import {updateDatapatch, fetchData } from "../../redux/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect ,useState} from 'react';
const EditUserSettingform = ({Id,Is_active,Is_staff}) => {
  const dispatch = useDispatch();
  const [userId, setuserId] = useState(Id)
    
  const { data, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(
      fetchData({
        endpoint: `admin-dash/user-management-info/${Id}/`,
      
      })

    );
    console.log("data fetch",data)
  }
  
  
  , [dispatch]);

  const handleSubmit = async(values, actions) => {

    try {
      await dispatch(updateDatapatch({endpoint:`admin-dash/user-management-info/${Id}/` ,data : values}));
      console.log("Data update successfully ", values);
      
      console.log('Form submitted with values:', values);
      console.log(data)
    } catch (error) {
      console.error("Error updated data:", error);
    }
    actions.setSubmitting(false); // Set submitting to false to enable the submit button


  };
  return (
    <Formik
      initialValues={{
        is_active:Is_active,
        is_staff: Is_staff,
        new_password: '',
      }}
      onSubmit={handleSubmit}
    >
      <Form className='p-3'>
        <div className="mb-3">
          <label htmlFor="is_active" className="form-label">User Status</label>
          <Field as="select" name="is_active" className="form-select bg-light">
          
            <option value="true">Active</option>
            <option value="false">Not Active</option>
          </Field>
        </div>

        <div className="mb-3">
          <label htmlFor="is_staff" className="form-label">User Group</label>
          <Field as="select" name="is_staff" className="form-select bg-light">
            <option value="true" >User</option>
            <option value="false">Not User</option>
          </Field>
        </div>



        <div className="mb-3">
          <label htmlFor="new_password" className="form-label"> New Password</label>
          <Field type="password" name="new_password" className="form-control bg-light" />
        </div>

        <div className="d-flex justify-content-end py-4">
        <button
          type="button"
          className="me-2 btn btn-blue rounded-5 ps-3 pe-3"
        >
          Return
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-pink ps-3 pe-3 rounded-5"
      
        >
          Update
        </button>
      </div>
      
      </Form>
    </Formik>
  );
};

export default EditUserSettingform;
