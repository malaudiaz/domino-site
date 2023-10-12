import React from 'react';
import { useMemo } from 'react';

const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);

    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const Pagination = (props) => {
    const {
      onChangePage,
      currentPage,
      totalPage,
      totalCount,
      rowsPerPage,
      siblingCount = 1,
      showInfo = true,
      showAddButton = false,
      onAddButton
    } = props;
  
    const pageSize = rowsPerPage;
  
    const paginationRange = usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    });
  
    const onFirts = () => {
      if (currentPage != 1) {
        onChangePage(1);
      }
    };
  
    const onNext = () => {
      if (currentPage < totalPage) {
        onChangePage(currentPage + 1);
      }
    };
  
    const onPrevious = () => {
      if (currentPage > 1) {
        onChangePage(currentPage - 1);
      }
    };
  
    const onLast = () => {
      if (currentPage != totalPage) {
        onChangePage(totalPage);
      }
    };

    const onAdd = () => {
      onAddButton();
    }
  
    return (
      <div className="d-flex justify-content-center pt-4">
        {(showInfo && totalCount > 0) && (
          <div className="hint-text d-none d-sm-block" style={{paddingRight: "10px", paddingLeft: "10px"}}>
            Mostrando registros <b>{currentPage * rowsPerPage - rowsPerPage + 1}</b> -{" "}
            {currentPage * rowsPerPage - rowsPerPage + rowsPerPage} de{" "}
            <b>{totalCount}</b> Registros
          </div>
        )}
        <ul className="pagination">

          {showAddButton && 
            <li className={"page-item"} onClick={() => onAdd()}>
              <a className="page-link">
                <i
                  className="bi bi-plus-lg"
                  data-toggle="tooltip"
                  title="Nuevo"
                ></i>
              </a>
            </li>
          }

          <li
            onClick={() => onFirts()}
            className={currentPage == 1 ? "page-item disabled" : "page-item"}
          >
            <a className="page-link">
              <i
                className="bi bi-chevron-bar-left"
                data-toggle="tooltip"
                title="Primera Página"
              ></i>
            </a>
          </li>
          <li
            onClick={() => onPrevious()}
            className={currentPage == 1 ? "page-item disabled" : "page-item"}
          >
            <a className="page-link">
              <i
                className="bi bi-chevron-left"
                data-toggle="tooltip"
                title="Página Anterior"
              ></i>
            </a>
          </li>

          {paginationRange.map((page, i) => {
            if (page === DOTS) {
              return (
                <li key={i} className="page-item-dots">
                  &#8230;
                </li>
              );
            }
            return (
              <li
                onClick={() => onChangePage(page)}
                key={i}
                className={currentPage == page ? "page-item active" : "page-item"}
              >
                <a className="page-link">{page}</a>
              </li>
            );
          })}

          <li
            onClick={() => onNext()}
            className={
              currentPage == totalPage ? "page-item disabled" : "page-item"
            }
          >
            <a className="page-link">
              <i
                className="bi bi-chevron-right"
                data-toggle="tooltip"
                title="Siguiente Página"
              ></i>
            </a>
          </li>
          <li
            onClick={() => onLast()}
            className={
              currentPage == totalPage ? "page-item disabled" : "page-item"
            }
          >
            <a className="page-link">
              <i
                className="bi bi-chevron-bar-right"
                data-toggle="tooltip"
                title="Última Página"
              ></i>
            </a>
          </li>
        </ul>
      </div>
    );
  };
  export default Pagination;
  