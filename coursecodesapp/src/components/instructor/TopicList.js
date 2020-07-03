import React, { useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  tableRow: {
    "&$selected, &$selected:hover": {
      backgroundColor: "#455a64"
    }
  },
  tableCell: {
    "$selected &": {
      color: "#fff"
    }
  },
  hover: {},
  selected: {}
});

let id = 0;
function createData(name) {
  id += 1;
  return { id, name};
}

const rows = [
  createData("Arrays"),
  createData("Arrays"),
  createData("Arrays"),
  createData("Arrays"),
  createData("Arrays")
];

function TopicList(props) {
  const { classes } = props;
  const [selectedID, setSelectedID] = useState(null);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell style={{ color:'#37474f', fontSize: '2em' }}>All Topics</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow
              hover
              key={row.id}
              onClick={() => {
                setSelectedID(row.id);
              }}
              selected={selectedID === row.id}
              classes={{ hover: classes.hover, selected: classes.selected }}
              className={classes.tableRow}
            >
              <TableCell
                className={classes.tableCell}
                component="th"
                scope="row"
                style={{ fontSize: '1.5em' }}>
                {row.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

TopicList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopicList);
