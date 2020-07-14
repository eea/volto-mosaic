import React from 'react';
import { Toast } from '@plone/volto/components'; // EditBlock
import { uniq } from 'lodash';

import { toast } from 'react-toastify';
import { messages } from 'volto-mosaic/constants';

const onSubmit = ({
  event,
  schema,
  intl,
  onSubmitForm,
  resetAfterSubmit,
  onUpdateForm,
  formData,
}) => {
  console.log('in on submit')
  if (event) {
    event.preventDefault();
  }
  const errors = {};
  schema.fieldsets.map(fieldset =>
    fieldset.fields.map(fieldId => {
      const field = schema.properties[fieldId];
      const data = formData[fieldId];
      if (schema.required.indexOf(fieldId) !== -1) {
        if (field.type !== 'boolean' && !data) {
          errors[fieldId] = errors[field] || [];
          errors[fieldId].push(intl.formatMessage(messages.required));
        }
        if (field.minLength && data.length < field.minLength) {
          errors[fieldId] = errors[field] || [];
          errors[fieldId].push(
            intl.formatMessage(messages.minLength, {
              len: field.minLength,
            }),
          );
        }
      }
      if (field.uniqueItems && data && uniq(data).length !== data.length) {
        errors[fieldId] = errors[field] || [];
        errors[fieldId].push(intl.formatMessage(messages.uniqueItems));
      }
    }),
  );
  if (Object.keys(errors).length > 0) {
    return {
      data: errors,
      afterUpdate: toast.error(
        <Toast
          error
          title="Validation error"
          content="There were some errors in form validation. Please check metadata"
        />,
      ),
    };
  } else {
    onSubmitForm(formData);
    if (resetAfterSubmit) {
      return {
        data: { formData: formData },
        afterUpdate: onUpdateForm && onUpdateForm(errors),
      };
    } else {
      return {
        data: '',
        afterUpdate: () => {},
      };
    }
  }
};

export default onSubmit;
