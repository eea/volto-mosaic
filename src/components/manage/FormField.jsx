/*
 * Generic form field implementation
 */

import React from 'react';
import { Form, Grid } from 'semantic-ui-react';

const FormField = ({ id, title, description, fieldSet, children }) => (
  <Form.Field
    inline
    className={description ? 'help' : ''}
    id={`${fieldSet || 'field'}-${id}`}
  >
    <Grid>
      <Grid.Row stretched>
        <Grid.Column width="4">
          <div className="wrapper">
            <label htmlFor={`field-${id}`}>{title}</label>
          </div>
        </Grid.Column>
        <Grid.Column width="8">{children}</Grid.Column>
      </Grid.Row>
      {description && (
        <Grid.Row stretched>
          <Grid.Column stretched width="12">
            <p className="help">{description}</p>
          </Grid.Column>
        </Grid.Row>
      )}
    </Grid>
  </Form.Field>
);

export default FormField;
