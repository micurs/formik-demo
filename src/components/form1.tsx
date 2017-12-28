import * as React from 'react';
import { Formik, FormikProps, Field, FieldProps, FormikErrors } from 'formik';

export interface Form1Data {
  first_name?: string;
  last_name?: string;
  email?: string;
}

const emptyForm1Data: Form1Data = {
  first_name: '',
  last_name: '',
  email: '',
};

interface MyFormProps {
  onSubmit: ( formData?: Form1Data ) => void;
}

export class Form1 extends React.Component< MyFormProps, {} > {

  constructor(p: MyFormProps ) {
    super(p);
    // this.handleValidate = this.handleValidate.bind(this);
    // this.renderForm = this.renderForm.bind(this);
  }

  public render() {
    return (
      <Formik
        initialValues={emptyForm1Data}
        validate={this.handleValidate}
        onSubmit={this.pushSubmitToParent}
        render={this.renderForm}
      />
    );
  }

  private renderForm = ( pr: FormikProps<Form1Data> ) => {
    const {errors, dirty, isValid, handleSubmit, isSubmitting} = pr;
    console.log('IsValid:', isValid);
    console.log(' Errors:', errors);

    return (
      <form onSubmit={handleSubmit}>
        <h2>Here is my Formik 1</h2>
        <div className="my-form-field">
          <label>First Name</label>
          <Field
            name="first_name"
            render={( fieldPros: FieldProps<Form1Data> ) => <input className={errors.first_name} type="text" {...fieldPros.field} />}
          />
        </div>
        <div className="my-form-field">
          <label>Last Name</label>
          <Field
            name="last_name"
            render={( fieldPros: FieldProps<Form1Data> ) => <input className={errors.last_name} type="text" {...fieldPros.field} />}
          />
        </div>
        <div className="my-form-field">
          <label>Email</label>
          <Field
            name="email"
            render={( fieldPros: FieldProps<Form1Data> ) => <input className={errors.email} type="email" {...fieldPros.field} />}
          />
        </div>
        <div>
          <input
            type="submit"
            disabled={isSubmitting || !dirty || !isValid}
            value="Submit Form"
          />
        </div>
      </form>
    );
  }

  private handleValidate = ( values: Form1Data ): FormikErrors<Form1Data> => {
    let errors: FormikErrors<Form1Data> = {};
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
    return errors;
  }

  private pushSubmitToParent = ( values: any, actions: any ) => {
    this.props.onSubmit(values);
    actions.setSubmitting(false);
  }
}