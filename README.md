# Formik demo using TypeScript

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Available Scripts

In the project directory, you can run:

`npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

`npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

`npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## About Formik

[Formik](https://github.com/jaredpalmer/formik) is a library for managing forms in React. It keeps track of your form's state and then exposes it with a few reusable methods and event handlers.

Formik does not interact with Redux, the form state is managed locally by the Formik Form without triggering reducers in Redux or any Flux library :thumbsup:.

Formik is written in TypeScript so the types will always be up to date :thumbsup:.

Formik uses [high-order components](https://reactjs.org/docs/higher-order-components.html) and the `render` approach used in [React-Router 4](https://github.com/ReactTraining/react-router) :thumbsup:.

When using this library in TypeScript we can use the `strict:true` setting in `tsconfig.json` :thumbsup: .

> **Note** : In order to compile your code keeping `noImplicitAny:true`
> we must install @types/prop-types as additional dev dependency:

```
yarn add @types/prop-types --dev
```

You can build a Formik form by wrapping it with an HOC:

```typescript
const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: propToValueFunction,
  validate: validateFunction,
  handleSubmit: handleSubmitFunction,
})(InnerForm);
```

Or by using the predefined `<Formik>` React component:

```typescript
MyForm = () => (
  <Formik
    initialValues={initValueObj}
    onSubmit={handleSubmitFunction}
    render={( fkprops: FormikProps<FormData> ) => {
      const { errors, dirty, isValid, handleSubmit, isSubmitting} = fkprops;
      ...
      return (<form onSubmit={handleSubmit}>
        ...
        ...
          <Field
            name="first_name"
            render={( {filed}: FieldProps<FormData> ) => (
              <input type="text" {...field} />
            )}
          />
        ...
        ...
      </form>);
    }}
  />
);
```

Formik also allows to use the child element to implement the render function:

```typescript
MyForm = () => (
  <Formik
    initialValues={initValueObj}
    onSubmit={handleSubmitFunction}
  >
    {( fkprops: FormikProps<FormData> ) => (
      <form ...>
        ...
      </form>
    )}
  </Formik>
```

## Single field validation

Currently the validation callback perform check on all fileds in a form.
In some cases we may want to perform single field validation to avoid display error feedbacks on field not yet reached by the user.

Single field validation is not supported right now in this library :cry: .

However, we can use `form.touched[field.name]` to avoid display error feedback on untouched fileds.

```typescript
  <Field name="email">
    {( { field }: FieldProps<Form2Data> ) => (
      <input className={touched[field.name] ? errors.email : ''} type="email" {...field} />
    )}
  </Field>
```

? You can see this in action in the [`Form2.tsx`](https://github.com/micurs/formik-demo/blob/master/src/components/form2.tsx) included in this project.

Finally, the library does not provide any validation utility, so we can write that any way we want.
However, the author likes [Yup](https://github.com/jquense/yup) for object schema validation and
the library provides a [special config just for Yup](https://github.com/jaredpalmer/formik#validationschema-schema--props-props--schema).

## Overall

The library is smaller than Redux-Form (!~9.3kB minified and gzipped) and it is TypeScript friendly since it is written in TypeScript.

It supports Synchronus and Asynchronous validation for the entire form using Promises.


## Negatives

The lack of single field validation handler is the big negative about this library.



