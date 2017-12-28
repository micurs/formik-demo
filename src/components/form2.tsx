import * as React from 'react';
import { Formik, FormikProps, FormikErrors, Field, FieldProps } from 'formik';

export interface Form2Data {
  first_name?: string;
  last_name?: string;
  email?: string;
}

type Form2Errors = FormikErrors<Form2Data>;

const emptyForm2Data: Form2Data = {
  first_name: '',
  last_name: '',
  email: '',
};

interface Form2Props {
  onSubmit: ( formData?: Form2Data ) => void;
}

export class Form2 extends React.Component< Form2Props, {} > {

  constructor(p: Form2Props ) {
    super(p);
  }

  public render() {
    return (
      <Formik
        initialValues={emptyForm2Data}
        validate={this.handleValidate}
        onSubmit={this.pushSubmitToParent}
      >
      {( pr: FormikProps<Form2Data> ) => {
        const {errors, dirty, isValid, handleSubmit, isSubmitting} = pr;
        console.log('IsValid:', isValid);
        console.log(' Errors:', errors);
        return (
          <form onSubmit={handleSubmit}>
            <h2>Here is my Formik 2</h2>
            <div className="my-form-field">
              <label>First Name</label>
              <Field name="first_name">
                {( {field}: FieldProps<Form2Data> ) => (
                  <input className={pr.touched[field.name] ? errors.first_name : ''} type="text" {...field} />
                )}
              </Field>
            </div>
            <div className="my-form-field">
              <label>Last Name</label>
              <Field name="last_name">
                {( { field }: FieldProps<Form2Data> ) => (
                  <input className={pr.touched[field.name] ? errors.last_name : ''} type="text" {...field} />
                )}
              </Field>
            </div>
            <div className="my-form-field">
              <label>Email</label>
              <Field name="email">
                {( { field }: FieldProps<Form2Data> ) => (
                  <input className={pr.touched[field.name] ? errors.email : ''} type="email" {...field} />
                )}
              </Field>
            </div>
            <div>
              <input type="submit" disabled={isSubmitting || !dirty || !isValid} value="Submit Form" />
            </div>
          </form>
        );
      }}
      </Formik>
    );
  }

  // Note that async validation requires you reject the promise with the
  // validation error!
  private handleValidate = ( values: Form2Data ): Promise<Form2Errors> => {
    return new Promise<Form2Errors>( (resolve, reject) => {
      setTimeout(
        () => {
          console.log(values);
          let errors: Form2Errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if ( !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email) ) {
            errors.email = 'Invalid';
          }
          if (!values.first_name) {
            errors.first_name = 'Required';
          }
          if (!values.last_name) {
            errors.last_name = 'Required';
          }
          console.log(errors);
          reject(errors);
        }
      , 2000 );
    }
  );
}

  private pushSubmitToParent = ( values: any, actions: any ) => {
    this.props.onSubmit(values);
    actions.setSubmitting(false);
  }
}