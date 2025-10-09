import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { useTheme } from 'context/ThemeContext';

export default function GlobalDataTable({ title, columns, items }) {
  const { colors, theme } = useTheme(); // get active theme
  const itemsPerPageList = [2, 3, 5];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageList[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage, theme]);

  return (
    <View
      key={theme}
      className="my-1 rounded-2xl p-2 shadow-md"
      style={{ backgroundColor: colors.card }}>
      <Text className="mb-3 text-xl font-bold" style={{ color: colors.text }}>
        {title}
      </Text>

      <DataTable>
        {/* Header */}
        <DataTable.Header
          style={{
            backgroundColor: colors.card,
            borderBottomWidth: 1,
            borderColor: colors.border,
          }}>
          {columns.map((col) => (
            <DataTable.Title
              key={col.key}
              numeric={col.numeric}
              textStyle={{
                flex: 1,
                color: colors.text,
                fontWeight: '600',
                textAlign: 'left',
                fontWeight: 'bold',
              }}>
              {col.label}
            </DataTable.Title>
          ))}
        </DataTable.Header>

        {/* Rows */}
        {items.slice(from, to).map((item, index) => (
          <DataTable.Row
            key={`${index}-${theme}`} // re-render on theme change
            style={{
              backgroundColor: index % 2 === 0 ? colors.card : colors.grey, // alternate rows
            }}>
            {columns.map((col) => (
              <DataTable.Cell
                key={col.key}
                textStyle={{
                  color:
                    col.key === 'status' && item.status === 'PAID'
                      ? colors.success
                      : col.key === 'status' && item.status === 'CREDIT'
                        ? colors.error
                        : colors.text,
                }}>
                {item[col.key]}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))}

        {/* Pagination */}
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={setPage}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={itemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          showFastPaginationControls
          selectPageDropdownLabel="Rows per page"
          theme={{
            colors: {
              text: colors.text,
              primary: colors.primary,
              surface: colors.card,
              backdrop: 'transparent',
            },
          }}
        />
      </DataTable>
    </View>
  );
}
