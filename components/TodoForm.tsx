import React, {FC} from "react";
import {Todo} from "todo";
import {Formik, useFormikContext} from "formik";
import {TodoSchema, uuidv4} from "../utils";
import _ from "lodash";
import Moment from 'react-moment';

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
    <p style={{margin: 0, color: 'rgba(0,0,0,0.31)'}}>
      {!!formik.isSubmitting
        ? 'saving...'
        : lastSaved !== null
          ? <Moment date={lastSaved} fromNow ago />
          : null}
    </p>
  );
};

interface Props {
  onSubmit: (todo: Todo) => Promise<any>
}

const TodoForm: FC<Props> = ({onSubmit, children}) => {
  return (
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
        {children}
      </Formik>
  )
};

export default TodoForm;

