import React, {FC} from "react";
import {Todo} from "todo";
import {Formik, Form, Field, ErrorMessage, yupToFormErrors, useFormikContext} from "formik";
import * as Yup from 'yup';
import {uuidv4} from "../utils";
import {experimentData} from 'next/dist/build/webpack/config/blocks/experiment-data';
import DatePickerField from './DatePickerField';
import _ from "lodash";
import { FormikProps } from "formik";

export const AutoSave: FC<any> = ({ debounceMs }) => {
  const formik = useFormikContext();
  const [lastSaved, setLastSaved] = React.useState(null);
  const debouncedSubmit = React.useCallback(
    _.debounce(
      () =>
        formik.submitForm().then(() => setLastSaved(new Date().toISOString())),
      debounceMs
    ),
    [debounceMs, formik.submitForm]
  );

  React.useEffect(() => {
    debouncedSubmit();
  }, [debouncedSubmit, formik.values]);

  return (
    <>
      {!!formik.isSubmitting
        ? 'saving...'
        : lastSaved !== null
          ? `Last Saved: ${lastSaved}`
          : null}
    </>
  );
};

interface Props {
  onSubmit: (todo: Todo) => Promise<any>
}

const TodoSchema = Yup.object().shape({
  content: Yup.string()
    .min(2, 'Too Short!')
    .max(140, 'Too Long!')
    .required('Required Field'),
  expiredDate: Yup.date().min(new Date(), 'date cant be yesterday or less')
});

const TodoForm: FC<Props> = ({onSubmit}) => {
  return (
    <div>
      <Formik
        initialValues={{ content: '', expiredDate: new Date()}}
        validationSchema={TodoSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          onSubmit({
            id: uuidv4(),
            content: values.content,
            isDone: false,
            expiredDate: values.expiredDate,
          }).then(() => {
            resetForm();
            setSubmitting(false);
          })
        }}
      >
        {({values,setFieldValue, isSubmitting }) => (
          <Form>
            <Field name="content" />
            <ErrorMessage name="content" component="div" />
            <Field name="expiredDate">{DatePickerField}</Field>
            <ErrorMessage name="expiredDate" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
};

export default TodoForm;

