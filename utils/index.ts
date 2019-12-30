import * as Yup from "yup";

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const TodoSchema = Yup.object().shape({
  content: Yup.string()
    .min(5, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required Field'),
  expiredDate: Yup.date().min(new Date(), 'date cant be yesterday or less')
});
