import React from 'react';
import PropTypes from 'prop-types';
import { MDBDataTable } from 'mdbreact';
import translate from '../../locales';

const DatatablePage = ({ rows, columns }) => {
  const table = {
    columns,
    rows,
  };

  return (
    <MDBDataTable
      responsive
      striped
      bordered
      hover
      noRecordsFoundLabel={translate('no_records_found_label')}
      infoLabel={[
        translate('showing_label'),
        translate('to_label'),
        translate('of_label'),
        translate('entries_label'),
      ]}
      entriesLabel={translate('number_of_records_label')}
      paginationLabel={[
        translate('previous_page_label'),
        translate('next_page_label'),
      ]}
      searchLabel={translate('search_label')}
      data={table}
    />
  );
};

export default DatatablePage;

DatatablePage.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
