import React from 'react';
import MaterialTable from 'material-table';

export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: ' Course Name', field: 'courseName', },
      { title: 'Term', field: 'term' },
      { title: 'Section', field: 'sect'},
      { title: 'Date Published', field: 'date'},
    ],
    data: [
      { courseName: 'COE113L', term: '4Q SY 2019-2020', sect: 'B1', date: 'July 3, 2020' },
      { courseName: 'COE113L', term: '4Q SY 2019-2020', sect: 'B1', date: 'July 3, 2020' },
      { courseName: 'COE113L', term: '4Q SY 2019-2020', sect: 'B1', date: 'July 3, 2020' },
      { courseName: 'COE113L', term: '4Q SY 2019-2020', sect: 'B1', date: 'July 3, 2020' },
      { courseName: 'COE113L', term: '4Q SY 2019-2020', sect: 'B1', date: 'July 3, 2020' },
    ],
  });

  return (
    <MaterialTable
      title="Manage Course List"
      options={{
        headerStyle: { backgroundColor: '#37474f', color: '#eceff1' }}}
      columns={state.columns}
      data={state.data}
      editable={{
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
  );
}