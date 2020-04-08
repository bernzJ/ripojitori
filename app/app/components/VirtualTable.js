/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useRef, useContext } from 'react';

import { FixedSizeList } from 'react-window';

/** Context for cross component communication */
const VirtualTableContext = React.createContext({
  top: 0,
  setTop: value => {},
  header: <td />,
  footer: <td />
});

/** The virtual table. It basically accepts all of the same params as the original FixedSizeList. */
const VirtualTable = ({ row, header, footer, ...rest }) => {
  const listRef = useRef();
  const [top, setTop] = useState(0);

  return (
    <VirtualTableContext.Provider value={{ top, setTop, header, footer }}>
      <FixedSizeList
        {...rest}
        innerElementType={Inner}
        onItemsRendered={props => {
          const style =
            listRef.current &&
            listRef.current._getItemStyle(props.overscanStartIndex);
          setTop((style && style.top) || 0);

          // Call the original callback
          rest.onItemsRendered && rest.onItemsRendered(props);
        }}
        ref={el => (listRef.current = el)}
      >
        {row}
      </FixedSizeList>
    </VirtualTableContext.Provider>
  );
};

/**
 * The Inner component of the virtual list. This is the "Magic".
 * Capture what would have been the top elements position and apply it to the table.
 * Other than that, render an optional header and footer.
 * */
const Inner = React.forwardRef(function Inner({ children, ...rest }, ref) {
  const { header, footer, top } = useContext(VirtualTableContext);
  return (
    <div {...rest} ref={ref}>
      <table style={{ top, position: 'absolute', width: '100%' }}>
        {header}
        <tbody>{children}</tbody>
        {footer}
      </table>
    </div>
  );
});

export default VirtualTable;
