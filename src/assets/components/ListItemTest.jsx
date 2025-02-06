import { useEffect, useState } from "react";
import axios from "axios";
import "../css/listItem.css";
import { List, AutoSizer, Grid } from "react-virtualized";
import "react-virtualized/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const API_URL = "https://6494e6aeb08e17c91791736d.mockapi.io/api/book/product";

export default function ListItemVitrualList() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const columnCount = 3; // Luôn là 3 cột
  const columnWidth = 350;
  const rowHeight = 380;

  useEffect(() => {
    loadMoreItems();
  }, []);

  const loadMoreItems = async () => {
    if (!hasMore) return;
    try {
      const response = await axios.get(API_URL, { params: { page, limit: 9 } });
      setData((prev) => [...prev, ...response.data]);
      if (response.data.length === 0) setHasMore(false);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  const cellRenderer = ({ columnIndex, rowIndex, key, style }) => {
    const index = rowIndex * columnCount + columnIndex;
    const item = data[index];

    return (
      <div
        key={key}
        style={{
          ...style,
        }}
      >
        {item ? (
          <div
            style={{
              width: 350,
              height: 430,
              backgroundColor: "red",
              border: "1px solid black",
            }}
          >
            <strong>{item.name}</strong>
          </div>
        ) : (
          <div>Đang tải...</div>
        )}
      </div>
    );
  };

  return (
    <div className="container__list--item">
      <AutoSizer>
        {({ width, height }) => (
          <Grid
            width={width}
            height={height}
            rowCount={Math.ceil(data.length / columnCount)}
            rowHeight={rowHeight}
            columnCount={columnCount}
            columnWidth={columnWidth}
            cellRenderer={cellRenderer}
            onScroll={({ scrollTop, scrollHeight, clientHeight }) => {
              if (scrollHeight - scrollTop <= clientHeight + 50) {
                loadMoreItems();
              }
            }}
          />
        )}
      </AutoSizer>
    </div>
  );
}
