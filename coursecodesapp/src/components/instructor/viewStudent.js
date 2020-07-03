import React from 'react';
import MaterialTable from 'material-table';
import { Container } from '@material-ui/core';
import InStyles from "./InStyle";

export default function MaterialTableDemo() {
  const classes = InStyles();
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Student Number', field: 'studNum', type: 'numeric'},
      { title: 'Section', field: 'sect'},
    ],
    data: [
      { name: 'Sopeya', surname: 'De Guzman', studNum: 2015108138, sect: 'B1' },
      { name: 'Xhopeya', surname: 'Carlos', studNum: 2017108138, sect: 'B1'},
      { name: 'Tsopeya', surname: 'Oikawa', studNum: 2016108138, sect: 'B1'},
      { name: 'chupiya', surname: 'Miya', studNum: 2016108148, sect: 'B1'},
      { name: 'Supipay', surname: 'Sakusa', studNum: 2013108138, sect: 'B1'},
    ],
  });

  return (
    <Container className={classes.container}>
    <MaterialTable
      title="Students"
      options={{
        headerStyle: { backgroundColor: '#37474f', color: '#eceff1' }}}
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
    </Container>
  );
}