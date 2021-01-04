import { Card } from 'components';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import { Colors } from 'utils';
import { tableColumns } from './table_constants';

const DEFAULT_PAGE_SIZE = 8;
const DEFAULT_PAGE = 1;

const TableCard = styled(Card)`
  & .table {
    max-height: 0;
    transition-duration: 0.5s;

    &.show {
      max-height: 1000px;
      transition-duration: 0.5s;

      & + div > nav {
        display: flex;
      }
    }
    & + div > nav {
      display: none;
    }
  }
`;

const Header = styled.div`
  white-space: nowrap;
  font-size: 14px;
  color: ${Colors.darkBlue};

  & > button {
    border: none;
    background-color: transparent;

    &:focus {
      outline: none;
    }
    &:hover > * {
      filter: drop-shadow(0 0 1px);
      transform: scale(1.1);
      transition-duration: 0.3s;
    }
  }
`;

interface HeaderProps {
  show: boolean;
  handleClick: () => void;
}

const CardHeader = ({ show, handleClick }: HeaderProps) => {
  const iconStyles: IconBaseProps = {
    size: 22,
    color: Colors.green,
  };
  return (
    <Header className="d-flex align-items-center justify-content-between">
      <span>Resultado Detalhado</span>
      <hr className="border-top w-100 mx-3" />
      <button type="button" onClick={handleClick}>
        {show ? (
          <FaRegEyeSlash {...iconStyles} />
        ) : (
          <FaRegEye {...iconStyles} />
        )}
      </button>
    </Header>
  );
};

const Table = () => {
  const { result } = useSelector((state: RootState) => state.app);
  const [showList, setShowList] = useState(false);
  const [page, setPage] = useState(DEFAULT_PAGE);

  const getResult = (right: boolean, answered: boolean) => {
    if (!answered) return '---';
    return right ? 'CORRETA' : 'ERRADA';
  };

  const dataset = result.map(r => ({
    ...r,
    result: getResult(r.wasRight, r.wasAnswered),
  }));

  return (
    <TableCard className="my-4">
      <CardHeader show={showList} handleClick={() => setShowList(!showList)} />
      <DataTable
        className={`table mb-0 ${showList ? 'show' : ''}`}
        striped
        noHeader
        noDataComponent={
          <div className="py-5 d-flex justify-content-center align-items-center text-danger">
            Não há empresas para esse filtro
          </div>
        }
        highlightOnHover
        pagination
        paginationPerPage={DEFAULT_PAGE_SIZE}
        paginationTotalRows={result.length}
        paginationComponentOptions={{
          noRowsPerPage: true,
          rangeSeparatorText: ' de ',
        }}
        paginationDefaultPage={page}
        onChangePage={pg => setPage(pg)}
        columns={tableColumns}
        data={dataset}
      />
    </TableCard>
  );
};

export default Table;
