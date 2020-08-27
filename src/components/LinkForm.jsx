import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { db } from "../firebase";
import './styles/Links.css';

const LinkForm = (props) => {
  const initialStateValues = {
    urlweb: "",
    websitename: "",
    description: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleChangeValues = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    props.addOrEditLink(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <>
      <Formik
        initialValues={values}
        //validate={}
        onSubmit={handleSubmit}
      >
        {({
          //values,
          errors,
          touched,
          //handleChange,
          handleBlur,
          /*handleSubmit,*/
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="urlweb">Url of the website</label>
              <div className="form-group input-group">
                <div className="input-group-text bg-light">
                  <i className="material-icons">insert_link</i>
                </div>
                <input
                  className="form-control"
                  type="text"
                  name="urlweb"
                  onChange={handleChangeValues}
                  onBlur={handleBlur}
                  value={values.urlweb}
                  placeholder="https://example.com/"
                />
                {errors.urlweb && touched.urlweb && errors.urlweb}
              </div>
            </div>

            <div className="form-group">
              <label for="websitename">Name of the website</label>
              <div className="form-group input-group">
                <div className="input-group-text bg-light">
                  <i className="material-icons">create</i>
                </div>
                <input
                  className="form-control"
                  type="text"
                  name="websitename"
                  onChange={handleChangeValues}
                  onBlur={handleBlur}
                  value={values.websitename}
                  placeholder="example"
                />
                {errors.websitename &&
                  touched.websitename &&
                  errors.websitename}
              </div>
            </div>

            <div className="form-group ">
              <label htmlFor="description">Description</label>
              <textarea
                value={values.description}
                onChange={handleChangeValues}
                name="description"
                rows="3"
                className="form-control"
                placeholder="Description"
              ></textarea>
            </div>

            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={isSubmitting}
            >
              {props.currentId === "" ? "Save" : "Update"}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LinkForm;
