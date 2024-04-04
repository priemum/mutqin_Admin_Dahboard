import { Formik, Form, Field } from 'formik';
import {updateDatapatch, fetchData } from "../../redux/slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useState } from 'react';
function EditUserform({Id,Username,Name,Phone_number,Email}) {
  const dispatch = useDispatch();
  const [userId, setuserId] = useState(Id)
console.log(userId)

  const { data, loading, error } = useSelector((state) => state.api);
  const [userError, SetuserError] = useState('')
  const initialValues = {
    username: Username,
    name:Name,
    email:Email,
    phone_number:Phone_number,


  };

  const handleSubmit = async(values, actions) => {

    try {
      await dispatch(updateDatapatch({endpoint:`admin-dash/user-management-info/${Id}/` ,data : values}));
 
      SetuserError(error)
    } catch (error) {
      console.error("Error updated data:", error);
      SetuserError(error)
    }
    actions.setSubmitting(false); // Set submitting to false to enable the submit button


  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="row p-4">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <Field
                    type="text"
                    className="form-control bg-light"
                    id="name"
                    name="name"
                  />
                </div>
                </div>
                <div className='col-md-6'>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    user Name
                  </label>
                  <Field
                    type="text"
                    className="form-control bg-light"
                    id="username"
                    name="username"
                    disabled
                  />
                </div>
                </div>
                <div className='col-md-6'>
                <div className="mb-3 ">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <Field
                    type="email"
                    className="form-control bg-light"
                    id="email"
                    name="email"
                  />
                </div>
                </div>
         
          
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="phone_number" className="form-label">
                    Phone Number
                  </label>
                  <Field
                    type="tel"
                    className="form-control bg-light"
                    id="phone_number"
                    name="phone_number"
                  />
                </div>
 
              
              </div>
  
      

              <div className="col-md-12">
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <Field
                    as="select"
                    className="form-select bg-light"
                    id="country"
                    name="country"
                  >
                    <option value="Egypt">Egypt</option>
                    <option value="KSA">KSA</option>
                  </Field>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-blue rounded-5 ps-3 pe-3"
              >
                Return
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-pink ps-3 pe-3 rounded-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update'}
              </button>
            </div>
            <span className=' alert-danger'>{userError}</span>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditUserform;
